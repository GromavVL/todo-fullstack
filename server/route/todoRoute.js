const { Router } = require('express');
const { todoController } = require('./../controllers');

const todoRoute = Router();

todoRoute
  .route('/')
  .get(todoController.getAllTodo)
  .post(todoController.createTodo);

todoRoute
  .route('/:id')
  .patch(todoController.updateTodoById)
  .delete(todoController.deleteTodoById);

module.exports = todoRoute;
