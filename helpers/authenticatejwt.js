
const authenticatejwt = (req , res , next) => {
  console.log('req.headers----->',req.headers);
  next()
}

module.exports = authenticatejwt
