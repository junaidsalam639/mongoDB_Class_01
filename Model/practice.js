const mongoose = require('mongoose');

const practiceSchema = new mongoose.Schema({
    number : {type : mongoose.SchemaTypes.String , required : true},
    adress : {type : mongoose.SchemaTypes.String , required : true},
    course : {type : mongoose.SchemaTypes.String , required : true},
}, {timestamps : true});


const practiceModel = mongoose.model('practices' , practiceSchema);

module.exports = practiceModel



