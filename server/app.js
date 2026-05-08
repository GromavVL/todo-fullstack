const express = require('express');
const route = require('./route');

const app = express();
app.use(express.json());

app.use('/api', route);

module.exports = app;