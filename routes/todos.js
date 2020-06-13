const express = require('express');
const router = express.Router();
const Joi = require('joi');

const todos = [
  { id: 1, description: 'mop the floor' },
  { id: 2, description: 'vacuum the carpet' },
  { id: 3, description: 'take out trash' },
];

router.get('/', (req, res) => {
  res.send(todos);
});

router.get('/:id', (req, res) => {
  const task = todos.find((task) => task.id === parseInt(req.params.id));

  if (!task)
    return res
      .status(404)
      .send(`The task with id ${req.params.id} does not exist`);

  res.send(task);
});

router.post('/', (req, res) => {
  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const task = {
    id: todos.length + 1,
    description: req.body.description,
  };

  todos.push(task);
  res.send(task);
});

router.put('/:id', (req, res) => {
  //get the id of the task to update
  const task = todos.find((task) => task.id === parseInt(req.params.id));

  if (!task)
    return res
      .status(404)
      .send(`The task with id ${req.params.id} does not exist`);

  const { error } = validateTask(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //update the task description with new information from the body
  task.description = req.body.description;
  res.send(task);
});

router.delete('/:id', (req, res) => {
  //get the id of the task to delete
  const task = todos.find((task) => task.id === parseInt(req.params.id));

  if (!task)
    return res
      .status(404)
      .send(`The task with id ${req.params.id} does not exist`);

  const index = todos.indexOf(task);

  todos.splice(index, 1);
  res.send(task);
});

function validateTask(task) {
  const schema = {
    description: Joi.string().min(3).required(),
  };
  return Joi.validate(task, schema);
}

module.exports = router;
