import { FC, useContext } from "react";
import { IDashboardContext, ITask } from "../../types";
import "./Task.scss";
import { Draggable } from "react-beautiful-dnd";
import { DashboardContext } from "../../contexts/dashboard.context";

export interface ITaskProps {
    task: ITask
}

export const Task: FC<ITask> = (task) => {
    const { id, title, description, updatedAt } = task;
    const { onEditTask, onDeleteTask } = useContext(DashboardContext) as IDashboardContext;
    return (
          <Draggable draggableId={id.toString()} index={id}>
            {(provided) => (
                 <div
                 className="task-card"
                 ref={provided.innerRef}
                 {...provided.draggableProps}
                 {...provided.dragHandleProps}
             >
                 <div className="task-card-header" draggable>
                     <h4 className="task-card-title">{title}</h4>
                     <div className="task-card-actions">
                         <button className="task-card-action edit" onClick={() => onEditTask(task)}>
                             ✎
                         </button>
                         <button className="task-card-action delete" onClick={() => onDeleteTask(task)}>
                             🗑
                         </button>
                     </div>
                 </div>
                 <div className="task-card-description">
                     {description}
                 </div>
                 <div className="task-card-footer">
                     <span className="task-card-id">ID: {id}</span>
                     <span className="task-card-timestamp">Updated: {new Date(updatedAt).toLocaleString()}</span>
                 </div>
             </div>
            )}
          </Draggable>
    );
};
