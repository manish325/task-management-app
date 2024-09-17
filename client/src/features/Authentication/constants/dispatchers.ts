import { AuthAction } from "../types";
import { SET_LOADING, SET_SNACKBAR } from "./actions";

export const dispatchLoading = (loading : boolean) : AuthAction => {
    return {
        type : SET_LOADING,
        payload : {
            loading
        }
    }
}

export const dispatchSnackbar = (snackbarMessage : string) : AuthAction => {
    return {
        type : SET_SNACKBAR,
        payload : {
            snackbarMessage
        }
    }
}