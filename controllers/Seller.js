const User = require("../models/User");
const Item = require("../models/Item");

exports.createCatalog = async (req, res) => {
    try {

        const { id } = req.user;
        const { items } = req.body;

        // ######### Perform Validations #########
        const seller = await User.findById(id);

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Seller not found",
            })
        }

        if (!items || !Array.isArray(items) || !items.length) {
            return res.status(400).json({
                success: false,
                message: "Please provide array of items in request body"
            })
        }
        // ######### Validations Ends #########

        // appending each item with the seller id
        const itemsWithSellerId = items.map(item => { return { ...item, userId: id } });

        // creating items entry in database
        const itemsCreated = await Item.create(itemsWithSellerId);

        // pushing _id of each created item in sellers' Items
        itemsCreated.forEach(async (item) => seller.items.push(item._id));

        // saving data in User(Seller) model
        await seller.save();

        // returning response
        return res.status(200).json({
            success: true,
            message: "Catalog Created Successfully",
        })
    } catch (error) {
        console.log("Error Occured While creating catalog");
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Error Occured While creating catalog",
        })
    }
}

exports.orders = async (req, res) => {
    try {

        const { id } = req.user;
        const { items } = req.body;

        // ######### Perform Validations #########
        const seller = await User.findById(id);

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Seller not found",
            })
        }

        if (!items || !Array.isArray(items) || !items.length) {
            return res.status(400).json({
                success: false,
                message: "Please provide array of items in request body"
            })
        }
        // ######### Validations Ends #########
        

        // returning response
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
        })
    } catch (error) {
        console.log("Error occured while fetching orders");
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Error occured while fetching orders",
        })
    }
}