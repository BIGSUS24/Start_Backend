import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";

const userSchema = new Schema({

    username :{
        type:String,
        required:true,
        lowercase:true,
        unique:true,
        trim:true,
        index:true
    },
    email :{
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

userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    
    this.password = await bcrypt.hash(this.password, 10);
});


userSchema.methods.isPasswordcorrect = async function (password) {

    return await bcrypt.compare(password ,this.password) //true of false
    
}

userSchema.methods.generateAccessToken = function () {

   return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            fullname:this.fullname,
            username:this.username
        },

        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
    
}

userSchema.methods.generateRefreshToken = function () {

    return jwt.sign(
        {
            _id:this._id,
            
        },

        process.env.REQUEST_TOKEN_SECRET,
        {
            expiresIn:process.env.REQUEST_TOKEN_EXPIRY
        }
    )
    
}

export const User = mongoose.model("User",userSchema)