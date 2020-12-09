const { Router } = require('express');
const routes = Router();



routes.get('/', (req, res) => {
    return res.send('Worked!');
});

module.exports = routes;