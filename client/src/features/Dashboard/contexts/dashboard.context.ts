import { createContext } from "react";
import { Action, IDashboardContext, IDashboardState } from "../types";
import { SET_LOADING, SET_SNACKBAR, SET_TASKS, SET_USER, SET_STAGES } from "../constants/actions";

export const authInitialState  : IDashboardState = {
    loading : false,
    snackbarMessage : '',
    userData : null,
    taskList : {
        stages : []
    },
    stages : []
}

export const dashboardReducer = (state : IDashboardState | undefined, action : Action) : IDashboardState | undefined => {
    if(state) {
        switch(action.type) {
            case SET_LOADING : 
            return {...state, ...action.payload};
            case SET_SNACKBAR :   
            return {...state, ...action.payload};
            case SET_USER : 
            return {...state, ...action.payload};
            case SET_TASKS : 
            return {...state, ...action.payload};
            case SET_STAGES : 
            return {...state, ...action.payload};
        }
    } else return undefined;
}

export const DashboardContext  = createContext<IDashboardContext | undefined>(undefined);