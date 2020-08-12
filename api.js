const express = require("express");
const { Pool } = require("pg");
const { validateLoginData, validateRegisterData } = require("./datavalidation");
const { bcryptPassword, generateError } = require("./utils");

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

 /**
  * Authenticate an existing user
  */
app.post("/api/auth/login", async (req, res) => {
  const { email, password } = req.body;

  //Time to validate the login data
  const { error } = validateLoginData({ email, password });

  //Let's check if there is an error
  if (error) res.status(400).json(generateError(error.details[0].message));

  //No error. Let's hash the password to search for the user
  const hashedPassword = bcryptPassword(password);

  //Query for the user
  const result = await pool.query(
    `SELECT * FROM users WHERE email=${email} AND password=${hashedPassword} LIMIT 1`
  );

  //Does the user exist?
  if (result.rowCount > 0) res.json(result.rows);
  else res.json(generateError("Incorrect login information."));
});

/**
 * Create a new user
 */
app.post("/api/auth/signup", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;
  const uid = 0;

  //time to validate the register data
  const { error } = validateRegisterData({
    username,
    email,
    password,
    repeatPassword,
  });

  //Is there and error? Let the user know it.
  if (error) res.status(400).json(generateError(error.details[0].message));

  //No error. let's hash the password before saving the new user.
  const hashedPassword = bcryptPassword(password);

  //Save the world! :'D
  const result = await pool.query(
    `INSERT INTO users (uid, username, email, password, registeredOn) VALUES($1, $2, $3, $4, NOW())`,
    [uid, username, email, hashedPassword]
  );
  //Is everything Ok?
  if (result) {
    res.json({
      success: "The account was created successfully",
      user: { uid, username, email },
    });
  }
});

app.listen(port, () => console.log(`Up and running on port ${port}...`));
