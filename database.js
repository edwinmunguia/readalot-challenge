const { Pool } = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "readalot",
  password: "munguia",
  port: "2222",
});

module.exports = pool;
