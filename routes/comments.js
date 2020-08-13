const Router = require("express-promise-router");
const pool = require("../database");
const utils = require("../utils");
const { validateCommentData } = require("../datavalidation");
const verifyToken = require("../middlewares/verifytoken");

const router = new Router();
/**
 * Retrieve post's comments list
 */
router.get("/post/:id", async (req, res) => {
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
      return res
        .json(utils.generateError("The post doesn't exist."));

    //Otherwise, let's send comments list
    const result = await pool.query(
      "SELECT c.id, c.comment, c.published_on, u.id as author_id, " +
        "u.username as author_username FROM comments c " +
        "LEFT JOIN users u ON c.author = u.id WHERE c.post=$1 ORDER BY id DESC",
      [id]
    );
    return res.json(result.rows);
  } catch (err) {
    console.log(err);
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

/**
 * Add comment to post
 */
router.post("/", verifyToken, async (req, res) => {
  try {
    const { post, comment } = req.body;
    const author = req.user;

    if (post < 0) return res.json(utils.generateError("Invalid post ID."));

    //Let's validate the comment data
    const { error } = validateCommentData({ comment });

    //Let's check if there is an error
    if (error)
      return res
        .json(utils.generateError(error.details[0].message));

    //Let's verify the current post exist
    const postExist = await pool.query(
      "SELECT id FROM posts WHERE id=$1 LIMIT 1",
      [post]
    );

    //Error. The post doesn't exist
    if (postExist.rows.length < 1)
      return res.json(utils.generateError("The post doesn't exist."));

    //Otherwise, let's save the comment
    const result = await pool.query(
      "INSERT INTO comments (post, author, comment, published_on) VALUES($1, $2, $3, NOW()) RETURNING id, published_on",
      [post, author.id, comment]
    );

    return res.json({
      id: result.rows[0].id,
      comment,
      post: post,
      autor_id: author.id,
      author_username: author.username,
      published_on: result.rows[0].published_on,
    });
  } catch (err) {
    return res.json(utils.generateError("Something went wrong, try again."));
  }
});

module.exports = router;
