import axios, {AxiosInstance, AxiosResponse} from 'axios'
import { ILoginForm, ILoginWithGoogle, IRegisterForm } from '../features/Authentication/types';
import { IStage, ITask, ITaskForm, ITaskList } from '../features/Dashboard/types';
import { API_ENDPOINTS } from '../utils/constants/enums';
import { ILoginResponse, IRegisterResponse, IUserData } from '../types/auth';
import { IApiResponse } from '../types/response';

class Axios {
    private authInstance : AxiosInstance | null = null;
    private taskInstance : AxiosInstance | null = null;
    constructor() {
        this.authInstance = axios.create({
            baseURL : import.meta.env.VITE_APP_API_URL
        });
        console.log('Logging the base url : ', import.meta.env.VITE_APP_API_URL)
    }

    getAxiosInstance() : AxiosInstance | null {
        console.log(this.authInstance?.getUri());
        return this.authInstance;
    }

    createTaskInstance(token : String) : AxiosInstance | null {
        this.taskInstance = axios.create({
            baseURL : import.meta.env.VITE_APP_API_URL,
            headers : {
                Authorization : `Bearer ${token}`
            }
        });
        return this.taskInstance;
    }

    getTaskInstance() : AxiosInstance | null {
        return this.taskInstance;
    }

    async registerUser(userData : IRegisterForm) : Promise<AxiosResponse<IApiResponse<IRegisterResponse>>> {
        return await (this.authInstance as AxiosInstance).post(API_ENDPOINTS.REGISTER, userData);
    }

    async loginUser (userData : ILoginForm) : Promise<AxiosResponse<IApiResponse<ILoginResponse>>> {
        return await (this.authInstance as AxiosInstance).post(API_ENDPOINTS.LOGIN, userData);
    }

    async loginWithGoogle (userGoogleData : ILoginWithGoogle) {
        return await (this.authInstance as AxiosInstance).post(API_ENDPOINTS.LOGIN_WITH_GOOGLE, userGoogleData);
    }

    async getUserDetails(token : string) : Promise<AxiosResponse<IApiResponse<IUserData>>> {
        return await (this.authInstance as AxiosInstance).post(API_ENDPOINTS.USER_DETAILS, {authToken : token}) as AxiosResponse<IApiResponse<IUserData>>;
    }

    async createTask(taskData : ITaskForm) : Promise<AxiosResponse<IApiResponse<ITask>>> { 
        return await (this.taskInstance as AxiosInstance).post(API_ENDPOINTS.CREATE_TASK, taskData)
    }

    async updateTask(taskData : ITaskForm, taskId : number) : Promise<AxiosResponse<IApiResponse<ITask>>> {
        return await (this.taskInstance as AxiosInstance).post(API_ENDPOINTS.UPDATE_TASK, { id: taskId, ...taskData})
    }

    async updateTaskStage (taskId: number, stageId : number) : Promise<AxiosResponse<IApiResponse<ITask>>> {
        return await (this.taskInstance as AxiosInstance).patch(API_ENDPOINTS.UPDATE_TASK_STAGE, { taskId, stageId })
    }
    async test() {
        return await (this.taskInstance as AxiosInstance).get(API_ENDPOINTS.CREATE_TASK)
    }
    async getAllTasks ({searchText} : {searchText : string}) : Promise<AxiosResponse<IApiResponse<ITaskList>>> {
        if(searchText) {
            return await (this.taskInstance as AxiosInstance).get(API_ENDPOINTS.GET_TASKS, { params: {searchText} });
        }
        return await (this.taskInstance as AxiosInstance).get(API_ENDPOINTS.GET_TASKS);
    }
    async getAllStages () : Promise<AxiosResponse<IApiResponse<IStage[]>>> {
        return await (this.taskInstance as AxiosInstance).get(API_ENDPOINTS.GET_ALL_STAGES);
    }

    async deleteTask (taskId : number) : Promise<AxiosResponse<IApiResponse<ITask>>> {
        const constructedUrl = `${API_ENDPOINTS.DELETE_TASK}?id=${taskId}`
        return await (this.taskInstance as AxiosInstance).delete(constructedUrl);
    }
}

export const axiosService = new Axios();