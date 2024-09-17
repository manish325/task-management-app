import { useCallback, useContext, useEffect, useState } from "react"
import { IUserData } from "../types/auth"
import { GlobalContext } from "../providers/contexts/Global";
import { dispatchSnackbar } from "../providers/store/dispatchers";
import { useLocalState } from "./localstorage";
import { axiosService } from "../services/axios";
import { AxiosError } from "axios";
import { ERROR_MESSAGES, ROUTES } from "../utils/constants/enums";
import { useNavigate } from "react-router-dom";

export const useUserData = () => {
    const [userData, setUserData] = useState<IUserData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [ token] = useLocalState('auth-token');
    const navigate = useNavigate();
    const {
        dispatchState
    } = useContext(GlobalContext);

    useEffect(() => {
        if(!token) {
            return navigate(
                `/auth/${ROUTES.LOGIN}`
            );
        }
        if(!userData) {
            getUserData();
        }
    }, []);

    const getUserData = useCallback(async () => {
        try {
            setLoading(true);
            const {data} = await axiosService.getUserDetails(token as string || '');
            setUserData(data.data);
        } catch(e) {
            setLoading(false);
            if(e instanceof AxiosError) {
                dispatchState(dispatchSnackbar(e.response?.data.message))
            } else {
                alert();
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        } finally {
            setLoading(false);
        }
    }, [
        token,
        dispatchState,
        setLoading
    ])

    return {userData, setUserData, loading, getUserData};
}