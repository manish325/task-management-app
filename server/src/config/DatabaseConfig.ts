import {
    DataSource,
    DataSourceOptions
} from "typeorm";
import { User } from "../api/v1/models/User.entity";
import { Labels } from "../api/v1/models/Label.entity";
import { Task } from "../api/v1/models/Task.entity";
import { Role } from "../api/v1/models/Role.entity";
import { Stage } from "../api/v1/models/Stage.entity";

export const getDataSourceOptions = () : DataSourceOptions => {
    return {
        database : process.env.DATABASE,
        type: 'mysql',
        username : process.env.DATABASE_USERNAME,
        password : process.env.DATABASE_PASSWORD,
        entities : [User, Labels, Task, Role, Stage],
        synchronize : true,
        host : process.env.DATABASE_HOST,
        port : Number(process.env.DATABASE_PORT)
    }
}

export let appDataSource !: DataSource;

export const connectDatabase = async () => {
    appDataSource = await new DataSource(getDataSourceOptions()).initialize();
    console.log("Database Connected");
}