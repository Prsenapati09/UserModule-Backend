const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        unique:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    role:{
        type:String,
        require:true,
        enum:["user","admin"],
        default:"user"
    }
    },{ timestamps:true}
    )

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return ;

    this.password = await bcrypt.hash(this.password,10) 

})

userSchema.methods.checkpassword = async function (password) {
    
    // compare password the hashpassword and usersend password
    
    return await bcrypt.compare(password,this.password)
}

const user = mongoose.model("Userdata",userSchema)

module.exports = user
