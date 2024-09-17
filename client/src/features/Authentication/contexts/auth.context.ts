import { createContext } from "react";
import { AuthAction, IAuthContext, IAuthState } from "../types";
import { SET_LOADING, SET_SNACKBAR } from "../constants/actions";

export const authInitialState  : IAuthState = {
    loading : false,
    snackbarMessage : ''
}

export const authReducer = (state : IAuthState | undefined, action : AuthAction) : IAuthState | undefined => {
    if(state) {
        switch(action.type) {
            case SET_LOADING : 
            return {...state, ...action.payload};
            case SET_SNACKBAR :   
            return {...state, ...action.payload};
        }
    } else return undefined;
}

export const AuthContext  = createContext<IAuthContext | undefined>(undefined);