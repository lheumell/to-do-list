import { ref } from 'vue';
import type { TTodo } from '../types/todo';

export default function usePanels() {
  const isOpenCreatePanel = ref(false);
  const selectedCard = ref<TTodo | null>(null);

  const toggleCreatePanel = () => {
    isOpenCreatePanel.value = !isOpenCreatePanel.value;
  };

  const openCardPanel = (id: string | null, todos: TTodo[]) => {
    selectedCard.value = todos.find((todo) => todo._id === id) || null;
  };

  const closeCardPanel = () => {
    selectedCard.value = null;
  };

  return {
    isOpenCreatePanel,
    selectedCard,
    toggleCreatePanel,
    openCardPanel,
    closeCardPanel,
  };
}