const mongoose = require("mongoose");

const weatherSchema = mongoose.Schema({
    cityName:String,
    userEmail:String
})

const WeatherModel = mongoose.model("weather",weatherSchema);

module.exports={
    WeatherModel
}