import React from 'react';
import Todo from './Todo';
import { ITodos } from '../types/ITodos';

interface TodoListProps {
    todos: ITodos[];
}

const TodoList: React.FC<TodoListProps> = ({ todos }) => {
  const count = todos.filter((todo) => todo.completed).length;
  const counts = todos.length;

  return (
    <div className="ul">
      <div className='tasks'>
        <p className='p'><span className='count-tasks'>Всего задач </span><span className='counts left'>{counts}</span></p>
        <p className='p'><span className='count-tasks-decide'>Выполнено</span><span className='counts'>{counts === 0 ? `${count}` : `${count} из ${counts}`}</span></p>
        
      </div>
      {todos.length === 0 ? (
        <div className='no-tasks-blocks'>
          <div className="fa-solid fa-clipboard"></div>
          <div className='no-tasks'>У вас пока нет добавленных задач</div>
        </div>
          
        ) : (
        todos.map((todo) => (
          <Todo key={todo._id} todo={todo} />
        )))}
      </div>
  )
}

export default TodoList;