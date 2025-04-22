import type { TTodo } from "../types/todo";
import { deleteTodo, updateTodo } from "../api/todo";

export default function useTodoActions(
  props: { todos: TTodo[]; status: "todo" | "in-progress" | "done" },
  emit: (event: "update:todos" | "open", payload: any) => void
) {
  const detectMove = (evt: any) => {
    const movedTodo = evt.draggedContext.element;
    const targetStatus = evt.to.getAttribute("data-status");

    if (!targetStatus) {
      console.error("Target status is missing");
      return;
    }
    updateTodo(movedTodo._id, {
      ...movedTodo,
      status: targetStatus,
    });
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;

    try {
      await deleteTodo(id);
      const updatedTodos = props.todos.filter((todo) => todo._id !== id);
      emit("update:todos", updatedTodos);
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  };

  const emitOpen = (id: string) => {
    emit("open", id);
  };

  return {
    detectMove,
    handleDelete,
    emitOpen,
  };
}
