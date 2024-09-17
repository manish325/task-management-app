import { FC } from "react";
import {Avatar} from "@mui/material"
import { useUserData } from "../hooks/useUserData";
import { DashboardFeature } from "../features/Dashboard";

const DashboardComponent : FC = () => {
    const {userData} = useUserData();
    console.log(userData)
    return (
        <DashboardFeature/>
    )
}

export default DashboardComponent;