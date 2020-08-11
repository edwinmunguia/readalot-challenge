const express = require("express");
const { Pool } = require("pg");
const app = express();
const port = 9090;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "readalot",
  password: "munguia",
  port: "2222",
});

// "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",

const generateError = (message) => ({
  error: message,
});

app.use(express.json());

/**
 * Post
 */
app.get("/api/posts", async (req, res) => {
  const result = await pool.query("SELECT * FROM posts ORDER BY id DESC");
  res.json(result.rows);
});

app.get("/api/posts/:id", async (req, res) => {
  const id = req.params.id;
  const result = await pool.query(`SELECT * FROM posts WHERE id=${id} LIMIT 1`);
  if (result.rowCount > 0) res.json(result.rows);
  else res.json(generateError("This post doesn't exist."));
});

/**
 * Authentication
 */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query(
    `SELECT * FROM users WHERE email=${email} AND password=${password} LIMIT 1`
  );
  if (result.rowCount > 0) res.json(result.rows);
  else res.json(generateError("Incorrect login information."));
});

app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;
  const uid = 0;
  const result = await pool.query(
    `INSERT INTO users (uid, username, email, password, registeredOn) VALUES($1, $2, $3, $4, NOW())`,
    [uid, username, email, password]
  );
  if (result) {
    res.json({
      success: "The account was created successfully",
      user: { uid, username, email },
    });
  }
});

app.listen(port, () => console.log(`Up and running on port ${port}...`));
