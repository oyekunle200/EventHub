import { v2 as cloudinary } from "cloudinary";
import multerStorageCloudinary, { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import {config} from "dotenv"

config({path: "../.env"})

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Setup Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'EVENTHUB-UPLOADS', // Folder name in your Cloudinary dashboard
    allowed_formats: ['jpg', 'png', 'jpeg', 'pdf'], // Restrict file types
  },
});

export const uploadCloudinary = multer({ storage: storage });