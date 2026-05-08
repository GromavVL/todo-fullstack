const { Todo } = require('./../models');

module.exports.getAllTodo = async (req, res, next) => {
  try {
    const foundTodo = await Todo.findAll();

    res.status(200).send(foundTodo);
  } catch (err) {
    next(err);
  }
};

module.exports.createTodo = async (req, res, next) => {
  const { body } = req;
  try {
    const createdTodo = await Todo.create(body);
    res.status(201).send(createdTodo);
  } catch (err) {
    next(err);
  }
};

module.exports.updateTodoById = async (req, res, next) => {
  const {
    params: { id },
    body,
  } = req;
  try {
    const [countUpdateTodo, updatedTodo] = await Todo.update(body, {
      where: { id },
      returning: true,
    });

    res.status(200).send(updatedTodo);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteTodoById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const deleteTodo = await Todo.destroy({ where: { id } });

    if (!deleteTodo) {
      return res.status(404).send('Todo not found');
    }
    res.status(200).send('Todo is deleted');
  } catch (err) {
    next(err);
  }
};
