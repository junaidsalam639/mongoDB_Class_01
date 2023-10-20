const route = require('express');
const app = route.Router();
const userModel = require('../Model/user');

app.get('/' , async (req , res)  => {
    const user = await userModel.find(); 
    res.send({
     status : 200,
     user
 });
 });
 
 app.get('/:id' , async (req , res)  => {
     const user = await userModel.findById(req.params.id); 
     if(user){
         res.send({
          status : 200,
          user
      });
     }
     else{
        res.send({
            status : 200,
            message : 'User Not Found'
        });
     }
  });

 app.post('/' , async (req , res)  => {
    try{
        const user = await userModel.create({...req.body}); 
        res.send({
            status : 200,
            message : 'User Add Successfully'
        });
    }catch(err){
        console.log(err);
    }
 });


 
 app.delete('/:id' , async (req , res)  => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if(user){
        res.status(200).send({
            status : 200,
           message : "User deleted successfully"
        })
    }
    else {
        res.status(200).send({
            status : 500,
            message : "User Not Found",
        })    
    }
 });

 app.put('/:id' , async (req , res)  => {
     const user = await userModel.findByIdAndUpdate(req.params.id , {...req.body}, {new : true});
    if(user){
        res.status(200).send({
            status : 200,
            message : "User Updated successfully",
        })
    }
    else {
        res.status(200).send({
            status : 500,
            message : "User Not Found",
        })    
    }
 });


 module.exports = app
