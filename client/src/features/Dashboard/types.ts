import { IUserData } from "../../types/auth"

export interface IAuthenticationProps {
    
}

export interface ITask {
    id : number,
    title : string,
    description : string,
    createdAt : string,
    updatedAt : string,
}

export interface ITaskForm {
    title : string,
    description : string
}

export interface ITaskList {
    stages : IStages[]
}

export interface IDashboardState {
    loading : boolean,
    snackbarMessage : string
    userData : IUserData | null,
    taskList : ITaskList,
    stages : IStage[]
}

export interface IDashboardContext {
    state : IDashboardState | undefined,
    dispatch : (action : Action) => void,
    logout : () => void
    createTask :(task : ITaskForm) => void,
    updateTask : (task : ITask) => void,
    getTaskList : (searchText?: string) => void,
    getAllStages : () => void,
    onEditTask : (task : ITask) => void,
    onDeleteTask : (task? : ITask) => void,
    updateTaskStage : (data : IUpdateTaskStage) => Promise<boolean>,
    taskToEdit : ITask | undefined,
    taskToDelete : ITask | undefined,
    setPinnedTaskNull : () => void

}

export interface Action {
    type : string,
    payload : any
}

export interface IUpdateTaskStage {
    taskId : number,
    stageId : number
}

export interface IStages {
    stageId : number,
    stageName : string,
    tasks : ITask[]
}

export interface IStage {
    id : number,
    stage : string,
    isDefault : boolean
}

export interface ISearchTask  {
    searchText : string | undefined
}