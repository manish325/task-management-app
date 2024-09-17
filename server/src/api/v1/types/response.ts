import { StatusCodes } from "http-status-codes";
import { Errors } from "../../../config/constants";

export class ResponseSuccess {
    message !: string;
    status !: StatusCodes;
    data !: any;
    success : boolean = true;

    constructor(message : string, status : StatusCodes = StatusCodes.ACCEPTED, data = {}) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}

export class ResponseFailure {
    message !: string;
    status !: StatusCodes;
    errors : any[] = [];
    success : boolean = false;

    constructor(
        message : string = Errors.SOMETHING_WENT_WRONG, 
        status : StatusCodes = StatusCodes.INTERNAL_SERVER_ERROR, 
        errors : any[]
    ) 
    {
        this.message = message;
        this.status = status;
        this.errors = errors ? errors : [];
    }
}