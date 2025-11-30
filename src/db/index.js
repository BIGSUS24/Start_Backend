import mongoose from "mongoose";
import { DB_NAME } from "../constants";

const connectDB = async () => {

    try {

       const connectionInstance =    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)

        console.log(`\n Mongo Connected Less GOOO info--${await connectionInstance.connection.host}`)

        
    } catch (error) {

        console.log("error",error)
        process.exit(1)
        
    }
    
}