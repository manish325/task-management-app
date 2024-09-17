import { RESPONSE_PHRASES } from "../../../config/constants";
import { ResponseSuccess } from "../types/response";
import { AuthService } from "../services/auth.service";

import {
    Request,
    Response,
    NextFunction
} from "express";
import { axiosService } from "../services/axios.service";
import { StatusCodes } from "http-status-codes";
import { User } from "../models/User.entity";
import { LoginDto, RegisterDto } from "../Dto/auth.sto";
import { UserNotFoundException } from "../Exceptions/UserNotFoundException";

export class AuthController {
    constructor(private authService: AuthService) {

    }

    async googleLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const {
                authToken
            } = req.body;
            const response = await this.authService.loginWithGoogle(authToken);
            if (response?.user) {
                delete (response.user as any)['password'];
            }
            return res.send(
                new ResponseSuccess(
                    RESPONSE_PHRASES.LOGIN_SUCCESS,
                    StatusCodes.CREATED,
                    response
                )
            )

        } catch (e) {
            next(e);
        }
    }

    async register(request: Request, response: Response, next: NextFunction) {
        try {
            const user = request.body as RegisterDto;
            const registerResponse = await this.authService.register(user);

            if(registerResponse) {
                delete (registerResponse as any)['password'];
                return response.send(
                    new ResponseSuccess(
                        RESPONSE_PHRASES.REGISTER_SUCCESS,
                        StatusCodes.CREATED,
                        registerResponse
                    )
                )
            }
        } catch (e) {
            console.log(e);
            return next(e);
        }
    }

    async login(request: Request, response: Response, next: NextFunction) {
        try {
            const {
                email,
                password
            } = request.body as LoginDto;
            const loginResponse = await this.authService.login(email, password);
            if (loginResponse?.user) {
                delete (loginResponse.user as any)['password'];
                return response.send(
                    new ResponseSuccess(
                        RESPONSE_PHRASES.LOGIN_SUCCESS,
                        StatusCodes.CREATED,
                        loginResponse
                    )
                )
            } else if (!loginResponse) {
                next(
                    new UserNotFoundException()
                )
            }

        } catch (e) {
            console.log(e);
            return next(e);
        }
    }

    async getUserDetails(req: Request, res: Response) {
        const {
            authToken
        } = req.body;
        const response = await this.authService.getUserByToken(authToken);
        return res.send(
            new ResponseSuccess(
                RESPONSE_PHRASES.TEST,
                StatusCodes.OK,
                response as User
            )
        )
    }

    async test(req: Request, res: Response) {
        console.log("In Test!")
        return res.send(
            new ResponseSuccess(
                RESPONSE_PHRASES.TEST
            )
        )
    }
}