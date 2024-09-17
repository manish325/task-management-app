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
exports.AuthController = void 0;
const constants_1 = require("../../../config/constants");
const response_1 = require("../interfaces/response");
class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    googleLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { authToken } = req.body;
        });
    }
    login(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
            }
            catch (e) {
            }
        });
    }
    test(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("In Test!");
            return res.send(new response_1.ResponseSuccess(constants_1.RESPONSE_PHRASES.TEST));
        });
    }
}
exports.AuthController = AuthController;
