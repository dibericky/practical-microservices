//require('./foo')().then(() => console.log('OK'))
const pg = require('pg')

async function connect () {
    const connectionString = process.env.MESSAGE_STORE_CONNECTION_STRING
    const client = new pg.Client(connectionString)
        console.log('CONNECT', connectionString)
        await client.connect()
        console.log('CONNECTED')
        const resp = await client.query('SET search_path = message_store, public')
        console.log('SET', resp.rows)
        connectedClient = client
    return connectedClient
}

connect().then(() => console.log('ok'))