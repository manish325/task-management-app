import {StatusCodes} from "http-status-codes";

export class DataBaseNotInitializedException extends Error {
    readonly message !: string;
    private readonly status !: StatusCodes;

    constructor() {
        super()
    }
}