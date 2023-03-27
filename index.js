const express = require("express");
const { connection } = require("./config/db");
const { userRouter } = require("./Router/user.router");
const { weatheRouter } = require("./Router/weather.router");
const app = express();
require("dotenv").config();

app.use(express.json());
app.use("/users",userRouter)
app.use("/weather",weatheRouter)

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Connected to Server")
    } catch (error) {
        console.log("Error while making connection",error)
    }
    console.log("Connected to the server")
})