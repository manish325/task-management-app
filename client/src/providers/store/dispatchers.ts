import { Theme } from "@mui/material";
import { ActionTypes, GlobalActions } from "./Global";

export const dispatchTheme = (theme : Theme) : GlobalActions => {
    return {
        type : ActionTypes.SET_THEME,
        payload : {
            theme
        }
    }
}

export const dispatchSnackbar = (snackbarMessage : string) => {
    return {
        type : ActionTypes.SET_SNACKBAR,
        payload : {
            snackbarMessage
        }
    }
}