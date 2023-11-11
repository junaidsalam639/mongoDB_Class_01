const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const blogRouter = require('./Route/blog');
const userRouter = require('./Route/user');
// .env  npm i env // npm i dotenv
// .env require dotenv ke package ka hona zarori hai
require('dotenv').config();
app.use(express.json());
app.use('/blog' , blogRouter);
app.use('/user' , userRouter);
app.use(morgan('tiny'));


mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('mongoose Connect');
}).catch((err)=>{
    console.log(err.code);
})


app.get('/' , async (req , res)  => {
    res.send({
     status : 200,
     message : 'mongoDB connect mongoose'
 });
 });
 

app.listen(3000 , ()=>{
    console.log('Server Start');
})


// npm i mongoose
// mongodb compass download
// mongodb ip adress 0.0.0.0/0
// npm i env // npm i dotenv
// npm i bcrypt
// npm i jsonwebtoken

//Schema // kis format me data ko Bhejna he
//Model  // Jis collection ke ander Schema aee ouse Model bolte he
//Documentation // https://mongoosejs.com/docs/

// find // sare user Ajaenge mongoDB se   // Request Get
// findById // Jis ki Id Milegi srif wahi user aeega // Request Get
// create // Add krne ke lye user ko   // Request Post
// findBtIdAndDelete // delete krne ke lye  // Request Delete
//findByIdAndUpdate // update krne ke lye   // Request Put

// app.use(express.json())
// Iska matlab hai ke agar koi client aapki application ko kisi API endpoint par POST ya PUT request bhejta hai aur wo request JSON data ke saath aati hai (jaisa ke { "name": "John", "age": 30 }), to express.json() middleware us JSON data ko parse karega aur aapko JavaScript object ke roop mein available karega, jise aap phir apne code mein istemal kar sakte hain.
// Yeh middleware Express.js ke liye bohot useful hai jab aap JSON format mein data receive karna chahte hain, jaise ke API endpoints par data send karte waqt.




// https://codepen.io/tag/bootstrap-navbar


