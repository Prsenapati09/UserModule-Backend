const db = require('./db')
const express = require('express')
const app = express()
db
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("server ready to serve ")
})

// import routes
const user = require("./route/user.route")

// use routes
app.use("/user",user)

app.listen(3000,()=>{
    console.log("server start")
})