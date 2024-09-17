import { User } from "../models/User.entity";

export class IGoogleUser {
  id !: string;
  email  !: string;
  name !: string;
  given_name !: string;
  family_name !: string;
  picture !: string;
  locale !: string;
}

export interface ILoginResponse {
  token: string;
  user: User;
}


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