const jwt = require('jsonwebtoken')

const auth = (req,res,next)=>{
    const token = req.headers["authorization"]

    const validation = token.split(" ")[1]
    if(!validation){
        res.status(400).json({
            succes:false,
            message:"Unauthorized Access"
        })
    }

    const userinfo = jwt.verify(validation,process.env.JWT_SECRET)

    req.userinfo = userinfo
    // console.log(userinfo)
    next()

}

module.exports = auth