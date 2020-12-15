const { Router, request } = require('express');
const routes = Router();
const UserController = require('./controllers/UserController');


// MIDDLEWARES
const UserValidator = require('./middlewares/UserValidator');
const Authorization = require('./middlewares/Auth');



routes.post('/api/user/store', UserValidator.registerValidate, UserController.store);
routes.post('/api/user/authenticate', /*UserValidator.registerValidate,*/ UserController.authenticate);
routes.post('/api/user/auth', Authorization.validateToken, UserController.session);
routes.delete('/api/user/all', UserController.deleteAll);

module.exports = routes;