<script setup lang="ts">
import Form from './components/Form.vue';
import List from './components/List.vue';
import Panel from './components/UI/Panel.vue';
import ProgressBar from './components/UI/ProgressBar.vue';

import useTodos from './composables/useTodos';
import usePanels from './composables/usePanels';
import { onMounted } from 'vue';

const {
  todos,
  elementInTodo,
  elementInProgress,
  elementInDone,
  percentProgress,
  fetchTodos,
  createNewTodo,
  editTodo,
} = useTodos();

const { isOpenCreatePanel, selectedCard, toggleCreatePanel, openCardPanel, closeCardPanel } = usePanels();

const handleCreateSubmit = async (form) => {
  await createNewTodo(form);
  toggleCreatePanel();
};

const handleEditSubmit = async (form) => {
  await editTodo(form);
  closeCardPanel();
};

onMounted(fetchTodos);
</script>

<template>
  <div class="flex items-center justify-between mb-8 gap-4">
    <h1 class="text-left">Liste des Todos</h1>
    <ProgressBar :value="percentProgress" />
  </div>

  <div class="grid grid-cols-3 gap-4">
    <List title="A faire" v-model:todos="elementInTodo" status="todo" @open="(id) => openCardPanel(id, todos)" />
    <List title="En cours" v-model:todos="elementInProgress" status="in-progress"
      @open="(id) => openCardPanel(id, todos)" />
    <List title="Terminée" v-model:todos="elementInDone" status="done" @open="(id) => openCardPanel(id, todos)" />
  </div>

  <button
    class="inline-flex items-center gap-2 rounded-sm border border-slate-50 bg-indigo-600 pr-4 pl-3 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden absolute bottom-8 right-8 cursor-pointer transition-all duration-200 ease-in-out"
    v-if="!isOpenCreatePanel" @click="toggleCreatePanel">
    Créer une carte
  </button>

  <Panel @onClose="toggleCreatePanel" title="Create Todo" :isOpen="isOpenCreatePanel">
    <Form @submit="handleCreateSubmit" />
  </Panel>

  <Panel @onClose="closeCardPanel" title="Card Infos" :isOpen="!!selectedCard">
    <Form @submit="handleEditSubmit" :todo="selectedCard" />
  </Panel>
</template>