const router = require("express").Router();
const {authenticateToken} = require('./Userauth'); 
const jwt = require('jsonwebtoken');
const User = require('../module/user');
const Category = require('../module/category');

// Create Category
router.post("/add-category",authenticateToken,async (req,res) =>{
    try {
        const {id} = req.headers;
        const user = await User.findById(id);
        if (user.role_as !="admin") 
        {
            return res.status(400).json({message:"You Are Not Admin"})    
        }
        const category = new Category(
            {
                name:req.body.name,
            }
        );
        await category.save();
        res.status(200).json({message:"Category Added Successfully"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});

// Display Category
router.get("/category",async (req,res)=>{
    try {
        
        const cate = await Category.find({});
        // if (!cate) {
        //     return res.status(400).json({message:"Category Not Found"});
        // }
        res.status(200).json(cate);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Category By ID
router.get("/getcategory",async (req,res)=>{
    try {
        const {id} = req.headers;
        const cate = await Category.findById(id);
        if (!cate) {
            return res.status(400).json({message:"Category Not Found"});
        }
        res.status(200).json(cate);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// Update Category
router.put("/updateCategory",authenticateToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const {name} = req.body;
        const cate = await Category.findByIdAndUpdate(id,{name:name});
        res.status(200).json("Category Changed Successfully....")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.delete("/deleteCategory",authenticateToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const cate = await Category.findByIdAndDelete(id);
        if (authenticateToken == null) {
            return res.status(403).json("You Are Not Admin");
        }
        res.status(200).json("Category Deleted Successfully....")
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

module.exports = router;