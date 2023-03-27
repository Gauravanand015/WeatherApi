const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");
const { redis } = require("../Redis/redis");
const winston = require("winston")
require("dotenv").config();


userRouter.post("/register", async (req, res) => {
  const { name, email, pass, age } = req.body;
  const UserEmail = await UserModel.find({email});
  if (UserEmail.length > 0) {
    return res.send("Email is already Registered Try different email");
  }
  try {
    bcrypt.hash(pass, 5, async (error, hash) => {
      if (error) {
        console.log(error);
        res.send("Fill All the Credentials");
      } else {
        let data = new UserModel({
          name,
          email,
          pass: hash,
          age,
        });

        await data.save();
        res.send({ Message: "User Registered", Details: data });
      }
    });
  } catch (error) {
    console.log(error);
    res.send("Error while registering the user");
  }
});

userRouter.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  const UserEmail = await UserModel.find({email});
  if (UserEmail.length == 0) {
    return res.send("You Have to Register First");
  }
  try {
    if (UserEmail.length > 0) {
      bcrypt.compare(pass, UserEmail[0].pass, (error, result) => {
        if (error) {
          console.log(error);
          return res.send("Email or Password is incorrect");
        } else {
          const token = jwt.sign(
            { email: UserEmail[0].email },
            process.env.Token
          );
          res.send({ Message: "User Logged In", Token: token });
        }
      });
    }else{
        res.send("Wrong Credentials")
    }
  } catch (error) {
    console.log(error);
    res.send("Something wenr wrong while user login")
  }
});


userRouter.get("/logout",(req,res)=>{
    const token = req.headers.authorization;
    console.log(token)
    try {
        redis.set("Token",token)
        res.send("Logout Successful")
    } catch (error) {
        console.log(error);
        res.send("Something went wrong while logout")
    }
})

module.exports ={
    userRouter
}