const jwt = require("jsonwebtoken");
const { redis } = require("../Redis/redis");
require("dotenv").config();

const authenticate = (req,res,next)=>{
    const token = req.headers.authorization;
    console.log(token)
    try {
        const decoded = jwt.verify(token, process.env.Token,(err, decoded)=>{
            if(err){
                res.send("Invalid Token")
            }else{
                redis.get("Token",(err,result)=>{
                    // console.log("result",result)
                    if(err){
                        console.log(err)
                        res.send("Error while getting key from redis in middleware")
                    }else if(result){
                        if(result === null){
                            res.status(404).send("Key is not found")
                        }if(result == token){
                                res.send("You have to login first")
                        }if(result!=token){
                            console.log(decoded)
                            let email = decoded.email;
                            req.body.userEmail = email
                            next()
                        }
                    }
                })
            }
          });
    } catch (error) {
        
    }
}

module.exports ={
    authenticate
}