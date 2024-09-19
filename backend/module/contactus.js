const mongoose = require("mongoose")

const contactSchema = mongoose.Schema({
    name:{type:String,require:true},
    email:{type:String,require:true},
    message:{type:String,require:true}
});

const Contact = mongoose.model("contactus",contactSchema)

module.exports = Contact