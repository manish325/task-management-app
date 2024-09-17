"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signInWithGoogleDtoValidation = void 0;
const class_transformer_1 = require("class-transformer");
const auth_sto_1 = require("../Dto/auth.sto");
const class_validator_1 = require("class-validator");
const response_1 = require("../interfaces/response");
const constants_1 = require("../../../config/constants");
const http_status_codes_1 = require("http-status-codes");
const signInWithGoogleDtoValidation = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const authDtoObject = (0, class_transformer_1.plainToInstance)(auth_sto_1.LoginWithGooleDto, req.body);
        const errors = yield (0, class_validator_1.validate)(authDtoObject);
        if (errors.length) {
            return res.send(new response_1.ResponseFailure(constants_1.Errors.VALIDATION_ERROR, http_status_codes_1.StatusCodes.BAD_REQUEST, errors.map(error => {
                return {
                    property: error.property,
                    constraints: error.constraints,
                };
            })));
        }
        next();
    });
};
exports.signInWithGoogleDtoValidation = signInWithGoogleDtoValidation;
