import express from "express";
import { AuthService } from "../services/auth.service";
import { AuthController } from "../controllers/Auth.controller";
import { loginDtoValidation, signInWithGoogleDtoValidation } from "../validations/auth.validations";

export const authRouter = express.Router();

authRouter.get('/test-route', (req, res) => {
    const authService = new AuthService();
    const authController = new AuthController(
        authService
    )
    return authController.test(req, res);
});

authRouter.post('/login', loginDtoValidation(), (req, res, next) => {
    const authService = new AuthService();
    const authController = new AuthController(
        authService
    )
    return authController.login(req, res, next);
});

authRouter.post('/register', loginDtoValidation(), (req, res, next) => {
    const authService = new AuthService();
    const authController = new AuthController(
        authService
    )
    return authController.register(req, res, next);
})

authRouter.post('/login/google', signInWithGoogleDtoValidation(), (req, res, next) => {
    const authService = new AuthService();
    const authController = new AuthController(
        authService
    )
    return authController.googleLogin(req, res, next);
})

authRouter.post('/getUserDetails', signInWithGoogleDtoValidation(), (req, res) => {
    const authService = new AuthService();
    const authController = new AuthController(
        authService
    )
    return authController.getUserDetails(req, res);
})
