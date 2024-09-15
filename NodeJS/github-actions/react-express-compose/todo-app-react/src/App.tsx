import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { Input } from './components/ui/input';
import { Button } from './components/ui/button';
import { Label } from './components/ui/label';
import { Checkbox } from './components/ui/checkbox';

const apiUrl = '/api/todos';

function App() {
  const [todos, setTodos] = useState<any[]>([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get(apiUrl).then(response => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    if (newTodo.trim()) {
      axios.post(apiUrl, { title: newTodo }).then((response : any) => {
        setTodos([...todos, response.data]);
        setNewTodo('');
      });
    }
  };

  const deleteTodo = (id : any) => {
    axios.delete(`${apiUrl}/${id}`).then(() => {
      setTodos(todos.filter(todo => todo.id !== id));
    });
  };

  const toggleTodo = (id : any) => {
    const todo = todos.find(t => t.id === id);
    axios.put(`${apiUrl}/${id}`, { ...todo, completed: !todo.completed }).then(response => {
      setTodos(todos.map(t => (t.id === id ? response.data : t)));
    });
  };

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="flex mb-4">
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new todo"
          className="border p-2 mr-2"
        />
        <Button onClick={addTodo} className="p-2">Add</Button>
      </div>
      <ul >
        {todos.map((todo : any) => (
          <li key={todo.id} className="flex items-center p-2 border-b">
            <div className="flex items-center">
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="mr-2"
              />
              <Label
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                onClick={() => toggleTodo(todo.id)}
                className="cursor-pointer"
              >
                {todo.title}
              </Label>
            </div>
            <Button onClick={() => deleteTodo(todo.id)} className="p-2 ml-5">Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App