const User = require("../models/User");

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