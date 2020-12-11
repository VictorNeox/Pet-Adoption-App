const { urlencoded } = require('express');
const express = require('express');
const app = express();

const routes = require('./Router');

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3333;

app.listen(port, () => {
    console.log(`Server listening to port ${port}.`);
})


module.exports = app;