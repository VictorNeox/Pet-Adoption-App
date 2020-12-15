const { Router } = require('express');
const routes = Router();
const UserController = require('./controllers/UserController');


// MIDDLEWARES
const UserValidator = require('./middlewares/UserValidator');



routes.post('/api/user', UserValidator.validate, UserController.store);
routes.delete('/api/user/all', UserController.deleteAll);

module.exports = routes;