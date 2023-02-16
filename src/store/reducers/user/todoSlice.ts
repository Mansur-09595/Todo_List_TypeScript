import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, addTodo, deleteTodo, updateTodo } from "./todoAction";
import { ITodos, todoState } from "../../../types/ITodos";

const initialState: todoState = {
  todos: [],
  isLoading: false,
  isLoadingAddTodo: false,
  isLoadingRemoveTodo: false,
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getTodo
    builder.addCase(getTodos.pending, (state) => {
        state.isLoading = true
    })
    builder.addCase(getTodos.fulfilled,(state, action: PayloadAction<ITodos[]>) => { 
        state.isLoading = false
        state.todos = action.payload
    })
    //addTodo
    builder.addCase(addTodo.pending, (state) => {
        state.isLoadingAddTodo = true
    })
    builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodos>) => {
        state.isLoadingAddTodo = false
        state.todos = [...state.todos, action.payload];
    });
    //updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(updateTodo.fulfilled, (state, action: PayloadAction<ITodos>) => {
      state.isLoading = false
      state.todos = state.todos.map(todo => {
        if (todo._id === action.payload._id) {
          return action.payload;
        }
        return todo;
      });
    });
    //deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoadingRemoveTodo = true
    })
    builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoadingRemoveTodo = false
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    });
  }
});

export default todoSlice.reducer;
