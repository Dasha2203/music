const jwt = require('jsonwebtoken');
const {secret} = require('../config/authConfig');
module.exports = function(req, res, next) {
    if (req.methods === 'OPTIONS') {
        next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            res.status(403).json({message: 'Unauthorized user'})
        }
        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (err) {
        console.log(err)
        res.status(403).json({message: 'Unauthorized user'})
    }
}