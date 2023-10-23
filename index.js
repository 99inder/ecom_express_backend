const express = require("express");
require("dotenv").config();

// Connecting to Database
const database = require("./config/database");
database.connect();

// creating express server app
const app = express();

// applying middlewares
app.use(express.json());


// ##### ROUTES #####
const userRoutes = require("./routes/User");
app.use("/api/auth", userRoutes);

//default route
app.get("/", (req, res) => {
    return res.status(200).json({
        success: true,
        message: "Your server is up and running..."
    })
});


// Running the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log("Server started successfully at PORT:", PORT);
});