import { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "./routes";
import { ROUTES } from "../../../utils/constants/enums";

export const AuthRouter : FC = () => {
    return (
        <Routes>
            {
                AuthRoutes.map(authroute => {
                    return (
                        <Route key={`auth-${authroute.route}`} path={authroute.route} element={<authroute.component/>}></Route>
                    )
                })
            }
            <Route path="*"  element={<Navigate to={ROUTES.LOGIN}/>} />
        </Routes>
    )
}