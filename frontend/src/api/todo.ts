import axios from "axios";
import type { TTodo } from "../types/todo";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export const getTodos = () => {
  return api.get("/todo");
};

export const createTodo = (todo: {
  title: string;
  description: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
}) => {
  return api.post("/todo", todo);
};

export const deleteAllTodo = () => {
  return api.delete("/todo");
};

export const deleteTodo = (id: string) => {
  return api.delete(`/todo/${id}`);
};

export const updateTodo = (id: string, updateTodo: TTodo) => {
  return api.put(`/todo/${id}`, updateTodo);
};
