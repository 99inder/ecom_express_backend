const router = require("express").Router();

// importing middlewares for Authorization
const { auth, isBuyer } = require("../middlewares/auth");

// importing controller functions
const {
    listOfSellers,
    sellerCatalog,
    createOrder,
} = require("../controllers/Buyer");

// ########## creating protected API Routes ##########
router.get("/list-of-sellers", auth, isBuyer, listOfSellers);
router.get("/seller-catalog/:seller_id", auth, isBuyer, sellerCatalog);
router.post("/create-order/:seller_id", auth, isBuyer, createOrder);

module.exports = router;