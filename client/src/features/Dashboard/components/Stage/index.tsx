import { FC } from "react";
import { Typography, Paper, List, ListItem, ListItemText } from '@mui/material';
import { IStages } from "../../types";
import { Task } from "../Task";
import "./Stage.scss";
import { Draggable, Droppable } from "react-beautiful-dnd";

export interface IStageProps {
    stage: IStages,
}

export const Stage: FC<IStageProps> = ({ stage }) => {
    const { tasks } = stage;
    return (
        <main className="stage-container" key={stage.stageId}>
            <div className="stage-title">
                <Typography variant="h5" component="h2">{stage.stageName}</Typography>
            </div>
            <Droppable droppableId={stage.stageId.toString()} isDropDisabled={false} type={'dropZone'}>
                {
                    (provided) => {                        
                      return  (
                        <>
                            <div className="tasks-list-container" ref={provided.innerRef} {...provided.droppableProps}>
                                {
                                    tasks.length ? tasks.map((task) => {
                                        return (
                                            <Task {...task} key={task.id} />
                                        )
                                    }) : <Draggable draggableId={'-1'.toString()} index={-1}>
                                    {(provided) => (
                                         <div
                                         className="task-card empty-task-card"
                                         ref={provided.innerRef}
                                         {...provided.draggableProps}
                                         {...provided.dragHandleProps}
                                     >
                                         
                                         </div>
                                    )}
                                  </Draggable>
                                }
                            </div>
                            <div className="placeholder">
                              {provided.placeholder || 'null'}
                            </div>
                        </>
 
                    )}
                }
            </Droppable>
        </main>
    );
}