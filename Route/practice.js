const mongoose = require('mongoose');
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

app.post('/practice' , async (req , res) => {
    const rounds = 10
    const saltRounds = await bcrypt.genSaltSync(rounds);
    const hash = await bcrypt.hashSync(saltRounds);
    req.body.password = hash

    const practice = await practiceModel.create({...req.body});
    req.body.password = undefined
    
    const token = jwt.sign({
        data : practice
    } , 'ajhfkjfgdhdbfvvsdfgkjauirgfdghfdgsjsfdgsds')
    console.log(token);

    res.status(200).send({
        status : 200,
        practice
    })
})


















