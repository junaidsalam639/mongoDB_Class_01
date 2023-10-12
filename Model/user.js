const mongoose = require('mongoose');

const userScheme = new mongoose.Schema ({
    username : {type : mongoose.SchemaTypes.String, required : true },
    email : {type : mongoose.SchemaTypes.String, required : true , unique : true},
    password : {type : mongoose.SchemaTypes.String, required : true},
})

const users = mongoose.model('Blogs' ,userScheme);

module.exports = users

