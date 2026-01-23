import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiErrors} from "../utils/apiErrors.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import ApiResponse from "../utils/ApiResponce.js"

const generateRefreshandAccessTokens = async (userId) => {
    try {

       
        const user = await User.findById(userId)
        const AccessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken
           await user.save({validateBeforeSave:false})
        return {AccessToken,refreshToken}
    } catch (error) {

        throw new ApiErrors(500,"something went wrong while generation of tokens")
        
    }
    
}

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
console.log(email,password,req.files,req.body);
//validation
 if ([fullname,email,username,password].some((field)=>
field?.trim()==="")) {

    throw new ApiErrors(400,"all Feilds are required")
    
 }
 //check if user exists 
 //db query meaning it will check in the db using mongoose model

 const existedUser = await  User.findOne(
    {
        $or:[{username},{email}]//returns true of false
    }
 )
    if (existedUser) {
        
        throw new ApiErrors(409,"Existing username or Email")
  
    }
//check for image and avatar upload
    const AvatarLocalPath = req.files?.avatar[0].path;
    const coverImageLocalPath = req.files?.coverImage[0].path;

     if (!AvatarLocalPath) {
        
        throw new ApiErrors(400,"Avatar is Required")
  
    }
    //upload to cloudinary
    const Avatar = await uploadOnCloudinary(AvatarLocalPath);
    const coverImageLocal = await uploadOnCloudinary(coverImageLocalPath);

     if (!Avatar) {
        
        throw new ApiErrors(40,"Avatar is Required")
  
    }

    //create user object in db
   const user = await User.create({
  fullname,
  email,
  username: username.toLowerCase(),
  avatar: Avatar.url,
  coverImage: coverImageLocal?.url || "",
  password
});

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

const loginUser  = asyncHandler (async (req,res) => {

    //request body se data
    //username ya email
    //find user 
    //password check
    //access and refresh tokens
    //send secure cookies
    //respocse api

    const {username,email,password}= req.body

    if (!username && !email) {

        throw new ApiErrors(400,"username or email required")
        
    }
    const user = await User.findOne({
        $or:[{username},{email}]

    })

     if (!user) {
     throw new ApiErrors(400,"user does not exsit")   
    }

    const passwordValid = user.isPasswordcorrect(password)

      if (!passwordValid) {
     throw new ApiErrors(401,"password is Wrong")   
    }



     //access and refresh tokens
    const{AccessToken,refreshToken} = await  generateRefreshandAccessTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options={
        httpOnly : true,
        secure :true
    }
    return res
    .status(200)
    .cookie("AccessToken",AccessToken,options)
    .cookie("refreshToken",refreshToken,options)
    .json(new ApiResponse(200,{

        user :loggedInUser,AccessToken,refreshToken

    },
"user Logged in"))

})

const logoutUser = asyncHandler(async (req,res) => {

  await  User.findByIdAndUpdate(req.user._id,{
        $set:{
            refreshToken:undefined
        }
       
    }, {
            new:true
        }
    )


    const options={
        httpOnly : true,
        secure :true
    }

    return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User Logged OUT"))
    
})



export {registerUser,
    loginUser,logoutUser
}