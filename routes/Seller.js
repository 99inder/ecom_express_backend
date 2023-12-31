const router = require("express").Router();

// importing middlewares for Authorization
const { auth, isSeller } = require("../middlewares/auth");

// importing controller functions
const {
    createCatalog, orders,
} = require("../controllers/Seller");

// ########## creating protected API Routes ##########
router.post("/create-catalog", auth, isSeller, createCatalog);
router.get("/orders", auth, isSeller, orders);

module.exports = router;