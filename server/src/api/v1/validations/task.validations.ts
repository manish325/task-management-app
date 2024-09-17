import { plainToInstance } from "class-transformer";
import { Request, Response, NextFunction } from "express";
import { validate, ValidationError } from "class-validator";
import { ResponseFailure } from "../types/response";
import { Errors } from "../../../config/constants";
import { StatusCodes } from "http-status-codes";
import { EditTaskDto, TaskDto, UpdateTaskStage } from "../Dto/task.dto";


export const validateCreateTaskRequest = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const taskDto = plainToInstance(TaskDto, req.body);
        const errors: ValidationError[] = await validate(taskDto);
        if (errors.length) {
            return res.send(
                new ResponseFailure(
                    Errors.VALIDATION_ERROR,
                    StatusCodes.BAD_REQUEST,
                    errors.map(error => {
                        return {
                            property: error.property,
                            constraints: error.constraints,
                        }
                    })
                ))
        }
        console.log("Calling the next!");
        next();
    }
}

export const validateUpdateTaskRequest = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const taskDto = plainToInstance(EditTaskDto, req.body);
        const errors: ValidationError[] = await validate(taskDto);
        if (errors.length) {
            return res.send(
                new ResponseFailure(
                    Errors.VALIDATION_ERROR,
                    StatusCodes.BAD_REQUEST,
                    errors.map(error => {
                        return {
                            property: error.property,
                            constraints: error.constraints,
                        }
                    })
                ))
        }
        next();
    }
}

export const getAllTaskQueryParamValidation = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { searchText } = req.query;
        if (searchText && typeof searchText !== 'string') {
            return res.send(
                new ResponseFailure(
                    Errors.VALIDATION_ERROR,
                    StatusCodes.BAD_REQUEST,
                    [{
                        property: 'searchText',
                        constraints: ['searchText must be a string']
                    }]
                ))
        }
        next();
    }
}

export const validateUpdateTaskStageRequest = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const updateTaskStageDto = plainToInstance(UpdateTaskStage, req.body);
        const errors: ValidationError[] = await validate(updateTaskStageDto);
        if (errors.length) {
            return res.send(
                new ResponseFailure(
                    Errors.VALIDATION_ERROR,
                    StatusCodes.BAD_REQUEST,
                    errors.map(error => {
                        return {
                            property: error.property,
                            constraints: error.constraints,
                        }
                    })))
        }
        next();
    }
}