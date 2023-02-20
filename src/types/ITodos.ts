export interface ITodos {
  _id: string;
  title: string;
  created_at: string;
  completed: boolean;
}

export type todoState = {
  todos: ITodos[];
  isLoading: boolean;
  isLoadingAddTodo: boolean,
  isLoadingUpdateTodo: boolean,
  isLoadingRemoveTodo: boolean,
  error: boolean | number | string | null;
};
