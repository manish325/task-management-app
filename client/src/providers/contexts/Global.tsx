import React, { createContext, FC, PropsWithChildren, useMemo, useReducer} from 'react'
import { GlobalState, initialGlobalState, globalReducer, GlobalActions } from '../store/Global'

interface GlobalContextInterface {
    state: GlobalState
    dispatchState: React.Dispatch<GlobalActions>
}

/**
 * Global Context
 * this holds the values that are needed throughout the project
 * or require some sort of long polling strategies
 * like keeping track of current live and notifications
 */
export const GlobalContext = createContext<GlobalContextInterface>({
    state: initialGlobalState,
    dispatchState: ()=>undefined
})

/**
 * Global Provider
 * the is the provider for the global context
 */
export const GlobalProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer(globalReducer, initialGlobalState);
    
    const contextvalue = useMemo(() => {
        return {
            state,
            dispatchState: dispatch
        }
    }, [state, dispatch]);

    return (
        <>
            <GlobalContext.Provider value={contextvalue}>
                {children}
            </GlobalContext.Provider>
        </>
    )
}
