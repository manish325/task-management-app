import { FC } from "react";
import "./auth-layout.scss";
import {Grid} from "@mui/material"
import { AuthRouter } from "../../router";

export const AuthLayout:FC = () => {
    return (
        <Grid className="auth-layout">
            <Grid item className="login-form-wrapper">
                <AuthRouter/>
            </Grid>
        </Grid>
    )
}