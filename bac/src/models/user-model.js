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
userSchema.pre("save", async function () {
    // this refers to the user document that is being saved i.e only hash the password if it has been modified (or is new)
    if (!this.isModified("password")) return;

    try {
        this.password = await bcrypt.hash(this.password, 10);
    } catch (err) {
        throw err; // This sends the error up to your controller
    }
});
// compare passwords 
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;