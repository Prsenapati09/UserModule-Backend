const cloudinary = require('../config/cloudinary')

const cloudinaryToCloudinary = async (filepath)=>{
    try {
        const result = await cloudinary.uploader.upload(filepath)
        
        return {
            url:result.secure_url,
            publicId:result.public_id
        }
    } catch (error) {
        console.error("Error while uploadign to cloudinary",error)
    }
}

module.exports = {
    cloudinaryToCloudinary
}