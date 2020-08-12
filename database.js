const { Pool } = require("pg");
let connection = null;
if (process.env.NODE_ENV === "production") {
  connection = {
    connectionString: process.env.DATABASE_URL,
  };
} else {
  connection = {
    host: "localhost",
    user: "postgres",
    database: "readalot",
    password: "munguia",
    port: "2222",
  };
}

const pool = new Pool(connection);

module.exports = pool;
