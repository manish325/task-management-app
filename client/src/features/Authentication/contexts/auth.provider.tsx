import { FC, PropsWithChildren, useCallback, useMemo, useReducer, Reducer, useContext } from "react";
import { AuthContext, authInitialState, authReducer } from "./auth.context";
import { AuthAction, IAuthContext, IAuthState, ILoginForm, IRegisterForm } from "../types";
import { axiosService } from "../../../services/axios";
import { dispatchLoading } from "../constants/dispatchers";
import { useLocalState } from "../../../hooks/localstorage";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGES, ROUTES } from "../../../utils/constants/enums";
import { AxiosError } from "axios";
import { GlobalContext } from "../../../providers/contexts/Global";
import { dispatchSnackbar } from "../../../providers/store/dispatchers";

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, authDispatch] = useReducer<Reducer<IAuthState | undefined, AuthAction>>(authReducer, authInitialState);
    const [, setAuthToken] = useLocalState('auth-token');
    const navigate = useNavigate();
    const axiosAuthService = useMemo(() => {
        return axiosService;
    }, []);
    const { dispatchState } = useContext(GlobalContext);

    const login = useCallback(async (loginData: ILoginForm) => {
        authDispatch(dispatchLoading(true))
        console.log(loginData);
        try {
            const response = (await axiosAuthService.loginUser(loginData)).data;
            const { data, message, success, errors } = response;
            dispatchState(dispatchSnackbar(message));
            if (data && success) {
                const { token } = data;
                if (token) {
                    setAuthToken(token);
                    navigate(ROUTES.DASHBOARD);
                }
            } else {
                errors?.forEach((error: string) => {
                    dispatchState(dispatchSnackbar(error));
                })
            }
        } catch (e) {
            if (e instanceof AxiosError) {
                dispatchState(dispatchSnackbar(e.response?.data.message))
            } else {
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        } finally {
            authDispatch(dispatchLoading(false));
        }
    }, [
        axiosAuthService,
        dispatchState,
        setAuthToken,
        authDispatch
    ]);

    const register = useCallback(async (registerData: IRegisterForm) => {
        authDispatch(dispatchLoading(true));
        try {
            const response = (await axiosAuthService.registerUser(registerData)).data;
            const { data, message, success, errors } = response;
            if(!success) {
                errors?.forEach((error: string) => {
                    dispatchState(dispatchSnackbar(error));
                })
            } 
            navigate(`/auth/${ROUTES.LOGIN}`);
            dispatchState(dispatchSnackbar(message));
        } catch (e) {
            if (e instanceof AxiosError) {
                dispatchState(dispatchSnackbar(e.response?.data.message))
            } else {
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        } finally {
            authDispatch(dispatchLoading(false));
        }
    }, [
        axiosAuthService,
        dispatchState,
        setAuthToken,
        authDispatch
    ]);

    const handleGoogleLogin = useCallback(async (googleCredentials: any) => {
        try {
            const { access_token } = googleCredentials;
            const { data } = await axiosAuthService.loginWithGoogle({
                authToken: access_token
            });
            const { token } = data.data;
            setAuthToken(token);
            navigate(ROUTES.DASHBOARD);
            dispatchState(dispatchSnackbar(data.message));
        } catch (e) {
            console.log(e);
        }
    }, [
        setAuthToken,
        dispatchState,
        navigate,
        axiosAuthService
    ]);


    const contextValue: IAuthContext = useMemo(() => {
        return {
            state, authDispatch, login, register, handleGoogleLogin
        }
    },
        [
            state,
            authDispatch
        ]);

    return (
        <AuthContext.Provider
            value={contextValue}
        >
            {children}
        </AuthContext.Provider>
    )
}