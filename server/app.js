const express = require('express');
const cors = require('cors');
const route = require('./route');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use('/api', route);

module.exports = app;
