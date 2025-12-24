import fs from "fs"

import { v2 as cloudinary } from 'cloudinary';
import { response } from "express";

// Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key:  process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });



const uploadOnCloudinary = async (localFilePath) => {

    try {

// if there is no path to the file
if (!localFilePath) {

    return null;
    
}
//upload the file in our pc to cloud
cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})

//check the upload in console
console.log("file uploaded on cloud", response.url);

        return response
        
    } catch (error) {

        fs.unlinkSync(localFilePath)

        //remove the local saved file from the system

        return null
        
    }
    
}

export {uploadOnCloudinary};