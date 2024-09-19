const express = require('express');
const user = require('./module/user');
const Product = require('./module/product');
const Category = require('./module/category');
const nodemailer = require('nodemailer')
const app = express()
app.use(express.json())
require("dotenv").config();
require("./conn/conn")
require("./module/user")

app.get('/', (req, res) => res.send('Hello World!'))

//User Create 
app.post('/user',async (req,res) => {
    try {
        const User = await user.create(req.body);
        res.status(200).json(User)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// User Data

app.get('/userData',async (req,res) => {
    try {
        const userdata = await user.find({});
        res.status(200).json(userdata)
    } catch (error) {
        res.status(500).send(error.message)
    }
});

// Add category
app.post('/category',async (req,res) =>{
    try {
        // const {name, category, colorcode, price, description} = req.body;
        // console.log(req.body);
        const category = await Category.create(req.body)
        res.status(201).send(category)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get All Category
app.get('/allcategory',async (req,res) =>{
    try {
        const allcategory = await Category.find({})
        res.status(200).send(allcategory)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Get Category by Id
app.get('/categoryid',async (req,res) =>{
    try {
        const {id} = req.headers;
        const categoryid = await Category.findById(id)
        res.status(200).send(categoryid)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Update category
app.put('/updatecategory',async (req,res) =>{
    try {
        const {cateid} = req.headers;
        const updatecategory = await Category.findByIdAndUpdate(cateid,req.body,{ new: true });
        console.log(updatecategory);
        
        res.status(200).send(updatecategory)
        
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Delete Category
app.delete('/deletecategory',async (req,res) =>{
    try {
        const  { id } = req.headers;
        const deletecategory = await Category.findByIdAndDelete(id)
        if (!deletecategory) {
            return res.status(404).send("Category Not Found")
        }
        res.send("Category Deleted Successfully")

    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Add Product

app.post('/product',async (req,res) =>{
    try {
        // const {name, category, colorcode, price, description} = req.body;
        // console.log(req.body);
        const product = await Product.create(req.body);
        res.status(201).send(product)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// Contact US Page Data
app.post('/contactus',async (req,res)=>{
    const {name,email,message} = req.body

    if (!name|| !email || !message) {
        return res.status(500).json({error:"Please Fill All Fields"})
    }

    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'devil.280298@gmail.com',
              pass: 'Devil$666'
            }
          });
        const mailOptions = {
            from: email,
            to: 'devil.280298@gmail.com', // Your email
            subject: `Contact Us Form Submission from ${name}`,
            text: `You have received a new message from ${name} (${email}):\n\n${message}`
        };
        // Response With Success Message
        res.status(200).json({ success: 'Your message has been sent!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send your message.' });
    }
})

app.listen(process.env.port, () => console.log(`Server Started  on port ${process.env.port}`))