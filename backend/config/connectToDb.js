const  mongoose = require("mongoose");

// mongoose
module.exports= async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected To MongoDB")
    } catch (error) {
        console.log(error)
    }
}