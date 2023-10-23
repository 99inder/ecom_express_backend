const router = require("express").Router();

const {
    createCatalog,
} = require("../controllers/Seller");

router.post("/create-catalog", createCatalog);

module.exports = router;