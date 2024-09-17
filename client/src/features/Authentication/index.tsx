import { FC } from "react";
import "./authentication.scss";
import { AuthLayout } from "./layouts/Auth";
import { AuthProvider } from "./contexts";
import { GoogleOAuthProvider } from "@react-oauth/google"

export const AuthenticationFeature: FC = () => {
    return (
        <GoogleOAuthProvider
            clientId={
                import.meta.env.VITE_APP_GOOGLE_CLIENT_ID || ''
            }
        >
            <AuthProvider>
                <AuthLayout />
            </AuthProvider>
        </GoogleOAuthProvider>
    )
}