const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    itemsId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    }],
});

module.exports = mongoose.model("Order", orderSchema);