"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = exports.appDataSource = exports.getDataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const User_entity_1 = require("../api/v1/models/User.entity");
const Label_entity_1 = require("../api/v1/models/Label.entity");
const Task_entity_1 = require("../api/v1/models/Task.entity");
const Role_entity_1 = require("../api/v1/models/Role.entity");
const getDataSourceOptions = () => {
    return {
        database: process.env.DATABASE,
        type: 'mysql',
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        entities: [User_entity_1.User, Label_entity_1.Labels, Task_entity_1.Task, Role_entity_1.Role],
        synchronize: true,
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT)
    };
};
exports.getDataSourceOptions = getDataSourceOptions;
const connectDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    exports.appDataSource = yield new typeorm_1.DataSource((0, exports.getDataSourceOptions)()).initialize();
});
exports.connectDatabase = connectDatabase;
