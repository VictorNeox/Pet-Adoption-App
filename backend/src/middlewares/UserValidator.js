const Joi = require('joi');
const connection = require('../database/connection');

const userSchema = Joi.object({
    name: Joi.string().required(),
    login: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().required(),
    city: Joi.string().required(),
    uf: Joi.string().min(2).max(2)
});

module.exports = {
    async validate(req, res, next) {
        const data = req.body;
        try {
            const validation = await userSchema.validateAsync(data);
        } catch (err) {
            if(err) {
                return res.status(400).send({ message: `Error: ${err.message}` });
            }
        }


        
        const checkLogin = await connection('users').select('*').where({ login: data.login }).first();
        if (checkLogin) {
            return res.status(400).send({ message: 'This login is already been used.' });
        }

        const checkEmail = await connection('users').select('*').where({ email: data.email }).first();
        if (checkEmail) {
            return res.status(400).send({ message: 'This e-mail is already been used.' });
        }
        
        next();
    }
}