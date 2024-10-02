const { Pool } = require("pg")
const config = require("./config")

const connectDB = async () => {
  const pool = new Pool(config)

  try {
    const client = await pool.connect() // Use async/await to connect
    console.log("Connected to PostgreSQL database")
    client.release() // Only release the client if the connection is successful
  } catch (err) {
    console.error({ err }) // Log the error
  }
}

module.exports = connectDB

