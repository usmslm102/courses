import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const apiUrl = 'http://localhost:3001/todos';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get(apiUrl).then(response => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      axios.post(apiUrl, { title: newTodo }).then(response => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      });
    }
  };

  const deleteTodo = (id) => {
    axios.delete(`${apiUrl}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  const toggleTodo = (id) => {
    const todo = todos.find(t => t.id === id);
    axios.put(`${apiUrl}/${id}`, { ...todo, completed: !todo.completed }).then(response => {
      setTodos(todos.map(t => (t.id === id ? response.data : t)));
    });
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
              onClick={() => toggleTodo(todo.id)}
            >
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
