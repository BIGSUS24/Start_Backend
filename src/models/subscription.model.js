import mongoose  from "mongoose";
const subscriptionSchema = new mongoose.Schema({

    subscriber:{
        type:Schema.Types.ObjectId, // one who subbed
        ref : "User"
    },
    channel :{
        type :Schema.Types.ObjectId, // one who got subbed
        ref :"User"

    }

},{timestamps:true});

export const Subscription = mongoose.model("Subscription", subscriptionSchema);
