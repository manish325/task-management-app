import {Request, Response, NextFunction} from "express";
import { StatusCodes } from "http-status-codes";
import { ResponseFailure } from "../types/response";
import { Errors } from "../../../config/constants";
import { JwtService } from "../services/jwt.service";

export const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const jwtService : JwtService = new JwtService();
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Checking authorization");
    if (!token) {
        return res.status(StatusCodes.UNAUTHORIZED).send(
            new ResponseFailure(
                Errors.AUTH_TOKEN_REQUIRED,
                StatusCodes.UNAUTHORIZED,
                [Errors.AUTH_TOKEN_REQUIRED]
            )
        )
    } else {
        const user = jwtService.verifyToken(token);
        if(user) {
            console.log("checked authorization" ,user);
            try{
                req.user = user;
                next();
            } catch(e) {
                console.log(e);
            }
        } else {
            return res.status(StatusCodes.UNAUTHORIZED).send(
                new ResponseFailure(
                    Errors.AUTH_TOKEN_INVALID,
                    StatusCodes.UNAUTHORIZED,
                    [Errors.AUTH_TOKEN_INVALID]
                )
            )
        }
    }
}