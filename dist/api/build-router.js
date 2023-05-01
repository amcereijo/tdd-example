"use strict";
const { Router } = require('express');
function buildRouter(routes) {
    return routes.reduce((appRouter, route) => {
        const { method, path, handler, } = route;
        console.log(`[server] Route ${method.toUpperCase()} ${path}`);
        return appRouter[method](path, handler);
    }, new Router());
}
module.exports = buildRouter;
