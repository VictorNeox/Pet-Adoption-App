const Joi = require('joi');
const connection = require('../database/connection');

const userSchema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().min(2).max(2).required()
});

module.exports = {
    async registerValidate(req, res, next) {
        const user = req.body;
        try {
            const validation = await userSchema.validateAsync(user);
        } catch (err) {
            if(err) {
                return res.status(400).send({ message: `Error: ${err.message}` });
            }
        }

        const searchUser = await connection('users')
            .select('*')
            .orWhere('email', user.email)
            .orWhere('login', user.login)
            .first();

        if(searchUser) {
            if(searchUser.email === user.email) {
                return res.status(400).send({ message: 'This e-mail is already been used.' });
            }
            
            if (searchUser.login === user.login) {
                return res.status(400).send({ message: 'This login is already been used.' });
            }
        }

        next();
    }
}