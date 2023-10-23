const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("Item", itemSchema);