const express = require("express");
const { check } = require("express-validator");

const listAllPosts = require("../controllers/post-controllers/list-all-posts");
const create = require("../controllers/post-controllers/create");
const upvote = require("../controllers/post-controllers/upvote");
const downvote = require("../controllers/post-controllers/downvote");
const edit = require("../controllers/post-controllers/edit");
const deletePost = require("../controllers/post-controllers/delete");
const checkAuthorization = require("../modules/check-authorization");

// Initializing the router object
const router = express.Router();

// List all Posts
router.get("/", listAllPosts);

// Create a Post. Privileged, requires authentication
router.post("/create", checkAuthorization, [check("content").not().isEmpty().trim()], create);

// Upvote a Post
router.patch("/upvote", upvote);

// Downvote a Post
router.patch("/downvote", downvote);

// Update Post content
router.patch("/edit", checkAuthorization, [check("content").not().isEmpty().trim()], edit);

// Delete a Post
router.delete("/delete", checkAuthorization, deletePost);

// More to be added

module.exports = router;
