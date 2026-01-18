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
    const response = await cloudinary.uploader.upload(
      localFilePath,
      { resource_type: "auto" }
    );

    // check the upload in console
    console.log("file uploaded on cloud", response.url);

    // delete local file safely
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return response;

  } catch (error) {

    // remove the local saved file from the system (only if exists)
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }

    return null;
  }
};

export { uploadOnCloudinary };
