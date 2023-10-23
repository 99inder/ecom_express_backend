const router = require("express").Router();
const User = require("../models/User");

const {
    listOfSellers,
    sellerCatalog,
} = require("../controllers/Buyer");

router.get("/list-of-sellers", listOfSellers);
router.get("/seller-catalog/:seller_id", sellerCatalog);

module.exports = router;