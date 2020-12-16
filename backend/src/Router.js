const { Router, request } = require('express');
const routes = Router();

// Controllers
const UserController = require('./controllers/UserController');
const PetController = require('./controllers/PetController');


// MIDDLEWARES
const UserValidator = require('./middlewares/UserValidator');
const Authorization = require('./middlewares/Auth');



routes.post('/api/user/store', UserValidator.registerValidate, UserController.store);
routes.post('/api/user/authenticate', /*UserValidator.registerValidate,*/ UserController.authenticate);
routes.post('/api/user/auth', Authorization.validateToken, UserController.session);
routes.delete('/api/user/all', UserController.deleteAll);

routes.post('/api/pet/store', Authorization.validateToken, PetController.store);

module.exports = routes;