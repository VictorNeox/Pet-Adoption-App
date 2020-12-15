const connection = require('../database/connection');
const secret = require('../config/secret.json');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function generateToken(userId) {
    const token = jwt.sign({ id: userId }, secret.auth);

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

        if (!result) {
            return res.status(400).json({ message: 'An error ocurred when deleting users from DB' });
        }

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
    }
}