import express from "express";
import { registerRoutes } from "./api/v1/routes";
import { config } from "dotenv"
import { ResponseFailure } from "./api/v1/types/response";
import { Errors } from "./config/constants";
import { StatusCodes } from "http-status-codes";
import { connectDatabase } from "./config/DatabaseConfig";
import { applyGlobalMiddlewares } from "./api/v1/middlewares";

const app = express();
const startServer = async () => {
    try {
        config();
        await connectDatabase();
        applyGlobalMiddlewares(app);
        registerRoutes(app);
        app.use((err: any, req: any, res: any, next: any) => {
            return res.send(
                new ResponseFailure(
                    // Errors.SOMETHING_WENT_WRONG,
                    err || err.message || Errors.SOMETHING_WENT_WRONG,
                    StatusCodes.INTERNAL_SERVER_ERROR,
                    []
                )
            )
        })
        app.listen(Number(process.env.PORT), '0.0.0.0', () => console.log("Server is up and running!"));
    } catch (e) {
        console.log(e);
    }
}

startServer();