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

// Display product by ID
router.get("/productsid",async (req,res)=>{
    try {
        const { id } = req.body;
        const products = await Product.findById(id);
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

// Update Product
router.put("/updateProduct",authenticateToken,async (req,res)=>{
    try {
        const {productid} = req.headers;
        await Product.findByIdAndUpdate(productid,{
            name:req.body.name,
            categoryID:req.body.categoryID,
            price:req.body.price,
            description:req.body.description
        });
        res.status(200).json({message:"Product Updated Successfully"});
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

// Display Product Using CategoryID
router.get("/getProductbyCateID",async (req,res)=>{
    try {
        const { categoryID } = req.body;
        console.log(categoryID);
        
        if (!categoryID) {
            return res.status(400).json({ message: "categoryID is required" });
        }
        
        const products = await Product.find({categoryID});

        if (products.length === 0) {
            return res.status(400).json({message: "Product Not Found on This Category"})
        }
        return res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});

// Delete PRoduct
router.delete("/deleteProduct",authenticateToken,async (req,res)=>{
    try {
        const {productid} = req.headers;
        await Product.findByIdAndDelete(productid)
        res.status(200).json("Product Deleted Successfully....")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
});
module.exports = router;