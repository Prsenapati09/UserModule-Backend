const mongoose = require('mongoose')
require('dotenv').config()

const url = process.env.MONGODB_URL
mongoose.connect(url)

const connection = mongoose.connection

connection.on("connected",()=>{
    console.log("Database connected")
})
connection.on("disconnected",()=>{
    console.log("Database connected")
})
connection.on("error",(err)=>{
    console.log(`error ${err}` )
})

module.exports = connection