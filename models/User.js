const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["buyer", "seller"]
    },
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
    }],
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    }],
})

module.exports = mongoose.model("User", userSchema);