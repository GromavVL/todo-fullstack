const { Router } = require('express');
const todoRoute = require('./todoRoute');

const route = Router();

route.use('/todo', todoRoute);

module.exports = route;
