const mongoose = require("mongoose");

const prefferedSchema = mongoose.Schema({
    prefferedCity:String,
    userEmail:String
})

const PrefferdModel = mongoose.model("weather",prefferedSchema);

module.exports={
    PrefferdModel
}