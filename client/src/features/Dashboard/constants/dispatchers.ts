import { IUserData } from "../../../types/auth";
import { Action, IStage, ITaskList } from "../types";
import { SET_LOADING, SET_SNACKBAR } from "./actions";

export const dispatchLoading = (loading : boolean) : Action => {
    return {
        type : SET_LOADING,
        payload : {
            loading
        }
    }
}

export const dispatchSnackbar = (snackbarMessage : string) : Action => {
    return {
        type : SET_SNACKBAR,
        payload : {
            snackbarMessage
        }
    }
}

export const dispatchUsers = (user : IUserData) : Action  => {
    return {
        type : "SET_USERS",
        payload : {
            userData : user
        }
    }
}

export const dispatchTasks = (tasks: ITaskList) : Action => {
    console.clear();
    console.log("Setting tasks : ", tasks);
    return {
        type : "SET_TASKS",
        payload : {
            taskList : tasks
        }
    }
}

export const dispatchStages = (stages : IStage[]) : Action => {
    return {
        type : "SET_STAGES",
        payload : {
            stages
        }
    }
}

