import { v2 as cloudinary } from 'cloudinary';
import { config } from 'dotenv';
import streamifier from 'streamifier';
import sharp from 'sharp'
config();
           
cloudinary.config({ 
  cloud_name: 'did820sqi', 
  api_key: '562645561664731', 
  api_secret: 'zRQoOzGVwdwPo2LZn3nif3o7M1c' 
});
export const uploadToCloudinary = async (req, _res, next) => {
  try {
    const cld_upload_stream = cloudinary.uploader.upload_stream({
      folder: "profile-pics"
    }, async (error, result) => {
      if (error) {
        console.error("Error during upload:", error);
        return next(error); // Pass the error to the next middleware
      }
      req.body.picturePath = result.url; // Store the URL in request.picturePath
      next();
    });

    const compressedImage = await sharp(req.file.buffer)
    .resize({ width: 100, height: 100 }) // Resize the image
    .jpeg({ quality: 75 }) // Set JPEG quality
    .toBuffer(); // Convert the image to buffer
    

    streamifier.createReadStream(compressedImage).pipe(cld_upload_stream);
  } catch (error) {
    console.error("Error during upload:", error);
    return next(error); // Pass the error to the next middleware
  }
};
 