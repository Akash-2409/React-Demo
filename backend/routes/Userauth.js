const jwt = require("jsonwebtoken")

const authenticateToken = (req,res,next)=>{
    const authHeader = req.header('auth')
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) {
        res.send(401).json({message:"Authenticate Token Required"})
    }
    jwt.verify(token,"trimurti2008",(err,user)=>{
        if (err) {
            return res.status(403).json(err)
        }
        req.user = user;
        next();
    });
};

module.exports = {authenticateToken}