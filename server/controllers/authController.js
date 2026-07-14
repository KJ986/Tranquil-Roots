const User  = require("../models/User");
const bcrypt = require("bcryptjs");

//Register User
const registerUser = async (req, res) => {
    try { 
        //Get data from the request body
        const { firstName, lastName, email, password } = req.body;

        //Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                message: "Please fill in all required fields.", 
            });
        } 
        // Check if the email already exists 
        const existingUser = await User.findOne({ email });

        if (existingUser) { 
            return res.staus(400).json({
                message: "An account with this emaail already exists.",
            });
        }
        //Hash the password 
        const hashedPassword = await bcrypt.hash(password, 10);
         
        //Create a new user 
        const user = await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        //Send a succeess response 
        res.status(201).json({
            message: "User registered successfully!",
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error.",
        });
    }
};

module.exports =  {
    registerUser,
};

