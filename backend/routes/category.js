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

module.exports = router;