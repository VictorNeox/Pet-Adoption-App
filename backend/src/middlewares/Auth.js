const jwt = require('jsonwebtoken');
const config = require('../config/secret.json');


module.exports = {
    async validateToken(req, res, next) {
        const authHeader = req.headers.authorization;

        if(!authHeader) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const parts = authHeader.split(' ');

        if(parts.length !== 2) {
            return res.status(401).json({ message: 'Token Error' });
        }

        const [ scheme, token ] = parts;

        if(!/^Bearer$/i.test(scheme)) {
            return res.status(401).json({ message: 'Token malformatted'});
        }

        jwt.verify(token, config.auth, (err, decoded) => {
            if(err)
                return res.send(401).json({ message: 'Invalid Token' });
            
            req.id = decoded.id
            next();
        });
    }
}