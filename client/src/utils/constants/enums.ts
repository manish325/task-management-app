export enum ROUTES {
    AUTH = 'auth/*',
    LOGIN = `login`,
    REGISTER = `register`,
    DASHBOARD = '/dashboard/*',
    TASK = 'task/:taskId/',
    USER_DASHBOARD = "user",
    ADMIN_DASHBOARD = "admin",

}

export enum ERROR_MESSAGES {
    INCORRECT_EMAIL = "This is not an Email",
    REQUIRED = "This field is required!",
    SOMETHING_WENT_WRONG = "Something went wrong!",
    TRY_AGAIN = "Please try again!",
    LENGTH = "Length should be 10 digits!"
}

export enum API_ENDPOINTS {
    REGISTER = "/auth/register",
    LOGIN = "/auth/login",
    USER_DETAILS = "/auth/getUserDetails",
    LOGIN_WITH_GOOGLE = "/auth/login/google",
    CREATE_TASK = "/task/createTask",
    UPDATE_TASK = "/task/updateTask",
    GET_TASKS = "/task/getAllTasks",
    DELETE_TASK = "/task/deleteTask",
    UPDATE_TASK_STAGE="/task/updateTaskStage",
    GET_ALL_STAGES = "stage/allStages",
}