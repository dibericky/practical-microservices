const colors = require('colors/safe')
const dotenv = require('dotenv')

const packageJson = require('../package.json')

const envResult = dotenv.config()

if (envResult.error) {
  // eslint-disable-next-line no-console
  console.error(
    `${colors.red('[ERROR] env failed to load:')} ${envResult.error}`
  )

  process.exit(1)
}

function requireFromEnv (key) {
  if (!process.env[key]) {
    // eslint-disable-next-line no-console
    console.error(`${colors.red('[APP ERROR] Missing env variable:')} ${key}`)

    return process.exit(1)
  }

  return process.env[key]
}

module.exports = {
    appName: requireFromEnv('APP_NAME'),
    env: requireFromEnv('NODE_ENV'),
    port: parseInt(requireFromEnv('PORT'), 10),
    version: packageJson.version,
    databaseUrl: requireFromEnv('DATABASE_URL'),
    messageStoreConnectionString: requireFromEnv('MESSAGE_STORE_CONNECTION_STRING')
}