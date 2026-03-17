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

module.exports = createUser