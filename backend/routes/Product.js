const router = require('express').Router();
const {authenticateToken} = require('./Userauth');
const Product = require("../module/product");

// Add Product
router.post("/addProduct",authenticateToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const {name,categoryID,price,description} = req.body;
        const product = await Product.create({name,categoryID,price,description,id});
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

// Get All Product
router.get("/products",async (req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});
module.exports = router;