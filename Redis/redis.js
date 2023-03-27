const Redis = require("ioredis")
require("dotenv").config();


const redis = new Redis({
    port:15279,
    host:"redis-15279.c273.us-east-1-2.ec2.cloud.redislabs.com",
    username:"default",
    password:process.env.RedisPassword
})

module.exports ={
    redis
}