"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const routes_1 = require("./routes");
const registerRoutes = (app) => {
    routes_1.routes.forEach(route => {
        app.use(route.route, route.router);
    });
};
exports.registerRoutes = registerRoutes;
