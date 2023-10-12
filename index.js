const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userModel = require('./Model/user');
app.use(express.json());

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


app.listen(3000 , ()=>{
    console.log('Server Start');
})


// npm i mongoose
// mongodb compass download
// mongodb ip adress 0.0.0.0/0

//Schema // kis format me data ko Bhejna he
//Model  // Jis collection ke ander Schema aee ouse Model bolte he
//Documentation // https://mongoosejs.com/docs/



