const mongoose = require('mongoose');
const express = require('express');
const app = express();

const practiceSchema = new mongoose.Schema({
    username : {type : mongoose.SchemaTypes.String , required : true},
    email : {type : mongoose.SchemaTypes.String , required : true , unique : true},
    password : {type : mongoose.SchemaTypes.String , required : true},
    blog : {type : mongoose.SchemaTypes.ObjectId , ref : 'blogs' , required : true},
})

const practiceModel = mongoose.model('practices' , practiceSchema);



app.get('/practice' , async (req , res) => {
    const practice = await practiceModel.find().populate('blog').exec();
    res.status(200).send({
        status : 200,
        practice
    })
})











