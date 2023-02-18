import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ITodos } from "../types/ITodos";
import { deleteTodo, updateTodo } from "../store/reducers/user/todoAction";

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

  const whatTime = () => {
    const timeDiff = Date.now() - todo.created_at;
    const minute = 60 * 1000;
    const hour = 60 * minute;
    const day = 24 * hour;
    const week = 7 * day;
    const month = 30 * day;

    if (timeDiff < minute) {
      return "меньше минуты";
    } else if (timeDiff < hour) {
      const time = Math.floor(timeDiff / minute);
      return `${time} минут назад`;
    } else if (timeDiff < day) {
      const time = Math.floor(timeDiff / hour);
      return `${time} час назад`;
    } else if (timeDiff < week) {
      const time = Math.floor(timeDiff / day);
      return `${time} день назад`;
    } else if (timeDiff < month) {
      const time = Math.floor(timeDiff / week);
      return `${time} недель назад`;
    } else {
      const time = Math.floor(timeDiff / month);
      return `${time} месяц назад`;
    }
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
        <span className="what-time">{whatTime()}</span>
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
