export interface ILoginResponse {
    token: string;
    user: IUserData;
}

export interface IRegisterResponse {
    token: string;
    user: {
        id: string;
        name: string;
    }
}

export interface Role {
    id: string;
    name: string;
}

export interface IUserData {
    id : number,
    firstName : string,
    lastName : string,
    email : string,
    profilePicture : string,
    roles : Role[]
}