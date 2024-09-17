import { AuthContextProvider } from './auth.provider';
import { PropsWithChildren, FC } from "react";

export const AuthProvider : FC<PropsWithChildren> = ({children}) => {
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}