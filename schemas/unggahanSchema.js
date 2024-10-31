const unggahanSchema = `CREATE TABLE IF NOT EXISTS unggahan(
	id SERIAL PRIMARY KEY,
	user_uuid VARCHAR,
	keterangan VARCHAR,
	geom GEOMETRY(point, 4326),
	is_active BOOLEAN
)`

module.exports = unggahanSchema