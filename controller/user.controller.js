const model = require('../model/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//register
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

//login
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
            userid:user.id,
            user:user.username,
            email:user.email,
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

//change password

// const changepassword = async (req,res)=> {
//     try {
//         const userid = req.userinfo.userid
//         console.log(userid)
//         const{oldPassword , newPassword} = req.body

//         const user = await model.findById(userid)

//         if(!user){
//             return res.status(404).json({
//                 success:false,
//                 message:"User not found"
//             })
//         }

//         const isMatch =await bcrypt.compare(oldPassword,user.password)
//         if(!isMatch){
//             return res.status(400).json({
//                 success:false,
//                 message:"old password is in correct"
//             })
//         }

//         // hashpassword
//         const salt = await bcrypt.genSalt(10)
//         user.password= await bcrypt.hash(newPassword,salt)
//         await user.save()

//         res.status(200).json({
//             success:true,
//             message:"password change sucessfully"
//         })


//     } catch (error) {
//         console.log(error)
//         res.status(400).json({
//             message:"Error you can't change the  password"
//         })
//     }
// }

module.exports = {
    register,
    Login,
    // changepassword
}
