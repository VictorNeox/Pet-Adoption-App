const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const data = req.body;

        const [ id ] = await connection('users').insert(data);

        if (!id) {
            return res.status(400).send({ message: "An error occurred when storing user on DB" });
        }

        return res.status(200).send({ id, message: "User Registered!" });
    },

    async deleteAll(req, res) {

        const result = await connection('users').delete('*');

        if (!result) {
            return res.status(400).send({ message: "An error ocurred when deleting users from DB" });
        }

        return res.status(200).send({ message: "All users deleted from database" });
    }
}