import React, { useEffect } from 'react';
import './App.scss';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import { getTodos } from "./store/reducers/user/todoAction"
import Logo from "./images/Logo.png"
import Unicode from "./images/Unicode.png"
import AddForm from './components/AddForm';
import TodoList from './components/TodoList';

function App() {
  const dispatch = useAppDispatch()
  const { todos, isLoading } = useAppSelector(state => state.todos)
  
  useEffect(() => {
    dispatch(getTodos())
  },[dispatch])

  if(isLoading){
    <h1>loading</h1>
  }

  return (
    <div className="form">
      <div className="navbar">
        <img className="todo-logo" src={Logo} alt="todo logo"/>
        <img className="unicode-logo" src={Unicode} alt="unicode logo"/>
      </div>
      <AddForm />
      <TodoList todos={todos} />
      
    </div>
  );
}

export default App;
