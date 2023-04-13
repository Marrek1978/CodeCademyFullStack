const { Pool } = require('pg')
const {DB } = require('../config');
 
const pool = new Pool({
  user:DB.PGUSER,
  host:DB.PGHOST,
  database: DB.PGDATABASE,
  password: DB.PGPASSWORD,
  port:DB.PGPORT
})
 
module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}
