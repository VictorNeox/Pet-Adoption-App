const { Router } = require('express');
const routes = Router();
const UserController = require('./controllers/UserController');


// MIDDLEWARES
const UserValidator = require('./middlewares/UserValidator');



routes.post('/api/user/store', UserValidator.registerValidate, UserController.store);
routes.post('/api/user/authenticate', /*UserValidator.registerValidate,*/ UserController.authenticate);
routes.delete('/api/user/all', UserController.deleteAll);

module.exports = routes;