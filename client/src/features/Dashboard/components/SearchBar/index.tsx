import { FC, useContext } from "react";
import { Grid, Button, TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import "./SearchBar.scss";
import { DashboardContext } from "../../contexts/dashboard.context";
import { IDashboardContext } from "../../types";

export interface ISearchBarProps {
  onAddTask: () => void;
  onSearchChange?: (value: string) => void;
  onSortChange?: (value: string) => void;
  sortBy?: string;
}

export const SearchBar: FC<ISearchBarProps> = ({ onAddTask }) => {

  const {
    getTaskList
  } = useContext(DashboardContext) as IDashboardContext;

  const onSearchChange = (searchText: string) => {
    console.log("Searched text appeared to be", searchText);
    getTaskList(searchText);
  }

  return (
    <Grid container spacing={2} className="search-bar">
      {/* First Row: Add Task Button */}
      <Grid item xs={12} container justifyContent="flex-end" flexDirection={'row-reverse'} className="add-task">

      </Grid>

      {/* Second Row: Search Task and Sort By */}
      <Grid item xs={12} container justifyContent="space-between" alignItems="center">
        {/* Search Task */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Search Task"
            variant="outlined"
            placeholder="Search By Task Id, Task Name, or Description, Stage Name"
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </Grid>

        {/* Sort By */}
        <Grid item xs={12} md={3}>
          <FormControl fullWidth variant="outlined">
            {/* <InputLabel>Sort By</InputLabel> */}
            {/* <Select
              //   value={sortBy}
              //   onChange={(e) => onSortChange(e.target.value)}
              label="Sort By"
            >
              <MenuItem value="date">Date</MenuItem>
              <MenuItem value="priority">Priority</MenuItem>
              <MenuItem value="status">Status</MenuItem>
            </Select> */}
            <Button variant="contained" color="primary"
              onClick={onAddTask}
            >
              Add Task
            </Button>
          </FormControl>
        </Grid>
      </Grid>
    </Grid>
  );
}