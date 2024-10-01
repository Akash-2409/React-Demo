const router = require("express").Router();
const user = require("../module/user")
const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
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
})

module.exports = router;