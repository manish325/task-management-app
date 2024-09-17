import React, { FC } from "react";
import { ROUTES } from "../utils/constants/enums";

const AuthComponent = React.lazy(()=>import("./../pages/Auth"));
const DashboardComponent = React.lazy(()=>import("./../pages/Dashboard"));
const TaskComponent = React.lazy(()=>import("./../pages/Task"));

export interface IRouteDetails {
    route : string,
    component : React.LazyExoticComponent<FC>
}

export const routes : Array<IRouteDetails> = [
    {
        route : ROUTES.AUTH,
        component: AuthComponent
    },
    {
        route : ROUTES.DASHBOARD,
        component : DashboardComponent
    },
    {
        route : ROUTES.TASK,
        component : TaskComponent
    }
]