import mongoose,{Schema} from "mongoose";

const userSchema = new Schema({

    username :{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    username :{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
    },
     fullname :{
        type:String,
        required:true,
        trim:true,
        index:true
    },
       avatar :{
        type:String, //cloud url
        required:true,
    
    },
    coverImage:{

        type:String, //cloud url
       

    },
    watchHistory:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Video"
        }
],
    password :{

        type : String,
        required:[true,"Pass is required"]
        
    },
    refreshToken:{

        type : String,

        
    }

},
{
    timestamps:true
})

export const user = mongoose.model("User",userSchema)