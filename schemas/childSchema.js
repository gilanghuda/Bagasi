const childSchema = `CREATE TABLE IF NOT EXISTS anak(
    uuid VARCHAR PRIMARY KEY,
    parent_uuid VARCHAR,
    nama VARCHAR NOT NULL,
    tanggal_lahir DATE,
    FOREIGN KEY (parent_uuid) REFERENCES users(userid)
)`
module.exports = childSchema