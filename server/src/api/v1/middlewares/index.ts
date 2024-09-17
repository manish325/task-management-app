import express, { Application } from "express";
import passport from "passport";
import session from "express-session";
import cors from "cors";
import {Strategy as GoogleStrategy} from "passport-google-oauth20"
import { AuthService } from "../services/auth.service";

export const applyGlobalMiddlewares = (app : Application) => {
    app.use(cors())
    app.use(express.json());
    // app.use(passport.initialize());
    // app.use(passport.session());
    app.use(session({
        secret: process.env.SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false }
    }));
    passport.use( 
        new GoogleStrategy(
            {
            clientID: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            },
            function(accessToken, refreshToken, profile, done) {
                const authService = new AuthService();

                return done(null, profile);
              }
    )
    )
}