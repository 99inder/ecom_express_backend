const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DB_URL;

exports.connect = () => {
    mongoose.connect(DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connection to DB Successful.");
    }).catch((error) => {
        console.log("Error occured while connecting to Database.");
        console.log(error);
        process.exit(1);
    })
};