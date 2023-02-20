import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ITodos } from "../types/ITodos";
import { deleteTodo, updateTodo } from "../store/reducers/user/todoAction";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ru";

interface Props {
  todo: ITodos;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const { isLoadingRemoveTodo, isLoadingUpdateTodo } = useAppSelector(
    (state) => state.todos
  );
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ _id: todo._id, completed: !todo.completed }));
  };

  dayjs.locale("ru");
  dayjs.extend(relativeTime);

  const whatTime = (created_at: string): string => {
    return dayjs(+ created_at).fromNow(); 
  };

  return (
    <div className="li">
      <p className="p">
        {isLoadingUpdateTodo ? (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <input className="checkbox-input" type="checkbox" checked={todo.completed} onChange={handleUpdate} />
        )}

        <p className="todo-title">
          {todo.title.length > 75 ? `${todo.title.substring(0, 75)}...` : todo.title}
        </p>
        <span className="what-time">{whatTime(todo.created_at)}</span>
        {isLoadingRemoveTodo ? (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <button className="fa-solid fa-trash" onClick={() => handleDelete(todo._id)}></button>
        )}
      </p>
    </div>
  );
};

export default Todo;
