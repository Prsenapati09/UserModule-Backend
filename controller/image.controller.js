const image  = require('../model/image.model')
const {cloudinaryToCloudinary} = require('../helper/cloudinary.helper')

const uploadImage = async (req,res)=>{

    try {
        // const file =req.body
        if(!req.file){
            res.status(400).json({
                sucess:false,
                message:"file is missing ! upload an image"
            })
        }

        const {url,publicId} = await cloudinaryToCloudinary(req.file.path)

        const newUploadImage = new image({
            url,
            publicId,
            uploadedBy: req.userinfo.userid
        })

        await newUploadImage.save()

        res.status(201).json({
            sucess:true,
            message:"Image uploaded sucessfully",
            image:newUploadImage
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            sucess:false,
            message:"Something went wrong please try again ! "
        })
    }
}

module.exports = {
    uploadImage
}