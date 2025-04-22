import { ref, computed } from "vue";
import { createTodo, getTodos, updateTodo } from "../api/todo";
import type { TTodo } from "../types/todo";

export default function useTodos() {
  const todos = ref<TTodo[]>([]);
  const elementInTodo = ref<TTodo[]>([]);
  const elementInProgress = ref<TTodo[]>([]);
  const elementInDone = ref<TTodo[]>([]);

  const percentProgress = computed(() => {
    const totalTodos = todos.value.length;
    const doneTodos = elementInDone.value.length;
    return Math.round((doneTodos / totalTodos) * 100 || 0);
  });

  const updateFilteredLists = () => {
    elementInTodo.value = todos.value.filter((todo) => todo.status === "todo");
    elementInProgress.value = todos.value.filter(
      (todo) => todo.status === "in-progress"
    );
    elementInDone.value = todos.value.filter((todo) => todo.status === "done");
  };

  const fetchTodos = async () => {
    try {
      const { data } = await getTodos();
      todos.value = data;
      updateFilteredLists();
    } catch (error) {
      console.error("Erreur lors de la récupération des todos :", error);
    }
  };

  const createNewTodo = async (form: TTodo) => {
    const response = await createTodo(form);
    todos.value.push(response.data);
    updateFilteredLists();
  };

  const editTodo = async (form: TTodo) => {
    await updateTodo(form._id, form);
    updateFilteredLists();
  };

  return {
    todos,
    elementInTodo,
    elementInProgress,
    elementInDone,
    percentProgress,
    fetchTodos,
    createNewTodo,
    editTodo,
  };
}
