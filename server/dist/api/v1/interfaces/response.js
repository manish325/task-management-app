"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseFailure = exports.ResponseSuccess = void 0;
const http_status_codes_1 = require("http-status-codes");
const constants_1 = require("../../../config/constants");
class ResponseSuccess {
    constructor(message, status = http_status_codes_1.StatusCodes.ACCEPTED, data = null) {
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
exports.ResponseSuccess = ResponseSuccess;
class ResponseFailure {
    constructor(message = constants_1.Errors.SOMETHING_WENT_WRONG, status = http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, errors) {
        this.errors = [];
        this.message = message;
        this.status = status;
        this.errors = errors ? errors : [];
    }
}
exports.ResponseFailure = ResponseFailure;
