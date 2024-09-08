const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

// Define base URL
app.use('/api', (req, res, next) => {
  // This middleware will be executed for all routes starting with '/api'
  next();
});

let todos = [
  {
    id: 1,
    title: 'Test Todo App',
    completed: false
  }
];
let currentId = 2;

// Get all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// Get a specific todo by id
app.get('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todo = todos.find(t => t.id === id);
  if (todo) {
    res.json(todo);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Create a new todo
app.post('/api/todos', (req, res) => {
  const { title, completed = false } = req.body;
  const newTodo = { id: currentId++, title, completed };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Update an existing todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { title, completed } = req.body;
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex > -1) {
    todos[todoIndex] = { id, title, completed };
    res.json(todos[todoIndex]);
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

// Delete a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const todoIndex = todos.findIndex(t => t.id === id);
  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
    res.status(204).end();
  } else {
    res.status(404).json({ error: 'Todo not found' });
  }
});

app.listen(port, () => {
  console.log(`Todo API listening at http://localhost:${port}`);
});
