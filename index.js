// IMPORTS
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

// Connecting to Database
const database = require("./config/database");
database.connect();

// creating express server app
const app = express();

// applying middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true
    })
);


// ##### IMPOPRTING & INTEGRATING ROUTES #####
const userRoutes = require("./routes/User");
app.use("/api/auth", userRoutes);

const buyerRoutes = require("./routes/Buyer");
app.use("/api/buyer", buyerRoutes);

const sellerRoutes = require("./routes/Seller");
app.use("/api/seller", sellerRoutes);

//default route
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Your server is up and running..."
    })
});
// ##### IMPOPRTING & INTEGRATING ROUTES ENDS #####

// Running the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server started successfully at PORT:", PORT);
});