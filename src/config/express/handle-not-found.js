function handleNotFound(app) {
  // Route not found (404)
  app.use((req, res) => {
    res.status(404).send({
      message: `Route ${req.url} Not found.`,
    });
  });
}

module.exports = handleNotFound;
