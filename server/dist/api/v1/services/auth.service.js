"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const DatabaseConfig_1 = require("../../../config/DatabaseConfig");
class AuthService {
    constructor() {
        if (!DatabaseConfig_1.appDataSource) {
            throw new Error();
        }
    }
}
exports.AuthService = AuthService;
