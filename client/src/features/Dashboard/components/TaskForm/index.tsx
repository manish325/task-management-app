import { FC, useCallback, useContext } from "react";
import { useForm } from "react-hook-form";
import { IDashboardContext, ITask, ITaskForm } from "../../types";
import { yupResolver } from '@hookform/resolvers/yup';
import { TaskSchema } from "../../schema";
import {
    Container,
    Grid,
    TextField,
    Typography,
    Button
} from "@mui/material"
import { DashboardContext } from "../../contexts/dashboard.context";

export interface ITaskFormProps {
    task? : ITask;
    needRefresh : () => void
}

export const TaskForm : FC<ITaskFormProps> = ({task, needRefresh}) => {
    const {title, description} = task || {};
    const {
        register,
        handleSubmit,
        formState : {errors}
    } = useForm<ITaskForm>({
        defaultValues : {
            title,
            description
        },
        resolver : yupResolver(TaskSchema)
    });

    const {
        createTask,
        updateTask
    } = useContext(DashboardContext) as IDashboardContext;

    const submitTask = useCallback(async (taskToSubmit : ITaskForm) => {
        if(task)
           await  updateTask({...task, ...taskToSubmit});
        else {
            await createTask(taskToSubmit);
        }
        await needRefresh();
    }, 
    [
        createTask,
        updateTask
    ]
)

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h1" gutterBottom>
                Create a New Task
            </Typography>
            <form onSubmit={handleSubmit(submitTask)}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Title"
                            variant="outlined"
                            required
                            {...register("title", {
                                required : "Title is required"
                            })}
                        />
                        <span className="error">
                            {errors.title && errors.title.message}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Description"
                            variant="outlined"
                            multiline
                            rows={4}
                            required
                            {
                                ...register("description", {
                                    required : "Description is required"
                                })
                            }
                        />
                        <span className="error">
                            {errors.description && errors.description.message}
                        </span>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}