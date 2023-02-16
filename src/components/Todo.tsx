import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/hooks";
import { ITodos } from "../types/ITodos";
import { deleteTodo, updateTodo } from "../store/reducers/user/todoAction";

interface Props {
  todo: ITodos;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const { isLoadingRemoveTodo } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  // const [newTitle, setNewTitle] = useState("");

  const handleDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleUpdate = () => {
    dispatch(updateTodo({ _id: todo._id, completed: !todo.completed }));
    // setNewTitle("");
  };

  return (
    <div className="li">
      
      <p className="p">
        
      <input type="checkbox" checked={todo.completed} onChange={handleUpdate}/>

        {todo.title.length > 25 ? `${todo.title.substring(0, 25)}...` : todo.title}
        {isLoadingRemoveTodo ? (
          <div className="spinner-border" role="status">
            <span className="sr-only"></span>
          </div>
        ) : (
          <>
          <button className="fa-solid fa-trash" onClick={() => handleDelete(todo._id)}></button>
        
          {/* <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          /> */}
          </>
        )}
      </p>
    </div>
  );
};

export default Todo;
