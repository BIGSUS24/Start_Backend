import { ApiErrors } from "../utils/apiErrors";
import { asyncHandler } from "../utils/asyncHandler";
import JWT from "jsonwebtoken"
import { User } from "../models/user.model";



export const verifyJWT = asyncHandler(async (res,req,next) => {

try {
       const token = res.cookie?.AccessToken || req.header("Authorization")?.replace("Bearer ","")
    
       if (!token) {
            throw new ApiErrors(401,"UnAuthorized Access")    
       }
    
        const decodedToken=JWT.verify(token,process.env.REQUEST_TOKEN_SECRET)
    
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