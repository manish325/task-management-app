import { EditTaskDto, TaskDto, UpdateTaskStage } from "../Dto/task.dto";
import { User } from "../models/User.entity";
import { AuthService } from "../services/auth.service";
import { TaskService } from "../services/task.service";
import { NextFunction, Request, Response } from "express";
import { ResponseFailure, ResponseSuccess } from "../types/response";
import { Errors, RESPONSE_PHRASES } from "../../../config/constants";
import { StatusCodes } from "http-status-codes";

export class TaskController {

    constructor(
        private taskService: TaskService,
        private authService: AuthService
    ) { }

    async getAllTasks(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, id } = req.user as any;
            const {searchText} = req.query as {searchText : string};
            const user = await this.authService.getUserByEmail(email);
            if (!user) {
                return res.status(404).send(
                    new ResponseFailure(
                        Errors.SOMETHING_WENT_WRONG,
                        StatusCodes.UNAUTHORIZED,
                        [Errors.SOMETHING_WENT_WRONG]
                    )
                );
            }
            const tasks = await this.taskService.getUserTasksWithStages(user.email, {searchText});
            console.log('Logging the task', tasks)
            return res.send(
                new ResponseSuccess(
                    RESPONSE_PHRASES.TASKS_FETCHED,
                    StatusCodes.OK,
                    tasks || {
                        stages : []
                    }
                )
            )
        } catch (e) {
            next(e);
        }
    }

    async createTask(req: Request, res: Response, next: NextFunction) {
        try {

            console.log("Validation Successful in actual!");
            const { email, id } = req.user as any;
            const taskToCreate = req.body as TaskDto;
            const taskCreatedUser = await this.authService.getUserByEmail(email);
            if (!taskCreatedUser) {
                return res.status(404).send(
                    new ResponseFailure(
                        Errors.SOMETHING_WENT_WRONG,
                        StatusCodes.UNAUTHORIZED,
                        [Errors.SOMETHING_WENT_WRONG]
                    )
                );
            }
            const taskCreated = await this.taskService.createTask(taskToCreate, taskCreatedUser as User);
            return res.send(
                new ResponseSuccess(
                    RESPONSE_PHRASES.TASK_CREATED,
                    StatusCodes.CREATED,
                    taskCreated
                )
            )
        } catch (e) {
            next(e);
        }

    }

    async updateTask(req: Request, res: Response, next: NextFunction) {
        try {
            const { email, id } = req.user as any;
            const taskToUpdate = req.body as EditTaskDto;
            const taskUpdatedUser = await this.authService.getUserByEmail(email);
            if (!taskUpdatedUser) {
                return res.status(404).send(
                    new ResponseFailure(
                        Errors.SOMETHING_WENT_WRONG,
                        StatusCodes.UNAUTHORIZED,
                        [Errors.SOMETHING_WENT_WRONG]
                    )
                );
            }
            const taskCreated = await this.taskService.updateTask(taskToUpdate, taskUpdatedUser as User);
            return res.send(
                new ResponseSuccess(
                    RESPONSE_PHRASES.TASK_CREATED,
                    StatusCodes.CREATED,
                    taskCreated
                )
            );
        } catch (e) {
            next(e);
        }
    }

    async updateTaskStage (req: Request, res: Response, next: NextFunction) { 
        const {
            taskId,
            stageId
        }  = req.body as UpdateTaskStage;
        console.log("Controller got control over!!");
        
        try {
            const result = this.taskService.updateTaskStage({taskId, stageId});
            return res.status(StatusCodes.OK).send(
                new ResponseSuccess(
                    RESPONSE_PHRASES.TASK_STAGE_UPDATED,
                    StatusCodes.OK,
                    result
                )
            )
        } catch (e) {
            next(e);
        }
    }

    async deleteTask (req : Request, res: Response, next: NextFunction) {
        // TODO: Implement this
        const {id} = req.query as {id: string};
        if(!id) {
            return res.status(StatusCodes.BAD_REQUEST).send(
                new ResponseFailure(
                    Errors.TASK_ID_REQUIRED,
                    StatusCodes.BAD_REQUEST,
                    [Errors.TASK_ID_REQUIRED]
                )
            )
        }
        try {
            await this.taskService.deleteTask(parseInt(id));
            return res.status(StatusCodes.OK).send(
                new ResponseSuccess(
                    RESPONSE_PHRASES.TASK_DELETED,
                    StatusCodes.OK,
                    {}  
                )
            )
        } catch(e) {
            next(e);
        }

    }
}