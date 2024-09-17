import { IRoute } from "../types/routes";
import { authRouter } from "./auth.route";
import { stageRouter } from "./stage.route";
import { taskRouter } from "./task.route";


export const routes : IRoute[] = [
    {
        route : '/auth',
        router : authRouter        
    },
    {
        route: '/task',
        router : taskRouter
    },
    {
        route : '/stage',
        router : stageRouter
    }
]