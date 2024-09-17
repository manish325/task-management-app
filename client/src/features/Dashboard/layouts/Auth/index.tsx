import { FC } from "react";
import "./dashboard-layout.scss";
import {Grid} from "@mui/material"
import { DashboardRouter } from "../../router";

export const DashboardLayout : FC = () => {
    return (
        <Grid className="dashboard-layout">
            <Grid item className="login-form">
                <DashboardRouter/>
            </Grid>
        </Grid>
    )
}