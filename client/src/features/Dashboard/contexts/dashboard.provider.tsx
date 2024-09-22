import { FC, PropsWithChildren, useCallback, useMemo, useReducer, Reducer, useContext, useEffect, useState } from "react";
import { DashboardContext, authInitialState, dashboardReducer } from "./dashboard.context";
import { Action, IDashboardContext, IDashboardState, ITask, ITaskForm, IUpdateTaskStage } from "../types";
import { axiosService } from "../../../services/axios";
import { useLocalState } from "../../../hooks/localstorage";
import { useNavigate } from "react-router-dom";
import { ERROR_MESSAGES, ROUTES } from "../../../utils/constants/enums";
import { AxiosError } from "axios";
import { GlobalContext } from "../../../providers/contexts/Global";
import { dispatchSnackbar } from "../../../providers/store/dispatchers";
import { useUserData } from "../../../hooks/useUserData";
import { SET_USER } from "../constants/actions";
import { dispatchStages, dispatchTasks } from "../constants/dispatchers";

export const DashboardContextProvider: FC<PropsWithChildren> = ({ children }) => {
    const [state, dispatch] = useReducer<Reducer<IDashboardState | undefined, Action>>(dashboardReducer, authInitialState);
    const [, setAuthToken] = useLocalState('auth-token');
    const [taskToEdit, setTaskToEdit] = useState<ITask | undefined>(undefined);
    const [taskToDelete, setTaskToDelete] = useState<ITask | undefined>(undefined);
    const { userData } = useUserData();
    const navigate = useNavigate();
    const axiosDashboardService = useMemo(() => {
        return axiosService;
    }, []);
    const { dispatchState } = useContext(GlobalContext);

    useEffect(() => {
        if (userData) {
            dispatch({
                type: SET_USER,
                payload: { userData }
            })
        }
    }, [userData]);


    const logout = useCallback(() => {
        setAuthToken('');
        navigate(`/auth/${ROUTES.LOGIN}`);
    }, [
        setAuthToken,
        navigate
    ]);

    const createTask = useCallback(async (task: ITaskForm) => {
        try {
            const response = (await axiosDashboardService.createTask(task)).data;
            const {  message, success, errors } = response;
            dispatchState(dispatchSnackbar(message));
            if (!success) {
                errors?.map(error => {
                    dispatchState(dispatchSnackbar(error));
                })
            }
        } catch (error: any) {
            if (error instanceof AxiosError) {
                dispatchState(dispatchSnackbar(error.response?.data.message));
            } else {
                if(error.message) {
                    dispatchState(dispatchSnackbar(error.message));
                }
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        }
    }, [
        dispatchState,
        axiosDashboardService
    ]);

    const updateTask = useCallback(async (task: ITask) => {
        try {
            const response = (await axiosDashboardService.updateTask(task, task.id)).data;
            const { message, success, errors } = response;
            dispatchState(dispatchSnackbar(message));
            if (!success) {
                errors?.map(error => {
                    dispatchState(dispatchSnackbar(error));
                })
            }
        } catch (error: any) {
            console.log(error);
            if (error instanceof AxiosError) {
                dispatchState(dispatchSnackbar(error.response?.data.message));
            } else {
                if(error.message) {
                    dispatchState(dispatchSnackbar(error.message));
                }
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        }
    }, [
        dispatchState,
        axiosDashboardService
    ]);


    const updateTaskStage = useCallback(async ({taskId, stageId} : IUpdateTaskStage) => {
        try {
            const response = (await axiosDashboardService.updateTaskStage(taskId, stageId)).data;
            const {  message, success, errors } = response;
            // dispatchState(dispatchSnackbar(message));
            if (!success) {
                errors?.map(error =>{
                    dispatchState(dispatchSnackbar(error));
                }) 
            }
            return success;
        } catch (error: any) {
            console.log(error);
            if (error instanceof AxiosError) {
                dispatchState(dispatchSnackbar(error.response?.data.message));
            } else {
                if(error.message) {
                    dispatchState(dispatchSnackbar(error.message));
                }
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
            return false;
        }
    }, 
    [
        dispatchState,
        axiosDashboardService
    ]
    );

    const getTaskList = useCallback(async (searchText ?: string) => {
        try {
            const response = (await axiosDashboardService.getAllTasks({searchText :  searchText || ''})).data;
            const { success, errors, data} = response;
            console.log("Logging the data", data);
            if (!success) {
                errors?.map(error =>{
                    dispatchState(dispatchSnackbar(error));
                }) 
            } else {
                dispatch(
                    dispatchTasks({
                        stages : data.stages
                    })
                )
            }
        }catch (error: any) {
            console.log(error);
            if (error instanceof AxiosError) {
                dispatchState(dispatchSnackbar(error.response?.data.message));
            } else {
                if(error.message) {
                    dispatchState(dispatchSnackbar(error.message));
                }
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        }
    }, [dispatchState]);

    const getAllStages = useCallback(async () => {
        try {
            const response = (await axiosDashboardService.getAllStages()).data;
            const { success, errors, data} = response;
            console.log("Logging the Stages Data", data);
            if (!success) {
                errors?.map(error =>{
                    dispatchState(dispatchSnackbar(error));
                }) 
            } else {
                dispatch(
                    dispatchStages(data)
                )
            }
        } catch (error: any) {
            console.log(error);
            if (error instanceof AxiosError) {
                dispatchState(dispatchSnackbar(error.response?.data.message));
            } else {
                if(error.message) {
                    dispatchState(dispatchSnackbar(error.message));
                }
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        }

                
    }, [
        dispatchState,
        axiosDashboardService

    ]);

    const deleteTask = useCallback(async (taskId: number) => {
        try {
            const response = (await axiosDashboardService.deleteTask(taskId)).data;
            const {  message, success, errors } = response;
            dispatchState(dispatchSnackbar(message));
            if (!success) {
                errors?.map(error =>{
                    dispatchState(dispatchSnackbar(error));
                }) 
            } 
        } catch(error : any) {
            console.log(error);
            if (error instanceof AxiosError) {
                dispatchState(dispatchSnackbar(error.response?.data.message));
            } else {
                if(error.message) {
                    dispatchState(dispatchSnackbar(error.message));
                }
                dispatchState(dispatchSnackbar(ERROR_MESSAGES.SOMETHING_WENT_WRONG));
            }
        }  
    }, [
        axiosDashboardService,
        dispatchState,
        dispatchSnackbar        
    ])

    const onEditTask = useCallback(async (task? : ITask) => {
        if(task) {
            setTaskToEdit(task);
        } else {
            await updateTask(taskToEdit as unknown as ITask);
            await getTaskList();
            setTaskToEdit(undefined);
        }
    }, [
        setTaskToEdit,
        updateTask,
        getTaskList
    ]);

    const onDeleteTask = useCallback(async (task?: ITask) => {
        console.log(task);
        if(task?.title)  {
            setTaskToDelete(task);
        } else {
            await deleteTask(taskToDelete?.id as number);
            await getTaskList();
            setTaskToDelete(undefined);
        }
    }, [
        setTaskToDelete,
        deleteTask,
        taskToDelete,
        getTaskList
    ]);

    const setPinnedTaskNull = useCallback(() => {
        if(taskToDelete) {
            return setTaskToDelete(undefined);
        } 
        return setTaskToEdit(undefined);
    }, [
        taskToDelete,
        setTaskToDelete,
        setTaskToEdit
    ])

    const contextValue: IDashboardContext = useMemo(() => {
        return {
            state,
            dispatch,
            logout,
            createTask,
            updateTask,
            updateTaskStage,
            getTaskList,
            getAllStages,
            onEditTask,
            onDeleteTask,
            taskToDelete,
            taskToEdit,
            setPinnedTaskNull
        }
    },
        [
            state,
            dispatch,
            logout,
            createTask,
            updateTask,
            updateTaskStage,
            getTaskList,
            getAllStages,
            onEditTask,
            onDeleteTask,
            taskToDelete,
            taskToEdit,
            setPinnedTaskNull
        ]
    );

    return (
        <DashboardContext.Provider
            value={contextValue}
        >
            {children}
        </DashboardContext.Provider>
    )
}