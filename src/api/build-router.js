const { Router } = require('express');

/**
 * Build express routes
 * @function
 * @param {array} routes
 * @returns {Router} express app router with actual api versioned routes
 */
function buildRouter(routes) {
  return routes.reduce((appRouter, route) => {
    const {
      method,
      path,
      handler,
    } = route;

    console.log(`[server] Route ${method.toUpperCase()} ${path}`);

    return appRouter[method](path, handler);
  }, new Router());
}

module.exports = buildRouter;
