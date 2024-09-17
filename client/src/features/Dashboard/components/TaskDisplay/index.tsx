import { FC, useCallback, useContext, useEffect, useState } from "react";
import { Stage } from "../Stage";
import { IDashboardContext, IDashboardState, ITaskList, IStage, IStages, ITask, IUpdateTaskStage } from "../../types";
import { Grid } from "@mui/material";
import "./TaskDisplay.scss";
import { DashboardContext } from "../../contexts/dashboard.context";
import { EmptyState } from "../../../../components/EmptyState";
import {DragDropContext, DropResult} from "react-beautiful-dnd";
import { dispatchTasks } from "../../constants/dispatchers";
import {cloneDeep} from "lodash";

export interface ITaskDisplayProps {
    tasks: ITaskList
}

export const TaskDisplay: FC<ITaskDisplayProps> = ({ tasks }) => {
    const { state, dispatch, updateTaskStage, getTaskList } = useContext(DashboardContext) as IDashboardContext;
    const [cachedTaskList, setCachedTaskList] = useState<ITaskList>({
        stages : []
    });

    useEffect(() => {
        if (state?.taskList) {
            setCachedTaskList(state.taskList);
        }
    }, []);

    useEffect(() => {
        console.log("So cached task list is : ", cachedTaskList);
    }, [cachedTaskList])

    const {
        stages,
        taskList
    } = state as IDashboardState;

    useEffect(() => {
        console.log("Displaying Stages : ", stages)
    }, [stages])

    const getStage = useCallback((stage: IStage): IStages => {
        let foundStage = tasks.stages.find((s) => s.stageId === stage.id) as IStages;
        if (!foundStage) {
            foundStage = {
                stageId: stage.id,
                stageName: stage.stage,
                tasks: []
            }
        }
        console.log("Found Stage is: ", foundStage)
        return foundStage;
    }, [tasks]);

    const getStageById = useCallback((stageId : string): IStage => {
        console.log(stages);
        const foundStage = stages.find((stage) => stage.id === parseInt(stageId));
        return foundStage as IStage;
    }, [
        stages,
        state
    ]);

    const getTaskById = useCallback((taskId: string): ITask => {
        const allTasks = tasks.stages.flatMap((stage) => stage.tasks);
        const foundTask = allTasks.find((task) => task.id === parseInt(taskId));
        return foundTask as ITask;
    }, [tasks]);

    const alterTaskList = useCallback((transferData : {initial: {taskId: number, stageId: number}, final: {taskId: number, stageId: number}}) => {
        const initialTaskList = cloneDeep(state?.taskList) as ITaskList;
        console.log("Logging the initial task List : ", initialTaskList);
        setCachedTaskList(initialTaskList);
        const alteredTaskList = initialTaskList.stages.map((stage) => {

            if (stage.stageId === transferData.initial.stageId) {
                stage.tasks = stage.tasks.filter((task) => task.id !== transferData.initial.taskId);
            }
            if (stage.stageId === transferData.final.stageId) {
                stage.tasks.push(getTaskById(transferData.initial.taskId.toString()));
            }
            return stage;
        });
        // console.clear();
        console.log("Logging the altered task List : ", alteredTaskList);
        
        dispatch(dispatchTasks({
            stages : alteredTaskList
        }));
        

    }, [
        setCachedTaskList,
        getTaskById,
    ]);


    const updateStageOfTask = useCallback(async (payload : IUpdateTaskStage) => {
        const response = await updateTaskStage(payload);
        console.log("Response from update task stage is : ", response);
        if (response) {
            await getTaskList();
        } else  {
            dispatch(dispatchTasks(cachedTaskList));
        }
    }, [
        cachedTaskList,
        getTaskList,
        updateTaskStage
    ])



    const onDragEnd = useCallback((result : DropResult) => {
        const stageId = result.destination?.droppableId;
        const taskId = result.draggableId;
        const stage = getStageById(stageId as string);
        const task = getTaskById(taskId);
        const transferData = {
            initial : {
                taskId : parseInt(taskId),
                stageId : parseInt(result.source.droppableId)
            },
            final : {
                taskId : task.id,
                stageId : stage.id
            }
        };
        const taskUpdatePayload : IUpdateTaskStage = {
            taskId : task.id,
            stageId : stage.id
        }
        alterTaskList(transferData);
        updateStageOfTask(taskUpdatePayload);
    }, [getStageById, getTaskById]);

    return (
        <DragDropContext
            onDragEnd={onDragEnd}
        >
            {taskList.stages.length > 0 ? (
                <Grid container className="task-display" spacing={2} sm={12} >
                    {stages.map((stage) => (
                        <Grid item key={stage.id}> 
                            <Stage stage={getStage(stage)} key={stage.id} />
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <EmptyState />
            )}
        </DragDropContext>
    )
}