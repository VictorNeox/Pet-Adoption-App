const connection = require('../database/connection');

module.exports = {
    async store(req, res) {
        const pet = req.body;

        pet.user_id = req.id;

        const [ id ] = await connection('pets').insert(data);

        if (!id) {
            return res.status(400).json({ message: 'An error occurred when storing pet on DB' });
        }

        return res.status(200).json({ id, message: 'Pet registered!' });
    },
}