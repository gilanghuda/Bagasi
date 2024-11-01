const { Pool } = require("pg")
const config = require("./config")

let pool
const connectDB = async () => {
  pool ||= new Pool({...config, max: 10 })

  try {
    const client = await pool.connect() 
    console.log("Connected to Bagasi database")
    client.release() // hanya di release  kalo client berhasil connect
  } catch (err) {
    console.error({ err }) 
  }
}

module.exports = connectDB

