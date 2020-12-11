const connection = require('../database/connection');
// const UserValidator = require('../models/UserValidator');


module.exports = {
    async store(req, res) {
        const data = req.body;

        const { id } = await connection('users').insert(data);

        if(!id) {
            return res.status(400).send({ message: "An error occurred when storing user on DB" });
        }

        return res.status(200).send({ id: user });
    }
}