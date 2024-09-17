import { FC, useContext } from "react";
import { Grid, Button, Avatar } from "@mui/material"
import { LuListTodo } from "react-icons/lu";
import { DashboardContext } from "../../contexts/dashboard.context";
import { IDashboardContext, IDashboardState } from "../../types";
import { IoLogOut } from "react-icons/io5";
import useCheckMobileScreen from "../../../../hooks/useMobile";
import "./Header.scss";

export const Header: FC = () => {
    const {
        state,
        logout
    } = useContext(DashboardContext) as IDashboardContext;
    const { userData } = state as IDashboardState;
    const isMobileScreen = useCheckMobileScreen();

    return (
        <Grid container alignItems="center" justifyContent="space-between" style={{ width: '100%' }} className="header">
            <Grid item xs="auto" className="header__logo">
                <LuListTodo />
            </Grid>
            <Grid item container xs="auto" justifyContent="flex-end" alignItems="center" spacing={2}>
                <Grid item>
                    <Avatar alt="Remy Sharp" src={userData?.profilePicture}>
                        {
                            // @ts-ignore
                            userData?.profilePicture ? '' : userData?.firstName[0] + userData?.lastName[0]
                        }
                    </Avatar>
                </Grid>
                <Grid item>
                    <Button variant="contained" color="primary" onClick={logout}>
                        {
                            isMobileScreen ? <IoLogOut /> : 'Logout'
                        }
                    </Button>
                </Grid>
            </Grid>
        </Grid>



    )
}