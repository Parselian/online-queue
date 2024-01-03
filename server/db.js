const Pool = require('pg').Pool
const pool = new Pool({
  user: "postgres",
  password: "postgres",
  host: "127.0.0.1",
  port: 5432,
  database: "online_queue"
})

module.exports = pool