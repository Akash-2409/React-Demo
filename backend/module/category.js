const mongoose = require("mongoose")

const CategorySchema = new mongoose.Schema({
    name:{type:String,require:true},
    
});

const Category = mongoose.model("category",CategorySchema)

module.exports = Category