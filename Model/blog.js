const mongoose = require('mongoose');

const userScheme = new mongoose.Schema ({
    title : {type : mongoose.SchemaTypes.String, required : true },
    description : {type : mongoose.SchemaTypes.String, required : true , unique : true},
    user : {type : mongoose.SchemaTypes.ObjectId , ref : 'users' , required : true},
}, {timestamps : true})

const blog = mongoose.model('blogs' , userScheme);

module.exports = blog



























































