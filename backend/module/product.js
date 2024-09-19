const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema({
    name:{type:String,require:true},
    categoryID:{type:mongoose.Schema.Types.ObjectId,ref:'Category',require:true},
    colorcode:{type:String},
    price:{type:Number,require:true},
    // image:{type:String},
    description:{type:String},
    
});

const Product = mongoose.model("product",ProductSchema);
module.exports = Product