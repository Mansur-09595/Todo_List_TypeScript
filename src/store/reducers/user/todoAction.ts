import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseUrl } from "../../../API";

export const getTodos = createAsyncThunk(
    "users/upload", 
    async function () {
        const res = await fetch(`${baseUrl}/todos`);
        return await res.json();
});

export const addTodo = createAsyncThunk(
    "todos/add", 
    async function (title: string) {
        const res = await fetch(`${baseUrl}/todos`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title }),
        });
        return await res.json();
    }
);

export const deleteTodo = createAsyncThunk(
  "todos/delete",
  async (_id: string) => {
    await fetch(`${baseUrl}/todos/${_id}`, {
      method: "DELETE",
    });
    return _id;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ _id, completed }: { _id: string, completed: boolean }) => {
    const res = await fetch(`${baseUrl}/todos/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    return await res.json()
  }
);
