import { createAsyncThunk } from "@reduxjs/toolkit";

export const getTodos = createAsyncThunk(
    "users/upload", 
    async function () {
        const res = await fetch("https://unicode-todo.onrender.com/todos");
        return await res.json();
});

export const addTodo = createAsyncThunk(
    "todos/add", 
    async function (title: string) {
        const res = await fetch("https://unicode-todo.onrender.com/todos", {
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
    await fetch(`https://unicode-todo.onrender.com/todos/${_id}`, {
      method: "DELETE",
    });
    return _id;
  }
);

export const updateTodo = createAsyncThunk(
  "todos/update",
  async ({ _id, completed }: { _id: string, completed: boolean }) => {
    const res = await fetch(`https://unicode-todo.onrender.com/todos/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) {
      throw new Error("Failed to update todo.");
    }
    return await res.json()
  }
);

// export const updateTodo = createAsyncThunk(
//   "todos/update",
//   async (title: string) => {
//     const res = await fetch(`https://unicode-todo.onrender.com/todos/${title}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ title }),
//     });
//     return await res.json()
//   }
// );
