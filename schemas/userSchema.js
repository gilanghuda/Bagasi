const userSchema = `
  CREATE TABLE IF NOT EXISTS users (
      userid VARCHAR(255) UNIQUE NOT NULL,
      email VARCHAR(255) NOT NULL,
      password VARCHAR(255) NOT NULL,
      PRIMARY KEY(userid)
  )
`

module.exports = userSchema