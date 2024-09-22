import express from "express";
import { TaskService } from "../services/task.service";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { TaskController } from "../controllers/Task.controller";
import { AuthService } from "../services/auth.service";
import { getAllTaskQueryParamValidation, validateCreateTaskRequest, validateUpdateTaskRequest, validateUpdateTaskStageRequest } from "../validations/task.validations";

export const taskRouter = express.Router();

taskRouter.use(AuthMiddleware);
taskRouter.use((req, res, next) => {
    console.log("Task Route");
    next()
})

taskRouter.get("/getAllTasks", getAllTaskQueryParamValidation(), async (req, res, next) => {
    const taskService = new TaskService();
    const authService = new AuthService();
    const taskController = new TaskController(
        taskService,
        authService
    );
    return taskController.getAllTasks(req, res, next);
});

taskRouter.post("/createTask", validateCreateTaskRequest(), async (req, res, next) => {
    console.log("Validation Successful!");
    const taskService = new TaskService();
    const authService = new AuthService();
    const taskController = new TaskController(
        taskService,
        authService
    );
    return taskController.createTask(req, res, next);
});


taskRouter.post("/updateTask", validateUpdateTaskRequest(), async (req, res, next) => {
    const taskService = new TaskService();
    const authService = new AuthService();
    const taskController = new TaskController(
        taskService,
        authService
    );
    return taskController.updateTask(req, res, next);
});


taskRouter.patch('/updateTaskStage', validateUpdateTaskStageRequest(), async (req, res, next) => {
    console.log("Inside update stage");
    const taskService = new TaskService();
    const authService = new AuthService();
    const taskController = new TaskController(
        taskService,
        authService
    );
    return taskController.updateTaskStage(req, res, next)
});

taskRouter.delete('/deleteTask', async (req, res, next) => {
    console.log("Request recieved")
    const taskService = new TaskService();
    const authService = new AuthService();
    const taskController = new TaskController(
        taskService,
        authService
    );
    return taskController.deleteTask(req, res, next);
});

