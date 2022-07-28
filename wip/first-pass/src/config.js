const createKnexClient = require('./knex-client')
const createHomeApp = require('./app/home')

module.exports = function createConfig({ env }) {
    console.log('ENV ', env)
    const db = createKnexClient({
        connectionString: env.databaseUrl
    })
    const homeApp = createHomeApp({ db })
    return {
        env,
        db,
        homeApp
    }
}