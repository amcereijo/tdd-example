"use strict";
function handleNotFound(app) {
    app.use((req, res) => {
        res.status(404).send({
            message: `Route ${req.url} Not found.`,
        });
    });
}
module.exports = handleNotFound;
