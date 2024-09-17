import { NextFunction, Request, Response } from "express";
import { StageService } from "../services/stage.service";
import { ResponseSuccess } from "../types/response";
import { RESPONSE_PHRASES } from "../../../config/constants";
import { StatusCodes } from "http-status-codes";

export class StageController {
    constructor(private stageService: StageService) {}
    async getAllStages(req: Request, res: Response, next: NextFunction) {
        try {
            const stages = await this.stageService.getAllStages();
            res.status(200).send(
                new ResponseSuccess(
                    RESPONSE_PHRASES.STAGES_FETCHED,
                    StatusCodes.OK,
                    stages
                )
            )
        } catch(e) {
            next(e);
        }
    }
}