import React, { useEffect, useState } from 'react';
import './App.css';
import Todo from './components/Todo';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getTodos, addTodo } from "./store/reducers/user/todoAction"
import Logo from "./images/Logo.png"
import Unicode from "./images/Unicode.png"

function App() {
  const dispatch = useAppDispatch()
  const { todos, isLoading } = useAppSelector(state => state.todos)
  const [newTodo, setNewTodo] = useState("")

  useEffect(() => {
    dispatch(getTodos())
  },[dispatch])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(addTodo(newTodo));
    setNewTodo("")
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  if(isLoading){
    <h1>loading</h1>
  }

  return (
    <div className="form">
      <div className="navbar">
        <img className="todo-logo" src={Logo} alt="todo logo"/>
        <img className="unicode-logo" src={Unicode} alt="unicode logo"/>
      </div>
      <div className="addForm">
        <input className="input_name" value={newTodo} type="text" onChange={handleInputChange} />
        <button className="button" onClick={handleSubmit} type="submit">Добавить</button>
      </div>
      <div className="ul">
      {todos.length === 0 ? (
          <div>У вас пока нет добавленных задач</div>
        ) : (
        todos.map(todo => (
          <Todo key={todo._id} todo={todo} />
        )))}
      </div>
    </div>
  );
}

export default App;
