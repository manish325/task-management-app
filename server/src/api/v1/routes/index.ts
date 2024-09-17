import {Application, Router} from "express";
import { routes } from "./routes";

export const registerRoutes = (app : Application) => {
    const globalRouter = Router();
    app.use('/api/v1', globalRouter);
    routes.forEach(route => {
        globalRouter.use(route.route, route.router);
    })
}