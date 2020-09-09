const { MongoClient } = require('mongodb')

const {
  DB_USER,
  DB_PASSWD,
  DB_HOST,
  DB_PORT,
  DB_NAME
} = process.env

const mongoUrl = `mongodb://${DB_USER}:${DB_PASSWD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?ssl=true&authsource=admin&retryWrite=true`
let connection
async function connectDB () {
  if (connection) {
    return connection
  }

  let client

  try {
    client = await MongoClient.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    connection = client.db(DB_NAME)
    console.log('[DB] Connected.')
  } catch (error) {
    console.error('[DB] Connection error.', error)
    process.exit(1)
  }
  return connection
}

module.exports = connectDB