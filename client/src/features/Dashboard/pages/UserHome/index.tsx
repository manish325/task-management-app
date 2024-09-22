import { FC, useCallback, useContext, useEffect, useState } from "react"
import { DashboardContext } from "../../contexts/dashboard.context"
import { IDashboardContext, IDashboardState, ITask } from "../../types";
import { Header } from "../../components/Header";
import { SearchBar } from "../../components/SearchBar";
import { TaskDisplay } from "../../components/TaskDisplay";
import { Modal } from "../../../../components/Modal/modal";
import { TaskForm } from "../../components/TaskForm";
import "./UserHome.scss";
import { DeleteTaskModal } from "../../components/DeleteTaskModal";

const UserHome: FC = () => {
    const {
        state,
        getTaskList,
        getAllStages,
        onEditTask,
        onDeleteTask,
        taskToDelete,
        taskToEdit,
        setPinnedTaskNull
    } = useContext(DashboardContext) as IDashboardContext;
    const {
        taskList
    } = state as IDashboardState;
    const [toAddTask, setToAddTask] = useState<boolean>(false);


    useEffect(() => {
        getTaskList();
        getAllStages();
    }, []);

    useEffect(() => {
        console.group();
        console.log("Logging the state")
        console.log(state);
    }, [state]);

    const onModalClose = () => {
        setToAddTask(false);
        return setPinnedTaskNull();
    }

    const refresh = useCallback(async () => {
        onModalClose();
        await getTaskList();
    }, [getTaskList])

    return (
        <div className="user-dashboard">
            <Modal
                isModalOpen={toAddTask || (taskToEdit ? true : false) || (taskToDelete ? true : false)}
                onModalClose={onModalClose}
            >
                {
                    toAddTask || taskToEdit ?
                    <TaskForm needRefresh={refresh} task={taskToEdit} /> : taskToDelete ? 
                    <DeleteTaskModal onDelete={onDeleteTask} onCancel={setPinnedTaskNull}/> : null
                }
                
            </Modal>
            <Header />
            <SearchBar
                onAddTask={() => setToAddTask(true)}
            />
            <TaskDisplay tasks={taskList} />
        </div>
    )
}

export default UserHome;