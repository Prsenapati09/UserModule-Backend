
const adminprotect = (req,res,next)=>{
    const {username,password ,role} = req.userinfo
    
    if (req.userinfo.role !== "admin"){
        res.status(403).json({
            succes:false,
            message:"You can not acess this route"
        })
    }

    next()
}

module.exports = adminprotect