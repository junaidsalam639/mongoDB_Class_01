const route = require('express');
const app = route.Router();
const userModel = require('../Model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

app.get('/', async (req, res) => {
    const user = await userModel.find();
    console.log(user);
    res.send({
        status: 200,
        user
    });
});

app.get('/:id', async (req, res) => {
    const user = await userModel.findById(req.params.id);
    if (user) {
        res.send({
            status: 200,
            user
        });
    }
    else {
        res.send({
            status: 200,
            message: 'User Not Found'
        });
    }
});

app.post('/', async (req, res) => {
    try {
        console.log('Password===>', req.body.password);
        // Generate Hashed Password
        const saltRounds = 10;
        const salt = await bcrypt.genSaltSync(saltRounds)
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash  // Body password Hashed Update 

        const user = await userModel.create({ ...req.body });
        console.log('Hashed Password===>', hash);
        user.password = undefined  // User ka Password Response me Nhi Dikhae
        res.send({
            status: 200,
            user
        });
    } catch (err) {
        console.log(err);
    }
});


app.post('/login', async (req , res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email: email });
        console.log('user===> ', user);
        if (user) {
            console.log(user.password);
            console.log(password);
            const isPasswordValid = bcrypt.compareSync(password, user.password);
            user.password = undefined

            //Generate Token Code
            const token = jwt.sign({
                data : user,
            } , 'bhsdghjxnxbzncvhzchysgdsjfkdslfkdsjfklsjksdhfhsdgf');
            console.log(token);
            
            if (isPasswordValid) {
                res.status(200).send({
                    status: 200,
                    token : token,
                    msg: 'User Login',
                    user
                })
            } else {
                res.status(401).send({
                    status: 401,
                    error: true,
                    msg: 'Password is Not Valid',
                })
            }
        }
        else {
            res.status(401).send({
                status: 401,
                error: true,
                msg: 'Email Does Not Exists',
            })
        }
    } catch (err) {
        console.log(err);
        console.log('User Not Found');
    }
});


app.delete('/:id', async (req, res) => {
    const user = await userModel.findByIdAndDelete(req.params.id);
    if (user) {
        res.status(200).send({
            status: 200,
            message: "User deleted successfully"
        })
    }
    else {
        res.status(200).send({
            status: 500,
            message: "User Not Found",
        })
    }
});

app.put('/:id', async (req, res) => {
    const user = await userModel.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    if (user) {
        res.status(200).send({
            status: 200,
            message: "User Updated successfully",
        })
    }
    else {
        res.status(200).send({
            status: 500,
            message: "User Not Found",
        })
    }
});


module.exports = app
