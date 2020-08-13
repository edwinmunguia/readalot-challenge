const Pool = require("pg").Pool;
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

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "readalot",
  password: "munguia",
  port: "2222",
});

module.exports = pool;
