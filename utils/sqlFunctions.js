const { Pool } = require('pg')
const config = require("../db/config")
const { response } = require("express")
const pool = new Pool(config)
const resp = require("../response")
const { resolve } = require('path')
const { rejects } = require('assert')
const {childSchema} = require('../schemas/childSchema')
const {unggahanSchema} = require('../schemas/unggahanSchema')
const { error, Console } = require('console')

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
    // contoh console.log hasil query
    // query = INSERT INTO users (userid, email, password, nama, alamat, tanggal_lahir) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    pool.query(query, values, (err, results) => {
      if (err) {
        reject(err)
      } else {
        resolve(results.rows[0])
      }
    })
  })
}

const displayRecord = (tablename, uuid, res) => {
  return new Promise((resolve, reject) => {  
    let id = "userid"
    if (tablename === 'unggahan') id = 'user_uuid'
    else if (tablename == 'anak') id = 'parent_uuid'
    const query = `SELECT * FROM ${tablename} WHERE ${id} = $1`
    pool.query(query, [uuid], (error, result) => {
      if (error) {
        reject(resp(401, error, "An error occurred", res))
      } else {
        resolve(resp(200, result.rows, "succes", res))
      }
    })
  })
}

const postUnggahan = async (user_uuid, keterangan, lng, lat, res) => {
  // await createTable(unggahanSchema)
  const existingColumn = await checkRecordExists('unggahan', 'user_uuid', user_uuid)
  return new Promise((resolve, reject)=>{
    let query = ''
    if (existingColumn){
     query = `UPDATE unggahan 
     SET keterangan ='${keterangan}',
     geom = ST_GeomFromText('POINT(${lng} ${lat})', 4326)
     WHERE user_uuid = '${user_uuid}'`
    }
    else {
      query = `INSERT INTO unggahan (user_uuid, keterangan, geom)
VALUES ('${user_uuid}', '${keterangan}', ST_GeomFromText('POINT(${lng} ${lat})', 4326));`
    }
    pool.query(query, (error, result)=>{
      if (error) {
        reject(resp(401, error, "An error occurred", res))
      } else {
        resolve(resp(200, result.rows, "berhasil posting", res))
      }
    })
  })
}

const findNearestUnggahan = (lng, lat, limit,res)=>{
  return new Promise((resolve, reject)=>{
    const query = `SELECT 
        nama, tanggal_lahir, keterangan, userid, alamat, no_hp,
        ST_Distance(
          geom::geography, 
          ST_GeogFromText('SRID=4326;POINT(${lng} ${lat})')
        ) AS distance_in_meters
      FROM unggahan, users
      WHERE users.userid = unggahan.user_uuid AND unggahan.is_active = 'true'
      ORDER BY distance_in_meters ASC
      LIMIT ${limit};`
      pool.query(query, (error, result) =>{
        if (error) {
          reject(resp(401, error, "An error occurred", res))
        } else {
          resolve(resp(200, result.rows, "Succes message", res))
        }
      })
  })
}

const userIsActive = async (user_uuid, active)=>{
  const existingColumn = await checkRecordExists('unggahan', 'user_uuid', user_uuid)
  let queryActive = "false"
  if (active==1) queryActive = "true"
  if (!existingColumn){
    const userStatus = {
      user_uuid,
      is_active: queryActive
    }
    await insertRecord('unggahan', userStatus)
    return
  }
  return new Promise((resolve, reject) => {
    const query =  `UPDATE unggahan
    SET is_active = $1
    WHERE user_uuid = $2;`
    pool.query(query,[queryActive, user_uuid], (error, result) =>{
      if (error) {

        reject(error)
      } else {
        resolve(result.rows)
      }
    })
  })
}

const updateUser = (user_uuid, nama, email, alamat, tanggalLahir, noWa, bank, noRek)=>{
  return new Promise((resolve, reject) => {
    const query = `
    UPDATE users 
    SET nama=$1, email = $2, alamat = $3, tanggal_lahir = $4, no_hp = $5, bank = $6, no_rekening = $7 
    WHERE userid = $8
    RETURNING *;
  `
  const values = [nama, email ,alamat, tanggalLahir, noWa, bank, noRek, user_uuid];
     pool.query(query, values, (error, result) =>{
      if (error) {
        reject(error)
      } else {
        resolve(result.rows)
      }
    })
  })
}

module.exports = {
  createTable,
  checkRecordExists,
  insertRecord,
  displayRecord,
  findNearestUnggahan,
  postUnggahan,
  userIsActive,
  updateUser,
}

module.exports.updateUserPict = async function (user_id, profile) {
    await pool.query("update users set profile = $1 where userid = $2", [profile, user_id])
} 

module.exports.pool = pool