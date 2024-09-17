import { DashboardContextProvider } from './dashboard.provider';
import { PropsWithChildren, FC } from "react";

export const DashboardProvider : FC<PropsWithChildren> = ({children}) => {
    return (
        <DashboardContextProvider>
            {children}
        </DashboardContextProvider>
    )
}