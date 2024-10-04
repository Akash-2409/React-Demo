const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
require("dotenv").config();
require("./conn/conn");

const user = require('./routes/User');
const category = require('./routes/category');
// require("./module/user")

// app.get('/', (req, res) => res.send('Hello World!'));

// User Api
app.use("/api/v1",user);



// Add category
app.use("/api/v1",category);

// app.post('/category',async (req,res) =>{
//     try {
//         // const {name, category, colorcode, price, description} = req.body;
//         // console.log(req.body);
//         const category = await Category.create(req.body)
//         res.status(201).send(category)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

// Get All Category
// app.get('/allcategory',async (req,res) =>{
//     try {
//         const allcategory = await Category.find({})
//         res.status(200).send(allcategory)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

// Get Category by Id
// app.get('/categoryid',async (req,res) =>{
//     try {
//         const {id} = req.headers;
//         const categoryid = await Category.findById(id)
//         res.status(200).send(categoryid)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

// Update category
// app.put('/updatecategory',async (req,res) =>{
//     try {
//         const {cateid} = req.headers;
//         const updatecategory = await Category.findByIdAndUpdate(cateid,req.body,{ new: true });
//         console.log(updatecategory);
        
//         res.status(200).send(updatecategory)
        
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

// Delete Category
// app.delete('/deletecategory',async (req,res) =>{
//     try {
//         const  { id } = req.headers;
//         const deletecategory = await Category.findByIdAndDelete(id)
//         if (!deletecategory) {
//             return res.status(404).send("Category Not Found")
//         }
//         res.send("Category Deleted Successfully")

//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

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