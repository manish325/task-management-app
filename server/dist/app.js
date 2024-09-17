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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./api/v1/routes");
const dotenv_1 = require("dotenv");
const response_1 = require("./api/v1/interfaces/response");
const constants_1 = require("./config/constants");
const http_status_codes_1 = require("http-status-codes");
const DatabaseConfig_1 = require("./config/DatabaseConfig");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, dotenv_1.config)();
        yield (0, DatabaseConfig_1.connectDatabase)();
        console.log("Database Connected !!");
        (0, routes_1.registerRoutes)(app);
        app.use(cors_1.default);
        app.use((err, req, res, next) => {
            return res.send(new response_1.ResponseFailure(constants_1.Errors.SOMETHING_WENT_WRONG, http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR, []));
        });
        app.listen(3000, () => console.log("Server is up and running!"));
    }
    catch (e) {
        console.log(e);
    }
});
startServer();
