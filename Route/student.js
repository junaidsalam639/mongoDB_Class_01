const router = require('express');
const studentModel = require('../Model/student');
const app = router.Router();


app.get('/' , async (req , res) => {
    const student = await studentModel.find();
    console.log(student);
    res.status(200).send({
        status : 200,
        studentData : student,
    })
})

app.post('/' , async (req , res) => {
    const student = await studentModel.create({...req.body});
    res.status(200).send({
        status : 200,
        studentData : student,
    })
})

app.delete('/:id' , async (req , res) => {
    const student = await studentModel.findByIdAndDelete(req.params.id);
    res.status(200).send({
        status : 200,
        messgae : 'Student Delete Successfully'
    })
})

app.put('/:id' , async (req , res) => {
    const student = await studentModel.findByIdAndUpdate(req.params.id , {...req.body} , {new : true});
    res.status(200).send({
        status : 200,
        messgae : 'Student Update Successfully'
    })
})


module.exports = app





