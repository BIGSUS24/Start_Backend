import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/apiErrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

const registerUser = asyncHandler(async (req,res) => {

//get user data from frontend
//validate user data if empty
//check if user already exists
//check for image and avatar upload
//upload them to cloudinary
//create user in db
//remove password from response
//check for user creation success
//return result 

const {fullname,email,username,password}= req.body
console.log(email,password);
//validation
 if ([fullname,email,username,password].some((field)=>
field?.trim()==="")) {

    throw new ApiErrors(400,"all Feilds are required")
    
 }
 //check if user exists 

 const existedUser = User.findOne(
    {
        $or:[{username},{email}]//returns true of false
    }
 )
    if (existedUser) {
        
        throw new ApiErrors(409,"Existing username or Email")
  
    }

    const AvatarLocalPath = req.files?.avatar[0].Path;
    const coverImageLocalPath = req.files?.coverImage[0].Path;

     if (AvatarLocalPath) {
        
        throw new ApiErrors(40,"Avatar is Required")
  
    }
    const Avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImageLocal = await uploadOnCloudinary(coverImageLocalPath)
})

export {registerUser}