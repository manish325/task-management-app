import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { dashboardRoutes } from "./routes";
import { ROUTES } from "../../../utils/constants/enums";

export const DashboardRouter : FC = () => {
    return (
        <Routes>
            {
                dashboardRoutes.map(dashboardRoute => {
                    return (
                        <Route key={`${dashboardRoute.route}`} path={dashboardRoute.route} element={<dashboardRoute.component/>}></Route>
                    )
                })
            }
            <Route path="*"  element={<Navigate to={`/dashboard/${ROUTES.USER_DASHBOARD}`}/>} />
        </Routes>
    )
}