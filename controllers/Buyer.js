const User = require("../models/User");
const Item = require("../models/Item");
const Order = require("../models/Order");
const mongoose = require("mongoose");

exports.listOfSellers = async (req, res) => {
    try {
        const sellers = await User.find({ type: "seller" }, { _id: 1, username: 1 });

        //return the response
        return res.status(200).json({
            success: true,
            message: "All seller fetched successfully.",
            data: sellers,
        })

    } catch (error) {
        console.log("Error Occured While fetching list-of-sellers");
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error Occured While fetching list-of-sellers"
        })
    }
}

exports.sellerCatalog = async (req, res) => {
    try {

        let { seller_id } = req.params;
        seller_id = seller_id.trim();

        // ########### VALIDATIONS AND DATA RETRIEVAL ###########
        if (!seller_id.length) {
            return res.status(404).json({
                success: false,
                message: "seller_id not provided."
            })
        }

        // Find seller in DB and populate its catalog
        const seller = await User.findOne({ _id: seller_id, type: "seller" }).populate("items").exec();

        // return if seller not found
        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Invalid seller_id"
            })
        }
        // ########### VALIDATIONS AND DATA RETRIEVAL ENDS ###########

        // return the seller catalog
        return res.status(200).json({
            success: true,
            message: "Seller Catalog Fetched Successfully",
            catalog: seller.items,
        })

    } catch (error) {
        console.log("Error Occured While fetching seller catalog");
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Error Occured While fetching seller catalog",
        })
    }
}

exports.createOrder = async (req, res) => {
    try {
        const { id } = req.user;

        const { items } = req.body;

        let { seller_id } = req.params;
        seller_id = seller_id.trim();

        // ######### Perform Validations #########

        if (!items || !Array.isArray(items) || !items.length) {
            return res.status(400).json({
                success: false,
                message: "Please provide array of items in request body"
            })
        }

        if (!seller_id.length) {
            return res.status(404).json({
                success: false,
                message: "seller_id not provided."
            })
        }

        const seller = await User.findOne({ _id: seller_id, type: "seller" });

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Seller not found",
            })
        }

        // check to make sure that all the items exists & belong to a single seller only
        let response = await itemsAndSellerCheck(req, res);
        if (response) {
            return res.status(404).json(response);
        }

        // ######### Validations Ends #########

        //create order
        const orderCreated = await Order.create({
            buyerId: id,
            itemsId: items,
        })

        // push the order id to both the buyer's and seller's orders field
        seller.orders.push(orderCreated._id);
        seller.save();

        await User.findByIdAndUpdate(id, { $push: { orders: orderCreated._id } });

        return res.status(200).json({
            success: true,
            message: "Order Created Successfully",
            data: {
                orderId: orderCreated._id
            }
        })

    } catch (error) {
        console.log("Error Occured While creating order");
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Error Occured While creating order",
        })
    }
}

const itemsAndSellerCheck = async (req) => {

    const { items } = req.body;
    const { seller_id } = req.params;

    let itemNotFound = false;
    let notSingleSeller = false;

    for (const item of items) {
        const fetchedItem = await Item.findById(item);

        if (!fetchedItem) {
            itemNotFound = true;
            break;
        } else if (!fetchedItem && fetchedItem.sellerId.toString() !== seller_id) {
            notSingleSeller = true;
            break;
        }
    }

    if (itemNotFound) {
        return {
            success: false,
            message: "One or multiple items not found",
        }
    }

    else if (notSingleSeller) {
        return {
            success: false,
            message: "Please select items from a single seller at once"
        }
    }
}