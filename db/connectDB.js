const { Pool } = require("pg")
const config = require("./config")

const connectDB = async () => {
  const pool = new Pool(config)

  try {
    const client = await pool.connect() 
    console.log("Connected to Bagasi database")
    client.release() // hanya di release kalo client berhasil connect
  } catch (err) {
    console.error({ err }) 
  }
}

module.exports = connectDB

