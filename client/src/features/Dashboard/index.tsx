import { FC, useEffect } from "react";
import "./authentication.scss";
import { DashboardLayout } from "./layouts/Auth";
import { DashboardProvider } from "./contexts";
import { axiosService } from "../../services/axios";
import { useLocalState } from "../../hooks/localstorage";

export const DashboardFeature: FC = () => {
    const [token] = useLocalState('auth-token');
    useEffect( () => {
        const taskInstance = axiosService.getTaskInstance();
        if(token && !taskInstance
        ) {
            axiosService.createTaskInstance(token as string);
            // axiosService.test();
        }
    }, [token]);
    return (
            <DashboardProvider>
                <DashboardLayout />
            </DashboardProvider>
    )
}