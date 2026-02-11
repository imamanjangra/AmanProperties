import mongoose from "mongoose";

const DB_NAME = "AmanProperties"

const connectDB = async() => {
    try {
        const cnt = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        console.log(`MONGODB connected !! Host: ${cnt.connection.host} `)
    } catch (error) {
        console.log("Connection is FAILED :" , error);
        process.exit(1)
    }
}

export default connectDB