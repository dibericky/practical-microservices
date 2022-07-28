const createKnexClient = require('./knex-client')
const createHomeApp = require('./app/home')
const createRecordViewingsApp = require('./app/record-viewings')

module.exports = function createConfig({ env }) {
    console.log('ENV ', env)
    const db = createKnexClient({
        connectionString: env.databaseUrl
    })
    const homeApp = createHomeApp({ db })
    const recordViewingsApp = createRecordViewingsApp({ db })
    return {
        env,
        db,
        homeApp,
        recordViewingsApp
    }
}