<template>
    <div class="border border-gray-100 rounded-lg h-fit min-h-[180px] shadow-[6px_6px_0px_black]">
        <h2 class="border-b border-gray-100 p-4">{{ title }}</h2>
        <draggable :animation="300" :list="todos" :move="detectMove" group="todos" :data-status="status" itemKey="_id">
            <template #item="{ element }">
                <Card :todo="element" @delete="handleDelete" @open="emitOpen" />
            </template>
        </draggable>
    </div>
</template>

<script setup lang="ts">
import draggable from 'vuedraggable';
import Card from './UI/Card.vue';
import { TTodo } from '../types/todo';
import useTodoActions from '../composables/useTodoActions';

const props = defineProps<{
    title: string;
    todos: TTodo[];
    status: 'todo' | 'in-progress' | 'done';
}>();

const emit = defineEmits<{
    (e: 'update:todos', todos: TTodo[]): void;
    (e: 'open', id: string): void;
}>();

// Utilisation du composable pour les actions sur les tâches
const { detectMove, handleDelete, emitOpen } = useTodoActions(props, emit);
</script>