import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTodos, addTodo, deleteTodo, updateTodo } from "./todoAction";
import { ITodos, todoState } from "../../../types/ITodos";

const initialState: todoState = {
  todos: [],
  isLoading: false,
  isLoadingAddTodo: false,
  isLoadingUpdateTodo: false,
  isLoadingRemoveTodo: false,
  error: null,
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
    builder.addCase(getTodos.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
    
    //addTodo
    builder.addCase(addTodo.pending, (state) => {
        state.isLoadingAddTodo = true
    })
    builder.addCase(addTodo.fulfilled, (state, action: PayloadAction<ITodos>) => {
        state.isLoadingAddTodo = false
        state.todos = [...state.todos, action.payload];
    });
    builder.addCase(addTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });

    //updateTodo
    builder.addCase(updateTodo.pending, (state) => {
      state.isLoadingUpdateTodo = true
    })
    builder.addCase(updateTodo.fulfilled, (state, action: PayloadAction<ITodos>) => {
      state.isLoadingUpdateTodo = false
      state.todos = state.todos.map(todo => {
        if (todo._id === action.payload._id) {
          return action.payload;
        }
        return todo;
      });
    });
    builder.addCase(updateTodo.rejected, (state, action) => {
      state.isLoadingUpdateTodo = false;
      state.error = action.error.message || "Something went wrong";
    });

    //deleteTodo
    builder.addCase(deleteTodo.pending, (state) => {
      state.isLoadingRemoveTodo = true
    })
    builder.addCase(deleteTodo.fulfilled, (state, action: PayloadAction<string>) => {
      state.isLoadingRemoveTodo = false
      state.todos = state.todos.filter((todo) => todo._id !== action.payload);
    });
    builder.addCase(deleteTodo.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Something went wrong";
    });
  }
});

export default todoSlice.reducer;
