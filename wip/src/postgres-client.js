const pg = require('pg')

module.exports = function createDatabase({ connectionString }) {
    const client = new pg.Client({ connectionString })
    let connectedClient = null
    async function connect () {
        if (!connectedClient) {
            await client.connect()
            await client.query('SET search_path = message_store, public')
            connectedClient = client
        }
        return connectedClient
    }
    return {
        query: async (sql, values = []) => {
            const client = await connect()
            return client.query(sql, values)
        },
        stop: () => client.end()
    }
}
