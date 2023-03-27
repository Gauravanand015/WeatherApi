const express = require("express");
const { authenticate } = require("../Middleware/authenticate");
const { UserModel } = require("../model/user.model");
const { redis } = require("../Redis/redis");
const winston = require("winston");
const { PrefferdModel } = require("../model/prefferedCity");
const { syncIndexes } = require("mongoose");
const weatheRouter = express.Router();
require("dotenv").config();


let api_key = process.env.Key;

weatheRouter.get("/city", authenticate, async (req, res) => {
  const { cityName, userEmail } = req.body;
  const userDetails = await UserModel.find({ email: userEmail });
  try {
    if (userDetails.length > 0) {
      const data = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${api_key}`;
      let result = await fetch(data);
      let ans = await result.json();
      redis.set("London", ans);
      res.send("Getting weather Details");
    }
  } catch (error) {
    console.log(error);
    res.send("Something went wrong while getting city temp")
  }  
});

// weatheRouter.post("/prefferedCity",authenticate,async(req,res)=>{
//     const {prefferedCity,userEmail} = req.body
//     const userDetails = await PrefferdModel.findOne({ email: userEmail });
//     console.log(userDetails)
//     try {
//         if(userDetails ==  null){
//             const data = new PrefferdModel({
//                 prefferedCity,
//                 userEmail
//             })
//             await data.save()
//             res.send("Preffered City Set")
//         }else{
//             res.end("Already Set")
//         }
//     } catch (error) {
        
//     }
// })

// weatheRouter.get("/", async(req, res) => {
//     // const data = await PrefferdModel.find()
//     // console.log(data)
//   redis.get("London", (err, result) => {
//     if (err) {
//       console.log(err);
//       res.send("something went wrong");
//     }else{
//         console.log(result);
//         res.send(result.temp + "Kelvin")
//     }
//   });
// });

module.exports = {
  weatheRouter,
};
