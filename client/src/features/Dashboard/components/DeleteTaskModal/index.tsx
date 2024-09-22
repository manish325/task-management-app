import { FC } from "react";
import "./DeleteTask.scss";
import { Container, Typography, Grid, Button } from "@mui/material";

export interface IDeleteTaskProps {
    onCancel : () => void;
    onDelete : () => void;
}

export const DeleteTaskModal : FC<IDeleteTaskProps> = ({onCancel, onDelete}) => {
    return (
        <Container maxWidth="sm">
        <Typography variant="h4" component="h1" gutterBottom textAlign={'center'}>
            Are you sure you want to delete this task?
        </Typography>
        <Grid container spacing={2} className="action-container">
            <Grid item xs={12}>
                <Button variant="contained" color="error" onClick={onDelete}>
                    Delete
                </Button>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={onCancel}>
                    Cancel
                </Button>
            </Grid>
        </Grid>
    </Container>
    )
}