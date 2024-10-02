const { Pool } = require('pg')
const config = require("../db/config")
const { response } = require("express")
const pool = new Pool(config)
const resp = require("../response")

const createTable = (schema) => {
  return new Promise((resolve, reject) => {
    pool.query(schema, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results)
      }
    })
  })
}

const checkRecordExists = (tableName, column, value) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ${tableName} WHERE ${column} = $1`

    pool.query(query, [value], (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results.rows.length ? results.rows[0] : null)
      }
    })
  })
}

const insertRecord = (tableName, record) => {
  return new Promise((resolve, reject) => {
    const columns = Object.keys(record).join(', ')
    const placeholders = Object.keys(record).map((_, index) => `$${index + 1}`).join(', ')
    const values = Object.values(record)

    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${placeholders}) RETURNING *`
    console.log(query)

    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results.rows[0])
      }
    })
  })
}

const displayRecord = (tablename, column, key, value, res, token) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT ${column} FROM ${tablename} WHERE ${key} = $1`

    pool.query(query, [value], (error, result) => {
      if (error) {
        reject(resp(401, error, "An error occurred", res))
      } else {
        resolve(resp(200, result.rows, token, res))
      }
    })
  })
}

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  displayRecord
}