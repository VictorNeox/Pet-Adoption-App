const { urlencoded } = require('express');
const express = require('express');
const app = express();

const routes = require('./Router');

app.use(express.json());
app.use(express.static('tmp/uploads/users'));
app.use(express.static('tmp/uploads/pets'));

app.use(urlencoded({ extended: true }));

app.use(routes);

module.exports = app; // Exports to use on tests

