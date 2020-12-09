const { urlencoded } = require('express');
const express = require('express');
const app = express();

const routes = require('./Router');

app.use(urlencoded({ extended: true }));
app.use(express.json());

app.use(routes);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Backend listening to port ${port}.`);
})