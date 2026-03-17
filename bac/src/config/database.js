const mongoose = require('mongoose')

const connectToDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`MongoDB connected on host ${connect.connection.host}`)
    } catch (error) {
        console.error('Error connecting to MongoDB:', error)
    }
}

module.exports = connectToDB;