// file used to connect to mongo db 

const mongoose = require('mongoose')
const connectdb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL)
        console.log(`MongoDB connected : ${conn.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

module.exports = connectdb