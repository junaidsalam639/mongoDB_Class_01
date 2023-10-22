const express = require('express');
const app = express.Router();
const practiceModel = require('../Model/practice');


app.get('/' , async (req , res) => {
    const practice = await practiceModel.find();
    
})

module.exports = app

