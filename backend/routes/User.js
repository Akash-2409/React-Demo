const router = require("express").Router();
const { JsonWebTokenError } = require("jsonwebtoken");
const user = require("../module/user")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");
// const {authenticatetoken} = require("./Userauth")

// Sign Up For Admin
router.post("/signUp", async (req, res) => {
    try {
        const {username, email, password} = req.body;

        // Check Username Already Existing Or Not
        const existingUser = await user.findOne({username:username})
        if(existingUser) {
            return res.status(400).json({msg: "Username already exists"})
        }

        // Check Email Already Existing or Not
        const existingemail = await user.findOne({email:email})
        if(existingemail) {
            return res.status(400).json({msg: "Email already exists"})
        }

        const hasPass = await bcrypt.hash(password,10);

        const newUser = new user({
            username:username,
            email:email,
            password:hasPass
        });

        await newUser.save();

        return res.status(200).json({message:"SignUp Successfully...."})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
});

// User Login
router.post("/login",async (req,res) => {
    try {
        const {username,password} = req.body;
        const existingUser = await user.findOne({username});

        if (!existingUser) {
            res.send(400).json({message: error.message});
        }
        await bcrypt.compare(password,existingUser.password,(err,data) =>{
            if (data) {
                const authClain = [
                    {name:existingUser.username},
                    {role_as:existingUser.role_as}
                ];
                const token = jwt.sign({authClain},"trimurti2008",{expiresIn:"30d"});
                res.status(200).json({id:existingUser.id, role_as:existingUser.role_as, token:token});
            }
            else{
                res.status(500).json({message:err.message})
            }
        }) 
    } 
    catch (error) 
    {
        res.status(500).json({message:error.message})    
    }
});

// Get Admin Information
router.get("/admin-info",authenticateToken, async (req,res)=>{
    try {
        const {id} = req.headers;
        const data = await user.findById(id);
        return res.status(200).json(data)
    } catch (error) {
        res.status(400).json({message:error.message})
    }
});

// Update Admin Password
router.put("/update-admin",authenticateToken,async (req,res) =>{
    try {
        const {id} = req.headers;
        const {password} = req.body;
        const hasPass = await bcrypt.hash(password,10);

        const data = await user.findByIdAndUpdate(id,{password:hasPass});
        res.status(200).send("Password Changed Successfully...")
    } 
    catch (error) 
    {
        res.status(500).json({message:error.message})    
    }
})

module.exports = router;