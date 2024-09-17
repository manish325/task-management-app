import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { StageController } from "../controllers/Stage.controller";
import { StageService } from "../services/stage.service";

export const stageRouter = express.Router();

stageRouter.use(AuthMiddleware);
stageRouter.get("/allStages", (req, res, next) => {
    const stageService = new StageService();
    const stageController = new StageController(stageService);
    return stageController.getAllStages(req, res, next);
});