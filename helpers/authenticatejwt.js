const jwt = require('jsonwebtoken');
const authenticatejwt = async (req, res, next) => {
    try{
        console.log('req.headers----->', req.headers);
        const token = req.headers?.authorization?.split(' ')[1];
        console.log('token authorization ------>', token);
        if (token) {
            const isVerify = await jwt.verify(token, 'bhsdghjxnxbzncvhzchysgdsjfkdslfkdsjfklsjksdhfhsdgf');
            console.log('isVerify-----> ', isVerify);
            next()
        }
        else {
            res.status(403).send({
                status : 403,
                error : true ,
                msg : 'Token Not Valid'
            })
        }
    }catch(err){
        res.status(403).send({
            status : 403,
            error : true ,
            msg : 'Token Not Valid'
        })
    }
}

module.exports = authenticatejwt