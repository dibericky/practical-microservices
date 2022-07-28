module.exports = function mountRoutes(app, config) {
    app.use('/', config.homeApp.router)
}