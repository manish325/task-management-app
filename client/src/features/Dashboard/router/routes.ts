import React from "react";
import { IRouteDetails } from "../../../router/routes";
import { ROUTES } from "../../../utils/constants/enums";

const UserDashboardComponent = React.lazy(()=>import("../pages/UserHome"));
const AdminDashboardComponent = React.lazy(()=>import("../pages/AdminHome"));

export const dashboardRoutes : IRouteDetails[] = [
    {
        route : ROUTES.DASHBOARD,
        component : UserDashboardComponent
    },
    {
        route : ROUTES.USER_DASHBOARD,
        component : UserDashboardComponent
    },
    {
        route : ROUTES.ADMIN_DASHBOARD,
        component : AdminDashboardComponent
    }
]