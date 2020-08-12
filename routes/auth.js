const router = require("express").Router();
const pool = require("../database");
const {
  validateLoginData,
  validateRegisterData,
} = require("../datavalidation");
const { hashPassword, generateError } = require("../utils");

/**
 * Authenticate an existing user
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  //Time to validate the login data
  const { error } = validateLoginData({ email, password });

  //Let's check if there is an error
  if (error) res.status(400).json(generateError(error.details[0].message));

  //No error. Let's hash the password to search for the user
  const hashedPassword = await hashPassword(password);

  //Query for the user
  const result = await pool.query(
    `SELECT * FROM users WHERE email=${email} AND password=${hashedPassword} LIMIT 1`
  );

  //Does the user exist?
  if (result.rowCount > 0) res.json(result.rows);
  else
    res.json(
      generateError("User doesn't exist or incorrect login information.")
    );
});

/**
 * Create a new user
 */
router.post("/signup", async (req, res) => {
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

  //Is there already an user with this username?
  const usernameCheck = await pool.query(
    "SELECT username FROM users WHERE username=$1",
    [username]
  );

  //If already Exist
  if (usernameCheck.rowCount > 0)
    res.status(400).json(generateError("This username is already taken."));

  //Is there already an user with this email?
  const emailCheck = await pool.query(
    "SELECT username FROM users WHERE username=$1",
    [email]
  );

  //If already exist
  if (emailCheck.rowCount > 0)
    res
      .status(400)
      .json(generateError("There is already an account with this email."));

  //No error. let's hash the password before saving the new user.
  const hashedPassword = await hashPassword(password);

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

module.exports = router;
