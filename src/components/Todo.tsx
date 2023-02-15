import React from 'react';
import { useAppDispatch } from '../hooks/hooks';
import { ITodos } from '../types/ITodos';
import { deleteTodo } from '../store/reducers/user/todoAction';

interface Props {
  todo: ITodos;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const dispatch = useAppDispatch()

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  return (
    <div>
      <p>{todo.title}</p>
       <pre key={todo._id}>
          <button onClick={() => handleDelete(todo._id)}>Delete</button>
        </pre>
    </div>
  )
}

export default Todo;