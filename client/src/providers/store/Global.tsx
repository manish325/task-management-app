/**
 * Type Definitions
 */

import { Theme } from '@mui/material'
import { Reducer } from 'react'
import { lightTheme } from '../../theme/themes'

export interface GlobalState {
    theme : Theme,
    snackbarMessage : string,
}

/**
 * Initial State
 */

export const initialGlobalState: GlobalState = {
    theme : lightTheme,
    snackbarMessage : ''
}

/**
 * Action Definitions
 */
export const ActionTypes = {
   SET_THEME : 'SET_THEME',
   SET_SNACKBAR : "SET_SNACKBAR"
} as const;

type ActionTypes = typeof ActionTypes[keyof typeof ActionTypes];

export type GlobalActions = 
{
    type : 'SET_THEME',
    payload : {
        theme : Theme
    }
} |
{
    type : typeof ActionTypes.SET_SNACKBAR,
    payload : {
        snackbarMessage : string
    }
}

/**
 * Reducer Definition
 */

export const globalReducer: Reducer<GlobalState, GlobalActions> = (
    state : GlobalState,
    action : GlobalActions
) => {
    switch(action.type) {
        case 'SET_THEME' : 
        return {...state, theme : action.payload.theme}
        case "SET_SNACKBAR" : 
        return {...state, snackbarMessage : action.payload.snackbarMessage}
    }
}
