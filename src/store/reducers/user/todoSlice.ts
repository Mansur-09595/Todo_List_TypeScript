import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, addTodo, deleteTodo } from "./todoAction";
import { ITodos, todoState } from "../../../types/ITodos";

const initialState: todoState = {
  todos: [],
  isLoading: false,
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
        state.isLoading = true
    })
    builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodos>) => {
        state.isLoading = false
        state.todos = [...state.todos, action.payload];
    });
    //deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    });
  }
});

export default todoSlice.reducer;
