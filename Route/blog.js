const route = require('express');
const app = route.Router();
const blogModel = require('../Model/blog');

app.get('/' , async (req , res)  => {
    const blog = await blogModel.find().populate('user').exec(); 
    blog.map((blog) => {
        console.log('Name : ===> ',blog.user.username);
        console.log('Title : ===> ',blog.title);
        console.log('Description : ===> ',blog.description);
    })
    res.send({
     status : 200,
     blog
 });
 });
 
 app.get('/:id' , async (req , res)  => {
     const blog = await blogModel.findById(req.params.id).populate('user').exec(); 
     if(blog){
         res.send({
          status : 200,
          blog
      });
     }
     else{
        res.send({
            status : 200,
            message : 'User Not Found'
        })
     }
  });

 app.post('/' , async (req , res)  => {
    try{
        const blog = await blogModel.create({...req.body}); 
        res.send({
            status : 200,
            blog
        });
    }catch(err){
        console.log(err);
    }
 });


 
 app.delete('/:id' , async (req , res)  => {
    const blog = await blogModel.findByIdAndDelete(req.params.id);
    if(blog){
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
     const blog = await blogModel.findByIdAndUpdate(req.params.id , {...req.body}, {new : true});
    if(blog){
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
