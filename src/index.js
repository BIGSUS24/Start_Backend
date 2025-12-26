import dotenv from "dotenv"
import connectDB from "./db/index.js";
import { app } from "./app.js";


dotenv.config({
    path: "./.env"
});

connectDB()
    .then(()=>{

    app.listen(process.env.PORT,()=>{
        console.log("server is running on Port");

    app.on("error",(error)=>{

            console.log("error",error)
            throw error;

        })
    
}) 
}) 
.catch((err)=>{
    console.log(err,"Error While Connection");
    
})



/*(async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);
        app.on("error",(error)=>{

            console.log("error",error)
            throw error;

        })

        app.listen(process.env.PORT,()=>{
            console.log(`App is listening${process.env.PORT}`)
        })
        
    } catch (error) {
        console.error("Error connecting to the database", error);
        throw error;
        
    }
})()*   // IIFE - Immediately Invoked Function Expression
*/;