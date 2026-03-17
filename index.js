const db = require('./config/db')
const express = require('express')
const app = express()
const limit = require('express-rate-limit')


db
app.use(express.json())

const limiter = limit({
    windowMs: 10 * 60 * 1000,
	limit: 50
})

app.get("/",(req,res)=>{
    res.send("server ready to serve ")
})

// import routes
const user = require("./route/user.route")
const image = require("./route/image.route")

// use routes
app.use("/user",user)
app.use("/upload",image)

app.use(limiter)
app.listen(3000,()=>{
    console.log("server start")
})