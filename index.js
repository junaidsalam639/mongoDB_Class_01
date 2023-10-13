const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./Model/user');
const blogRouter = require('./Route/blog');
app.use(express.json());
app.use('/blog' , blogRouter);

mongoose.connect('mongodb+srv://Blog:blog@cluster0.4t24tdb.mongodb.net/').then(()=>{
    console.log('mongoose Connect');
}).catch((err)=>{
    console.log(err);
})


app.get('/' , async (req , res)  => {
    const user = await userModel.find(); 
    console.log(user);
    res.send({
     status : 200,
     user
 });
 });
 
 app.get('/:id' , async (req , res)  => {
     const user = await userModel.findById(req.params.id); 
     console.log(user);
     res.send({
      status : 200,
      user
  });
  });

 app.post('/' , async (req , res)  => {
    try{
        const user = await userModel.create({...req.body}); 
        res.send({
            status : 200,
            user
        });
    }catch(err){
        console.log(err);
    }
 });


 
 app.delete('/:id' , async (req , res)  => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(user){
        res.status(200).send({
            status : 200,
           message : "User deleted successfully"
        })
    }
    else {
        res.status(200).send({
            status : 500,
            message : "User Not Found",
        })    
    }
 });

 app.put('/:id' , async (req , res)  => {
     const user = await userModel.findByIdAndUpdate(req.params.id , {...req.body}, {new : true});
    if(user){
        res.status(200).send({
            status : 200,
            message : "User Updated successfully",
            user
        })
    }
    else {
        res.status(200).send({
            status : 500,
            message : "User Not Found",
        })    
    }
 });


app.listen(3000 , ()=>{
    console.log('Server Start');
})


// npm i mongoose
// mongodb compass download
// mongodb ip adress 0.0.0.0/0

//Schema // kis format me data ko Bhejna he
//Model  // Jis collection ke ander Schema aee ouse Model bolte he
//Documentation // https://mongoosejs.com/docs/

// find // sare user Ajaenge mongoDB se
// findById // Jis ki Id Milegi srif wahi user aeega
// create // Add krne ke lye user ko
// findBtIdAndDelete // delete krne ke lye
//findByIdAndUpdate // update krne ke lye

// app.use(express.json())
// Iska matlab hai ke agar koi client aapki application ko kisi API endpoint par POST ya PUT request bhejta hai aur wo request JSON data ke saath aati hai (jaisa ke { "name": "John", "age": 30 }), to express.json() middleware us JSON data ko parse karega aur aapko JavaScript object ke roop mein available karega, jise aap phir apne code mein istemal kar sakte hain.
// Yeh middleware Express.js ke liye bohot useful hai jab aap JSON format mein data receive karna chahte hain, jaise ke API endpoints par data send karte waqt.







