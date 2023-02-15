import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getTodos, addTodo } from "./store/reducers/user/todoAction"
import uuid from 'react-uuid';
import { ITodos } from './types/ITodos';

function App() {
  const dispatch = useAppDispatch()
  const { todos, isLoading } = useAppSelector(state => state.todos)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    dispatch(getTodos())
  },[])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addTodo({
      _id: new Date().toISOString(),
      title: "",
      created_at: new Date().toISOString(),
      completed: true
    }));
    setNewTodo("")
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  if(isLoading){
    <h1>loading</h1>
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input value={newTodo} type="text" onChange={handleInputChange} />
        <button type="submit">Add Todo</button>
      </form>
      <>
      {todos.map(todo => (
        <Todo key={todo._id} todo={todo} />
      ))}
      </>
    </div>
  );
}

export default App;
