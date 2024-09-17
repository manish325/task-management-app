import { FC, useContext } from "react";
import { CircularProgress } from "@mui/material";
import { GlobalContext } from "../../providers/contexts/Global";

export interface ILoaderProps {
    isLoading: boolean
}

export const Loader: FC<ILoaderProps> = ({ isLoading }) => {
    return (
        <>
            {
                isLoading ?
                <div className="loader-container">
                    <CircularProgress />
                </div> : null
            }
        </>
    )
}