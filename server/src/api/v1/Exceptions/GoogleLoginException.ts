import {StatusCodes} from "http-status-codes";
import { Errors } from "../../../constants/errors";

export class GoogleLoginException extends Error {
    readonly message !: string;
    private readonly status !: StatusCodes;

    constructor() {
        super(Errors.INVALID_AUTH_TOKEN);
        this.status = StatusCodes.UNAUTHORIZED;
    }
}