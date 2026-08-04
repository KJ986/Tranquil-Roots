const User  = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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


//Login User
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        //Validate required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required.",
            });
        }
        //Find the user by email
        const user = await User.findOne({
            email: email.toLowerCase(),
        });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }
        //Compare the entered password with the stored hash
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches){
            return res.status(401).json({
                message: "Invalid email or password.",
            });
        }
        //Create a JWT
        const token = jwt.sign(
     {
        userId: user._id,
        role: user.role,
     }, 
     process.env.JWT_Secret,
     {
        expiresIn: "1d",
     }     
        );
        
        res.status(200).json({
            message: "Login successful!",
            token,
            user: {
                id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Server error.",
        });
    }
};

const getProfile = async (req, res) => {
    res.status(200).json({
        message: "Protected profile route accessed successfully.",
        user: req.user,
    });
};

module.exports =  {
    registerUser,
    loginUser,
    getProfile,
};

