import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { addTodo } from "../store/reducers/user/todoAction"
import { AiOutlinePlusCircle } from "react-icons/ai";

const AddForm = () => {
    const { isLoadingAddTodo } = useAppSelector(state => state.todos)
    const [newTodo, setNewTodo] = useState("")
    const dispatch = useAppDispatch()

    const handleSubmit = (event: React.FormEvent) => {
        if(newTodo.length) {
            event.preventDefault();
            dispatch(addTodo(newTodo));
            setNewTodo("")
        } 
      };
    
      const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodo(event.target.value);
      };
  
  return (
    <div className="addForm">
        <input className="input_name" value={newTodo} type="text" onChange={handleInputChange} placeholder="Что вы планируете сделать ?"/>
        <button 
            type="submit"
            className="button" 
            onClick={handleSubmit} 
        >
            Добавить
            {isLoadingAddTodo ? (
                <div className='spinner-border' role="status">
                    <span className='sr-only'></span>
                </div>
            ):(
                <AiOutlinePlusCircle />  
            )}
        </button>
      </div>
  )
}

export default AddForm;