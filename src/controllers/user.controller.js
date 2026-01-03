import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/apiErrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponce.js"

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
 //db query meaning it will check in the db using mongoose model

 const existedUser = User.findOne(
    {
        $or:[{username},{email}]//returns true of false
    }
 )
    if (existedUser) {
        
        throw new ApiErrors(409,"Existing username or Email")
  
    }
//check for image and avatar upload
    const AvatarLocalPath = req.files?.avatar[0].Path;
    const coverImageLocalPath = req.files?.coverImage[0].Path;

     if (!AvatarLocalPath) {
        
        throw new ApiErrors(400,"Avatar is Required")
  
    }
    //upload to cloudinary
    const Avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImageLocal = await uploadOnCloudinary(coverImageLocalPath)

     if (!Avatar) {
        
        throw new ApiErrors(40,"Avatar is Required")
  
    }

    //create user object in db
   const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        avatar : avatar.url,
        coverImage : coverImageLocal?.url ||"",
        password
    }
    

)

//check for user creation success
const CreatedUser = await User.findById(user._id).select("-password -refreshToken") 
 if (!CreatedUser) {

    throw new ApiErrors(500,"User creation failed Server error") 
    
 }


//return result 

res.status(201).json(

    new ApiResponse(201,CreatedUser,"User Registered Successfully")
)


})

export {registerUser}