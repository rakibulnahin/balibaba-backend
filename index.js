const express = require("express")
const cors = require('cors')
const mongoose = require("mongoose")
require('dotenv').config()

const usersRoute = require("./users")
const productRoute = require('./product')

const app = express()
app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use("/api/users", usersRoute)
app.use("/api/products", productRoute)

const MongoDB_connect = process.env.MongoDB+"" || "mongodb://127.0.0.1:27017"
console.log(MongoDB_connect);

const ConnectDB = async ()=>{
    try {
        mongoose.connect(
            "mongodb://127.0.0.1:27017"+'/Shop',
            { useNewUrlParser: true, useUnifiedTopology: true }
        )
        console.log("Connected to database");
        
    } catch (error) {
        console.log("Not connected to database");
    }
    
}

app.get("/", (req, res)=>{
    res.send("This is from backend file")
})

app.listen(3001, ()=>{
    console.log("Status 200 server connected");
        ConnectDB()
})