import {v2 as cloudinary } from "cloudinary"

const connectCloudinary = async () => {
    cloudinary.config({
        cloud_name: process.env. CLODINARY_NAME,
        api_key:process.env.CLODINARY_API_KEY,
        api_secret:process.env.CLODINARY_SECRET_KEY,
    })
}
export default connectCloudinary;