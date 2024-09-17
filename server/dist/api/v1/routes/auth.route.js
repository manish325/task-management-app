"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
const express_1 = __importDefault(require("express"));
const auth_service_1 = require("../services/auth.service");
const Auth_controller_1 = require("../controllers/Auth.controller");
exports.authRouter = express_1.default.Router();
exports.authRouter.get('/test-route', (req, res) => {
    const authService = new auth_service_1.AuthService();
    const authController = new Auth_controller_1.AuthController(authService);
    return authController.test(req, res);
});
