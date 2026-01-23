import { ApiErrors } from "../utils/apiErrors.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import JWT from "jsonwebtoken"
import { User } from "../models/user.model.js";



export const verifyJWT = asyncHandler(async (req, res, next) => {

try {
       const token = req.cookies?.AccessToken || req.header("Authorization")?.replace("Bearer ", "")
    
       if (!token) {
            throw new ApiErrors(401,"UnAuthorized Access")    
       }
    
        const decodedToken = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
       const user = await User.findById(decodedToken._id).select("-password -refreshToken")
    
       if (!user) {
    
        throw new ApiErrors(402,"Invalid access token")
        
       }
       req.user=user;
       next()
} catch (error) {

    throw new ApiErrors(401,error?.message||"Invalid Access Token")
    
}


    
})