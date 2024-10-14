const Pool = require('pg').Pool
const pool = new Pool({
  user: "postgres", //parselian
  password: "", //MSKOkh8MjCTQgaJDFYPo
  host: "localhost",
  port: 5432,
  database: "online_queue"
})

module.exports = pool