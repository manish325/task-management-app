import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { LoginWithGooleDto, LoginDto, RegisterDto } from "../Dto/auth.sto";
import { validate, ValidationError } from "class-validator";
import { ResponseFailure } from "../types/response";
import { Errors } from "../../../config/constants";
import { StatusCodes } from "http-status-codes";
import { getObjectValues } from "../helpers/_helpers";

export const signInWithGoogleDtoValidation = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const authDtoObject = plainToInstance(LoginWithGooleDto, req.body);
        const errors: ValidationError[] = await validate(authDtoObject);

        if (errors.length) {
            return res.send(
                new ResponseFailure(
                    Errors.VALIDATION_ERROR,
                    StatusCodes.BAD_REQUEST,
                    errors.map(error => {
                        return {
                            property: error.property,
                            constraints: error.constraints,
                        }
                    })
                ))
        }
        next();
    }
}

export const loginDtoValidation = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const loginDtoObject = plainToInstance(LoginDto, req.body);
        const errors: ValidationError[] = await validate(loginDtoObject);

        if (errors.length) {
            return res.send(
                new ResponseFailure(
                    Errors.VALIDATION_ERROR,
                    StatusCodes.BAD_REQUEST,
                    errors.map((error: ValidationError) => {
                        return getObjectValues(error.constraints)
                    }).flat()
                ))
        }
        next();
    }
}

export const registerDtoValidation = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const registerDtoObject = plainToInstance(RegisterDto, req.body);
        const errors: ValidationError[] = await validate(registerDtoObject);

        if (errors.length) {
            return res.send(
                new ResponseFailure(
                    Errors.VALIDATION_ERROR,
                    StatusCodes.BAD_REQUEST,
                    errors.map((error: ValidationError) => {
                        return getObjectValues(error.constraints)
                    }).flat()
                )
            )
        }
        next();
    }
}