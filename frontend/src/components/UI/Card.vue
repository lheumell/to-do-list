<template>
    <div draggable="true"
        class="relative border border-slate-50 rounded-md p-4 m-4 bg-slate-900 hover:bg-slate-800 transition-all duration-200 ease-in-out cursor-pointer"
        @click="emitOpen">
        <button class="absolute top-2 right-2 cursor-pointer" @click.stop="emitDelete">✖</button>
        <h3 class="font-bold text-md mb-2">{{ todo.title }}</h3>
        <div class="flex items-center justify-between">
            <p class="text-slate-50 text-sm italic truncate">{{ todo.description }}</p>
            <div v-if="todo.priority === 'high'" class=" h-4 w-4 bg-red-500"></div>
        </div>


    </div>
</template>

<script setup lang="ts">
import { TTodo } from '../../types/todo'

const props = defineProps<{
    todo: TTodo;
}>();


const emit = defineEmits<{
    (e: 'delete', id: string): void;
    (e: "open", id: string): void
}>();

const emitDelete = () => {
    emit('delete', props.todo._id);
};

const emitOpen = () => {
    emit('open', props.todo._id);
};

</script>
