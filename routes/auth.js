const Router = require("express-promise-router");
const pool = require("../database");
const {
  validateLoginData,
  validateRegisterData,
} = require("../datavalidation");
const utils = require("../utils");

const router = new Router();

/**
 * Authenticate an existing user
 */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    //Time to validate the login data
    const { error } = validateLoginData({ email, password });

    //Let's check if there is an error
    if (error) return res.json(utils.generateError(error.details[0].message));

    //Query for the user
    const user = await pool.query(
      "SELECT * FROM users WHERE email=$1 LIMIT 1",
      [email]
    );

    //Does the user exist?
    if (user.rows.length < 1)
      return res.json(utils.generateError("Email or Password incorrect."));

    //Let's compare the passwords
    const validPassword = await utils.passwordsAreEqual(
      password,
      user.rows[0].password
    );

    //If passwords are not equal, let the user know
    if (!validPassword)
      return res.json(utils.generateError("Email or Password incorrect."));

    //Welcome back!
    const loggedInUser = {
      id: user.rows[0].id,
      username: user.rows[0].username,
      email: user.rows[0].email,
    };

    const token = utils.generateToken(loggedInUser, "acklenavenue");

    res.json({
      success: "Logged In",
      user: loggedInUser,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Create a new user
 */
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, repeatPassword } = req.body;

    //time to validate the register data
    const { error } = validateRegisterData({
      username,
      email,
      password,
      repeatPassword,
    });

    //Is there and error? Let the user know it.
    if (error)
      return res
        .json(utils.generateError(error.details[0].message));

    //Is there already an user with this username?
    const usernameCheck = await pool.query(
      "SELECT username FROM users WHERE username=$1",
      [username]
    );

    //If already Exist
    if (usernameCheck.rows.length > 0)
      return res.json(utils.generateError("This username is already taken."));

    //Is there already an user with this email?
    const emailCheck = await pool.query(
      "SELECT username FROM users WHERE email=$1",
      [email]
    );

    //If email already exist
    if (emailCheck.rows.length > 0)
      return res.json(
        utils.generateError("There is already an account with this email.")
      );

    //No error. let's hash the password before saving the new user.
    const hashedPassword = utils.hashPassword(password);

    //Save the world! :'D
    const result = await pool.query(
      "INSERT INTO users (username, email, password, registered_on) VALUES($1, $2, $3, NOW()) RETURNING id",
      [username, email, hashedPassword]
    );

    //Is everything Ok? Let's auth the user.
    const newUser = { id: result.rows[0].id, username, email };
    const token = utils.generateToken(newUser, "acklenavenue");
    res.json({
      success: "The account was created successfully",
      user: newUser,
      token,
    });
  } catch (err) {
    console.error(err);
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

module.exports = router;
