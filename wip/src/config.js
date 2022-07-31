const createKnexClient = require('./knex-client')
const createHomeApp = require('./app/home')
const createRecordViewingsApp = require('./app/record-viewings')
const createMessageStore = require('./message-store')
const createPostgresClient = require('./postgres-client')

module.exports = function createConfig({ env }) {
    console.log('ENV ', env)
    const db = createKnexClient({
        connectionString: env.databaseUrl
    })
    const postgresClient = createPostgresClient({
        connectionString: env.messageStoreConnectionString
    })
    const messageStore = createMessageStore({ db: postgresClient })
    const homeApp = createHomeApp({ db })
    const recordViewingsApp = createRecordViewingsApp({ messageStore })
    return {
        env,
        db,
        homeApp,
        recordViewingsApp,
        messageStore
    }
}