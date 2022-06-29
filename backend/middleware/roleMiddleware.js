const jwt = require('jsonwebtoken');
const {secret} = require('../config/authConfig');

module.exports = function (role) {
    return function (req, res, next) {
        console.log('herer')
        if (req.method === "OPTIONS") {
            next();
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({message: "User is not authorized"});
            }
            const {role: userRole} = jwt.verify(token, secret)
            let hasRole = false;
            console.log('userRoles = ', userRole);
            // userRole.forEach(role => {
            //     if (roles.includes(role)) {
            //         hasRole = true;
            //     }
            // })
            if (userRole !== role) {
                console.log('Нет доуступа');
                return res.status(403).json({message: "You do not have access"})
            }
            next();
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: "User is not authorized"})
        }
    }
};