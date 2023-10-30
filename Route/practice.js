//Import 
const mongoose = require('mongoose');
const app = require('express');
const route = app();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// UserSchema 
const practiceSchema = new mongoose.Schema({
    username: { type: mongoose.SchemaTypes.String, required: true },
    email: { type: mongoose.SchemaTypes.String, required: true, unique: true },
    password: { type: mongoose.SchemaTypes.String, required: true },
})

// UserModel
const model = mongoose.model('practice', practiceSchema);


// All UserGet
route.get('/', async (req, res) => {
    const practice = await model.find();
    res.status(200).send({
        status: 200,
        practice
    })
})

// User Password Hash Me Convert
route.post('/', async (req, res) => {
    try {
        console.log(req.body.password);
        const round = 10;
        const salt = await bcrypt.genSaltSync(round);
        const hash = await bcrypt.hashSync(req.body.password, salt);
        req.body.password = hash
        console.log(hash);
        const practice = await model.create({ ...req.body });
        practice.password = undefined
        res.status(200).send({
            status: 200,
            practice
        })
    } catch (err) {
        res.status(403).send({
            status: 403,
            masg: 'crash Does Not Exists',
            error: true
        })
    }
})


// User Find And Password Compare And User Token Generate
route.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body
        const isUser = await model.findOne({ email: email });
        console.log(isUser);
        if (isUser) {
            const isPassword = await bcrypt.compareSync(isUser.password, password);
            console.log(isPassword);
            isUser.password = undefined
            const token = jwt.sign({
                data: isUser
            }, 'dkjsfjhsdfgsdfhjfgsdhhfsdfsg')
            if (isPassword) {
                res.status(200).send({
                    status: 200,
                    token,
                    isUser
                })
            } else {
                res.status(403).send({
                    status: 403,
                    masg: 'Password Does Not Exists',
                    error: true
                })
            }
        } else {
            res.status(403).send({
                status: 403,
                masg: 'Email Does Not Exists',
                error: true
            })
        }
    } catch (err) {
        res.status(403).send({
            status: 403,
            masg: 'Email Does Not Exists',
            error: true
        })
    }

})





















