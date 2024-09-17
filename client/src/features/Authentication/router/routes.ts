import React from "react";
import { IRouteDetails } from "../../../router/routes";
import { ROUTES } from "../../../utils/constants/enums";

const LoginComponent = React.lazy(()=>import("./../components/login"));
const RegisterComponent = React.lazy(()=>import("./../components/register"));

export const AuthRoutes : IRouteDetails[] = [
    {
        route : ROUTES.LOGIN,
        component : LoginComponent
    },
    {
        route : ROUTES.REGISTER,
        component : RegisterComponent
    }
]