const {mongoose, Schema} = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({ 
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,    // for example if someone enters " John Doe " it will be stored as "john doe" in the database because of the lowercase and trim options
        minLength: 2,
        maxLength: 30  // maximum length of the name is 30 characters
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'], // this is a regular expression that checks if the email is in a valid format
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        maxLength: 100
    },

   },
   
    {
        timestamps: true
    }

);

// before saving any password we need to hash it 


const User = mongoose.model('User', userSchema);

module.exports = User;