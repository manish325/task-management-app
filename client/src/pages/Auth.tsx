import { FC, useEffect } from "react";
import { AuthenticationFeature } from "../features/Authentication";
import { useLocalState } from "../hooks/localstorage";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../utils/constants/enums";

const AuthComponent : FC = ()=> {
    const [authToken] = useLocalState('auth-token');
    const navigate = useNavigate();
    useEffect(()=> {
        if(authToken) {
            navigate(ROUTES.DASHBOARD);
        }
    }, []);

    return (
        <>
            <AuthenticationFeature></AuthenticationFeature>
        </>
    )
}

export default AuthComponent;