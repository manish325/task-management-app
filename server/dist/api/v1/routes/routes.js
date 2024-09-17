"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const auth_route_1 = require("./auth.route");
exports.routes = [
    {
        route: '/auth',
        router: auth_route_1.authRouter
    }
];
