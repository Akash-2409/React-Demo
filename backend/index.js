const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors())
app.use(express.json())
require("dotenv").config();
require("./conn/conn");

const user = require('./routes/User');
const category = require('./routes/category');
const product = require('./routes/Product');
// require("./module/user")

// app.get('/', (req, res) => res.send('Hello World!'));

// User Api
app.use("/api/v1",user);



// Add category
app.use("/api/v1",category);


// Add Product
app.use("/api/v1",product)

// app.post('/product',async (req,res) =>{
//     try {
//         // const {name, category, colorcode, price, description} = req.body;
//         // console.log(req.body);
//         const product = await Product.create(req.body);
//         res.status(201).send(product)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

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