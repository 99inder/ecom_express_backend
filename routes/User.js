const express = require("express");
const router = express.Router();

// importing controller functions
const {
    login,
    signup,
} = require("../controllers/Auth");

// Route for user login
router.post("/login", login);

// Route for user signup
router.post("/register", signup)

// Export the router for use in the main application
module.exports = router