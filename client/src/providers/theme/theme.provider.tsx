import { ThemeProvider } from "@emotion/react";
import { FC, PropsWithChildren, useContext, useEffect } from "react";
import { GlobalContext } from "../contexts/Global";

export const LocalThemeProvider : FC<PropsWithChildren> = ({children})=>{

    const {state} = useContext(GlobalContext);

    useEffect(()=>{
        console.log('Logging theme from Local Theme Provider');
        if (state && state.theme) {
            console.log(state.theme);
        }
    }, [state]);
    return (
        <ThemeProvider theme={state?.theme}>
            {children}
        </ThemeProvider>
    )
}
