const mongoose = require('mongoose');

const userScheme = new mongoose.Schema ({
    username : {type : mongoose.SchemaTypes.String, required : true },
    email : {type : mongoose.SchemaTypes.String, required : true , unique : true},
    password : {type : mongoose.SchemaTypes.String, required : true},
}, {timestamps : true})

const user = mongoose.model('users' , userScheme);

module.exports = user