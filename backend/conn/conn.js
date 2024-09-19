const mongoose = require("mongoose");

const conn = async() => {
    try {
        await mongoose.connect(`${process.env.url}`);
        console.log("Connected To Database");
    } catch (error) {
        console.log(error);
    }
}
conn();