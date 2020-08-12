const { Pool } = require("pg");

// {
//     host: "localhost",
//     user: "postgres",
//     database: "readalot",
//     password: "munguia",
//     port: "2222",
//   }
const pool = new Pool({
  host: process.env.PG_HOST,
  user: process.env.PG_USER,
  database: process.env.PG_DB,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

module.exports = pool;
