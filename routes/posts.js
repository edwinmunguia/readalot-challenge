const Router = require("express-promise-router");
const pool = require("../database");
const utils = require("../utils");
const { validatePostData } = require("../datavalidation");
const verifyToken = require("../middlewares/verifytoken");

const router = new Router();

/**
 * Retrieve posts list
 */
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT p.id, p.title, p.slug, p.content, p.summary, p.image, " +
        "p.categories, p.published_on, u.id as author_id, u.username as author_username " +
        "FROM posts p LEFT JOIN users u ON p.author = u.id ORDER BY id DESC"
    );
    return res.json(result.rows);
  } catch (err) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Retrieve all posts from a user
 */
router.get("/user/:username", async (req, res) => {
  try {
    const { username } = req.params;
    //Validate the username
    if (username.length < 1)
      return res.json(utils.generateError("Invalid username."));

    //Query for the user
    const user = await pool.query(
      "SELECT id FROM users WHERE username=$1 LIMIT 1",
      [username]
    );

    //Does the user exist?
    if (user.rows.length < 1)
      return res.json(utils.generateError("This user doesn't exist."));

    const result = await pool.query(
      "SELECT p.id, p.title, p.slug, p.content, p.summary, p.image, " +
        "p.categories, p.published_on, u.id as author_id, u.username as author_username " +
        "FROM posts p LEFT JOIN users u ON p.author = u.id WHERE p.author=$1 ORDER BY id DESC",
      [user.rows[0].id]
    );
    return res.json(result.rows);
  } catch (e) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Retrieve a single post
 */
router.get("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);
    const result = await pool.query(
      "SELECT p.id, p.title, p.slug, p.content, p.summary, p.image, " +
        "p.categories, p.published_on, u.id as author_id, u.username as author_username " +
        "FROM posts p LEFT JOIN users u ON p.author = u.id WHERE p.id=$1 LIMIT 1",
      [id]
    );
    if (result.rows.length > 0) return res.json(result.rows[0]);
    else
      return res.json(
        utils.generateError("This post doesn't exist or has been removed.")
      );
  } catch (err) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Create a new post
 */
router.post("/", verifyToken, async (req, res, next) => {
  try {
    const { title, content, categories } = req.body;
    const author = req.user;

    //Validate post data
    const { error } = validatePostData({
      title,
      content,
    });

    //Is there and error? Let the user know it.
    if (error)
      res.status(400).json(utils.generateError(error.details[0].message));

    const slug = utils.generateSlug(title);
    const summary = utils.extractSummary(content, 240);
    const foundImage = content.match(/!\[.*?\]\((.*?)\)/);
    let image = "";
    if (foundImage) image = foundImage[1];

    const result = await pool.query(
      "INSERT INTO posts (title, slug, summary, content, image, author, categories, published_on) VALUES($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING id",
      [title, slug, summary, content, image, author.id, categories]
    );

    return res.json({
      id: result.rows[0].id,
      title,
      slug,
      summary,
      content,
      image,
      author: author.id,
      categories,
    });
  } catch (err) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Update a  post
 */
router.patch("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, categories } = req.body;
    const authorId = parseInt(req.user.id);

    if (id < 0) return res.json(utils.generateError("Invalid post ID."));

    //Validate post data
    const { error } = validatePostData({
      title,
      content,
    });

    //Is there and error? Let the user know it.
    if (error)
      return res
        .status(400)
        .json(utils.generateError(error.details[0].message));

    const slug = utils.generateSlug(title);
    const summary = utils.extractSummary(content, 240);
    const foundImage = content.match(/!\[.*?\]\((.*?)\)/);
    let image = "";
    if (foundImage) image = foundImage[1];

    const result = await pool.query(
      "UPDATE posts SET title=$1, slug=$2, summary=$3, content=$4, image=$5, author=$6, categories=$7 WHERE id=$8",
      [title, slug, summary, content, image, authorId, categories, id]
    );

    return res.json({
      id,
      slug,
      summary,
      content,
      image,
      categories,
      author: authorId,
    });
  } catch (err) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Delete a post
 */
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    if (id < 0) return res.json(utils.generateError("Invalid post ID."));

    //Verify if the current post exist
    const postExist = await pool.query(
      "SELECT id FROM posts WHERE id=$1 LIMIT 1",
      [id]
    );

    //Error. The post doesn't exist
    if (postExist.rows.length < 1)
      return res.json(
        utils.generateError(
          "This post doesn't exist or has already been removed."
        )
      );

    //Otherwise, let's remove comments
    const commentResult = await pool.query(
      "DELETE FROM comments WHERE post=$1",
      [id]
    );

    //let's remove the Post
    const postResult = await pool.query("DELETE FROM posts WHERE id=$1", [id]);

    return res.json({ success: "The post was successfully removed." });
  } catch (err) {
    console.log(err);
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

module.exports = router;
