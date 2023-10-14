const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentName : {type : mongoose.SchemaTypes.String , required : true},
    studentClass : {type : mongoose.SchemaTypes.String , required : true},
    studentSubject : {type : mongoose.SchemaTypes.String , required : true},
});

const student = mongoose.model('students' , studentSchema);

module.exports = student


