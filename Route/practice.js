const express = require('express');
const app = express.Router();
const practiceModel = require('../Model/practice');


app.get('/' , async (req , res) => {
    const practice = await practiceModel.find();
    res.send({
        status : 200,
        practice
    })
})

app.post('/' , async (req , res) => {
   const practice = await practiceModel.create({...req.body});
   res.send({
    status : 200,
    practice
   })
})

app.put('/:id' , async (req , res) => {
    const practice = await practiceModel.findByIdAndUpdate(req.params.id , {...req.body});
    res.send({
        status : 200,
        practice
    })    
})


module.exports = app

