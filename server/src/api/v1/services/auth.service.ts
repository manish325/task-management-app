import {
    Repository
} from "typeorm";
import { User } from "../models/User.entity";
import { appDataSource } from "../../../config/DatabaseConfig"; 
import { DataBaseNotInitializedException } from "../Exceptions/Database.exceptions";
import { Axios, axiosService } from "./axios.service";
import { IGoogleUser, ILoginResponse } from "../types/entity";
import { AxiosResponse } from "axios";
import { JwtService } from "./jwt.service";
import { JwtPayload } from "jsonwebtoken";
import {hash, compare} from "bcryptjs";
import { RegisterDto } from "../Dto/auth.sto";

export class AuthService {
    private userRepo !: Repository<User>;
    private axiosService : Axios = axiosService;
    private jwtService : JwtService = new JwtService();

    constructor() {
       if(!appDataSource) {
        throw new DataBaseNotInitializedException()
       } else {
        this.userRepo = appDataSource.getRepository(User);
       }
    }

    public async createUser(user: User): Promise<User> {
        return await this.userRepo.save(user);
    }

    public async getUserByEmail(email: string): Promise<User | null> {
        return await this.userRepo.findOne({
            where : {email},
            relations : ['roles']
        } );
    }

    public async login(email: string, password: string) : Promise<ILoginResponse | undefined> {
        const user = await this.getUserByEmail(email);
        if(!user) {
            return undefined;
        }
        //TODO: Implement password hashing and check
        if(!user.password) {
            return undefined;
        }
        const isPasswordValid = await compare(password, user.password);
        if(!isPasswordValid) {
            return undefined;
        }
        const token = this.jwtService.generateToken({email : user.email, id: user.id});
        return { token, user };
    }

    public async register(user: RegisterDto)  {
        const {email, password, firstName, lastName} = user;
        const hashedPassword = await hash(password, 10);
        const newUser = new User();
        newUser.email = email;
        newUser.password = hashedPassword;
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.isRegisteredViaGoogle = false;
        return await this.createUser(newUser);
    }

    public async createUserViaGoogle (userData : IGoogleUser) {
        const user = new User();
        user.email = userData.email;
        user.firstName = userData.name.split(' ')[0];
        user.lastName = userData.name.split(' ')[1];
        user.isRegisteredViaGoogle = true;
        user.profilePicture = userData.picture;
        return await this.createUser(user);
    }

    public async loginWithGoogle (authToken: string) : Promise<ILoginResponse | undefined> {
        try {
            const {data }= (await this.axiosService.getUserDetailsFromGoogle(authToken)) as AxiosResponse<IGoogleUser>;
            let existingUser = await this.getUserByEmail(data.email);
            if(!existingUser) {
                existingUser = await this.createUserViaGoogle(data);
            }
            const token = this.jwtService.generateToken({email : existingUser.email, id: existingUser.id});
            return { token, user: existingUser };
        } catch(e) {
            throw e;
        }
    }

    public async getUserByToken(token : string) {
        const {email} = this.jwtService.verifyToken(token) as JwtPayload;
        return await this.getUserByEmail(email);

    }


}