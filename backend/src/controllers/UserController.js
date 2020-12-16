const connection = require('../database/connection');
const secret = require('../config/secret.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(userId) {
    const token = jwt.sign({ id: userId }, secret.auth, { expiresIn: '365d'});

    return token;
}

module.exports = {
    async store(req, res) {
        const data = req.body;

        const hash = await bcrypt.hash(data.password, 10);
        data.password = hash;

        const [ id ] = await connection('users').insert(data);

        if (!id) {
            return res.status(400).json({ message: 'An error occurred when storing user on DB' });
        }

        return res.status(200).json({ id, message: 'User Registered!' });
    },

    async deleteAll(req, res) {

        const result = await connection('users').delete('*');

        return res.status(200).json({ message: 'All users deleted from database' });
    },

    async authenticate(req, res) {
        const tempUser = req.body;

        const user = await connection('users')
            .select('*')
            .where('login', tempUser.login)
            .first();
        
        if(!user || !await bcrypt.compare(tempUser.password, user.password)) {
            return res.status(400).json({ message: 'Login or password is invalid' });
        }

        user.password = undefined;
        user.login = undefined;

        return res.status(200).json({
            user,
            token: generateToken(user.id),
            message: 'User authenticated'
        });
    },

    async session(req, res) {
        const id = req.id;
        
        const user = await connection('users')
            .select('*')
            .where('id', id)
            .first();
        
        if(!user) {
            return res.send(400).json({ message: 'No user registered with this ID' });
        }

        user.password = undefined;
        user.login = undefined;

        return res.status(200).json({ user, message: 'User Founded' });
    }
}