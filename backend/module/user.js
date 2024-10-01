const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    username: {type:String,require:true},
    email: {type:String,require:true,unique:true},
    password: {type:String,require:true},
    role_as:{type:String,default:"admin",enum:["user","admin"]}
});

const user = mongoose.model("user",UserSchema);

module.exports = user 