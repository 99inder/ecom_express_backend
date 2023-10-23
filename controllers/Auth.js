const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");


//SignUp
exports.signup = async (req, res) => {
    try {
        const { username, password, type } = req.body;

        //all the required fields validation
        if (!(username || password || type)) {
            return res.status(400).json({
                success: false,
                message: "All the required fields must be filled."
            })
        }

        //check if User already exists
        const isUserPresent = await User.findOne({ username });

        if (isUserPresent) {
            return res.status(400).json({
                success: false,
                message: "This account is already registered. Try logging in instead."
            });
        }
        //          Validation done


        //hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //create User entry in DB
        await User.create({
            username,
            password: hashedPassword,
            type,
        });

        //return the response
        return res.status(200).json({
            success: true,
            message: "User registered successfully.",
        })


    }
    catch (error) {
        console.log("Error Occured While Signing Up");
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Failed to SignUp. Please try again."
        })
    }
}

//Login
exports.login = async (req, res) => {
    try {

        //get email and password from request body
        const { username, password } = req.body;

        //          VALIDATION
        //check email and password are present
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: "Login Failed. All required fields must be filled."
            })
        }

        //check if user exists
        const user = await User.findOne({ username }, {orders: 0, items: 0});
        
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User doesn't exist. Please Signup."
            })
        }

        //              VALIDATION Done
        //compare passwords
        //password matches, create cookie and return response
        if (await bcrypt.compare(password, user.password)) {
            const jwtPayload = {
                id: user._id,
                username: user.username,
                type: user.type,
            }
            const token = jwt.sign(jwtPayload, process.env.JWT_SECRET, {
                expiresIn: "2h"
            });

            user.token = token;
            user.password = undefined;

            return res.status(200).cookie("token", token, { expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) }).json({
                success: true,
                token: token,
                user: user,
                message: "Logged in successfully.",
            })
        }

        //Password doesn't match
        else {
            return res.status(400).json({
                success: false,
                message: "Invalid Password."
            })
        }

    }
    catch (error) {
        console.log("Error Occured While Logging In.");
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "Login Failed. Please try again."
        });
    }
}