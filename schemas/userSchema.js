const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userid VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      nama VARCHAR(255),
      alamat VARCHAR(255),
      tanggal_lahir DATE,
      no_hp VARCHAR,
      bank VARCHAR,
      no_rekening VARCHAR,
      PRIMARY KEY(userid)
  )
`

module.exports = userSchema