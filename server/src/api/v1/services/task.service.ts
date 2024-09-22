import { Brackets, Repository, UpdateResult } from "typeorm";
import { Task } from "../models/Task.entity";
import { appDataSource } from "../../../config/DatabaseConfig";
import { DataBaseNotInitializedException } from "../Exceptions/Database.exceptions";
import { User } from "../models/User.entity";
import { StageService } from "./stage.service";
import { EditTaskDto, TaskDto, UpdateTaskStage } from "../Dto/task.dto";


export class TaskService {
    private taskRepo !: Repository<Task>;
    private userRepo !: Repository<User>;
    private stageService: StageService = new StageService();

    // private taskRepo: Repository<Task> = appDataSource.getRepository(Task);
    constructor() {
        if (!appDataSource) {
            throw new DataBaseNotInitializedException()
        } else {
            this.taskRepo = appDataSource.getRepository(Task);
            this.userRepo = appDataSource.getRepository(User);
        }
    }

    async getUserTasksWithStages(email: string, { searchText }: { searchText: string }) {
        const queryBuilder = this.userRepo.createQueryBuilder('user')
            .leftJoinAndSelect('user.tasks', 'task')
            .innerJoinAndSelect('task.stage', 'stage')
            .where('user.email = :email', { email });
    
        // Add search conditions if searchText is provided
        if (searchText) {
            const likeSearchText = `%${searchText}%`;
            queryBuilder.andWhere(
                new Brackets(qb => {
                    qb.where('task.title LIKE :searchText', { searchText: likeSearchText })
                        .orWhere('task.description LIKE :searchText', { searchText: likeSearchText })
                        .orWhere('stage.stage LIKE :searchText', { searchText: likeSearchText })
                        .orWhere('task.id LIKE :searchText', { searchText: likeSearchText });
                })
            );
        }
    
        const userWithTasksAndStages = await queryBuilder.getMany();
        const response = userWithTasksAndStages.map(user => ({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            stages: user.tasks.reduce((acc, task) => {
                if(task.isActive) {
                    let stage = acc.find(s => s.stageId === task.stage.id);
                    if (!stage) {
                        stage = {
                        stageId: task.stage.id,
                        stageName: task.stage.stage,
                        isDefault: !!task.stage.isDefault,
                        tasks: [],
                    };
                    acc.push(stage);
                }
                stage.tasks.push({
                    id: task.id,
                    title: task.title,
                    description: task.description,
                    isActive: task.isActive,
                    createdAt: task.createdAt,
                    updatedAt: task.updatedAt,
                });
            }
                return acc;
            }, [] as any[]),
        }))[0];

        const stages = await this.stageService.getAllStages();
        stages.map(stage => {
            const responseStage = response.stages.find(s => s.stageId === stage.id);
            if (!responseStage) {
                response.stages.push({
                    stageId: stage.id,
                    stageName: stage.stage,
                    isDefault: !!stage.isDefault,
                    tasks: [],
                });
            }
        });    
        return response;
    }

    
    

    async createTask(task: TaskDto, user: User) {
        const newTask = new Task();
        newTask.title = task.title;
        newTask.description = task.description;
        newTask.user = user;
        newTask.stage = await this.stageService.getDefaultStage();
        return await this.taskRepo.save(newTask);
    }

    async updateTask(task: EditTaskDto, user: User) {
        const response = await this.taskRepo.createQueryBuilder('task')
            .update(Task)
            .set(task)
            .where('task.task_id = :id', { id: task.id })
            .andWhere('task.userId = :user', { user: user.id })
            .execute();
        return response;
    }

    async updateTaskStage (payload : UpdateTaskStage) : Promise<Task> {
        const {
            taskId,
            stageId
        } = payload;

        const response = await this.taskRepo.createQueryBuilder('task');
        const taskToUpdate = await this.taskRepo.findOne({
            where : {
                id : taskId
            }
        });
        const stageToPutTask = await this.stageService.getStageById(stageId);
        if (taskToUpdate && stageToPutTask) {
            // Update the stage of the task
            taskToUpdate.stage = stageToPutTask;
    
            // Save the updated task
            return await this.taskRepo.save(taskToUpdate);
        } else {
            throw new Error('Task or Stage not found');
        }
    }

    async deleteTask(taskId : number) {
        await this.taskRepo.update(taskId, { isActive: false });
    }
}