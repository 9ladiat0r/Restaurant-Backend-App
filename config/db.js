const mongoose = require('mongoose');
const colors = require('colors');
//function for mongodb database connect
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connected to Database ${mongoose.connection.host}`);
    } catch (error) {
        console.log("DB Error",error,colors.bgRed);
    }
}

module.exports = {connectDb}