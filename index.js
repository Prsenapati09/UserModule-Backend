const db = require('./config/db')
const express = require('express')
const app = express()
db
app.use(express.json())


app.get("/",(req,res)=>{
    res.send("server ready to serve ")
})

// import routes
const user = require("./route/user.route")
const image = require("./route/image.route")

// use routes
app.use("/user",user)
app.use("/upload",image)

app.listen(3000,()=>{
    console.log("server start")
})