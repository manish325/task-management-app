import {
    IsNotEmpty,
    IsString
} from "class-validator";
import { Errors } from "../../../config/constants";

export class LoginWithGooleDto {

    @IsNotEmpty({
        message : Errors.AUTH_TOKEN_REQUIRED
    })
    @IsString()
    authToken !: string;
}

export class LoginDto {

    @IsNotEmpty({
        message : Errors.EMAIL_REQUIRED
    })
    @IsString()
    email !: string;

    @IsNotEmpty({
        message : Errors.PASSWORD_REQUIRED
    })
    @IsString()
    password !: string;
}

export class RegisterDto {

    @IsNotEmpty({
        message : Errors.EMAIL_REQUIRED
    })
    @IsString()
    email !: string;

    @IsNotEmpty({
        message : Errors.PASSWORD_REQUIRED
    })
    @IsString()
    password !: string;

    @IsNotEmpty({
        message : Errors.FIRST_NAME_REQUIRED
    })
    @IsString()
    firstName !: string;

    @IsNotEmpty({
        message : Errors.LAST_NAME_REQUIRED
    })
    @IsString()
    lastName !: string;
}