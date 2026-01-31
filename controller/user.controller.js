const model = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const register = async (req,res)=>{
    try {
        
        const {username,email,password,role}= req.body

        const isMatch = await model.findOne({username,email})
        if(isMatch){
            res.status(400).json({
                succes:false,
                message:"User already exist try again "
            })
        }

        const createNewUser = await model.create(
            {   
                username,email,password,role
            })
        
        if(createNewUser){
            res.status(200).json({
                succes:true,
                message:"User Registration Sucessfully 🎉"
            })
        }
    } catch (error) {
        res.status(400).json({
            succes:false,
            message:"Error ",
            error:error
        })
    }

}

const Login = async (req,res)=>{
    try {
        
        const {username,password} = req.body

        const user = await model.findOne({username})
        if(!user){
            res.status(404).json({
                sucess:false,
                message:"username not found",
            })
        }

        const comaparepassword = await bcrypt.compare(password,user.password)

        if(!comaparepassword){
            res.status(404).json({
                sucess:true,
                message:"Password not found"
            })
        }

        const payload ={
            user:user.username,
            email:user.eamil,
            password:user.password,
            role:user.role,


        }

        //generate token

        const token = jwt.sign(payload,process.env.JWT_SECRET)

        res.status(200).json({
            sucess:true,
            message:"Login sucessfully",
            token:token
        })

    } catch (error) {
        res.status(400).json({
            succes:false,
            message:"Error ",
            error:error
        })
    }
}


module.exports = {register,Login}
