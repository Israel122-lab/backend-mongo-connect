const User = require('../models/user-model');

const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //Basic validation
        if(!name || !email || !password) {
            return res.status(400).json({message: 'All fields are required'});
        }

        // Check if the user already exists
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(400).json({message: 'User already exists'});
        }

        // Create a new user
        const newUser = await User.create({name, email, password});
        res.status(201).json({
            message: 'User created successfully',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });

      
    } catch (error) {
        res.status(500).json({message: 'Error creating user', error: error.message});
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // Find the user by email
        const user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        // compare passwords
        const isMatch = await user.comparePassword(password);
        if(!isMatch) {
            return res.status(400).json({message: 'Invalid credentials'});
        }

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.name, email: user.email }
        });
    } catch (error) {
        res.status(500).json({message: 'Error logging in', error: error.message});
    }
}

const logoutUser = async (req, res) => {
   try {
    const{email} = req.body;

    // Find the user by email
    const user = await User.findOne({email});
    if(!user) {
        return res.status(400).json({message: 'Invalid credentials'});
    }
    res.status(200).json({
        message: 'Logout successful',
        user: { id: user._id, name: user.name, email: user.email }
    });
   } catch (error) {
    res.status(500).json({message: 'Error logging out', error: error.message});
   }
}

module.exports = { createUser, loginUser, logoutUser }