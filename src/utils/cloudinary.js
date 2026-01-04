import fs from "fs";

import { v2 as cloudinary } from "cloudinary";
// ❌ REMOVED: import { response } from "express";
// ✅ REPLACED WITH: response comes from cloudinary upload result, not express

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
});

const uploadOnCloudinary = async (localFilePath) => {
  try {

    // if there is no path to the file
    if (!localFilePath) {
      return null;
    }

    // upload the file in our pc to cloud
    // ❌ WAS:
    // await cloudinary.uploader.upload(localFilePath,{resource_type:"auto"})
    //
    // ✅ CHANGED TO (we STORE the result):
    const response = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto" }
    );

    // check the upload in console
    // ❌ WAS: response was undefined
    // ✅ NOW: response is the upload result from cloudinary
    console.log("file uploaded on cloud", response.url);

    // ❌ WAS: returning undefined response
    // ✅ NOW: returning actual cloudinary response
    return response;

  } catch (error) {

    // remove the local saved file from the system
    fs.unlinkSync(localFilePath);

    return null;
  }
};

export { uploadOnCloudinary };
