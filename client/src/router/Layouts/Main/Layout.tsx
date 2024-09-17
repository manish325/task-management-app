import {useContext, useEffect} from "react";
import { ContentRouter } from "../../ContentRouter";
import "./layout.scss";
import { useLocation, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../utils/constants/enums";
import { useLocalState } from "../../../hooks/localstorage";
import { Snackbar } from "@mui/material";
import { dispatchSnackbar } from "../../../providers/store/dispatchers";
import { GlobalContext } from "../../../providers/contexts/Global";
import { Loader } from "../../../components/Loader";

const Layout = () => {
    // const { dispatchState } = useContext(GlobalContext);
    const location = useLocation();
    const [isLoggedIn] = useLocalState('auth-token', true);
    const navigate = useNavigate();
    const {state, dispatchState} = useContext(GlobalContext);
    const {snackbarMessage} = state;
    // const toggleTheme = useCallback((isLight: boolean) => {
    //     if (isLight) {
    //         dispatchState(dispatchTheme(lightTheme));
    //     } else {
    //         dispatchState(dispatchTheme(darkTheme));
    //     }
    // }, [dispatchState]);

    useEffect(()=> {
        if(location.pathname === '/' && isLoggedIn) {
            navigate(ROUTES.DASHBOARD);
        } else if(location.pathname === '/' && !isLoggedIn) {
            navigate(ROUTES.AUTH);
        }
    }, [location])

    return (
        <main className="layout-container">
            {/* {
                false &&
                <div className="theme-container">
                    <Toggle toggleTheme={toggleTheme}></Toggle>
                </div>
            } */}
            <Snackbar
                open = {snackbarMessage ? true : false}
                message = {snackbarMessage}
                autoHideDuration={6000}
                onClose={() => {
                    dispatchState(dispatchSnackbar(''));
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            ></Snackbar>
            <div className="outlet">
                <ContentRouter></ContentRouter>
            </div>
        </main>
    )
}

export default Layout;