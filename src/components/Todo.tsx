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
    <div className="li">
      <p className="p">{todo.title}<button className="fa-solid fa-trash" onClick={() => handleDelete(todo._id)}></button></p>
    </div>
  )
}

export default Todo;