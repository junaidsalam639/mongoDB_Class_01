const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Blog:blog@cluster0.4t24tdb.mongodb.net/').then(()=>{
    console.log('mongoose Connect');
}).catch((err)=>{
    console.log(err);
})




app.get('/' , (req , res)  => {
    res.send({
     status : 200,
     message : 'This is Node Js'
 });
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



