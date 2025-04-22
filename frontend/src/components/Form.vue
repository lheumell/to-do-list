<template>

    <div class="p-4">
        <form @submit.prevent="emitSubmit">
            <div class="mb-4">
                <label for="title">Title</label>
                <input type="text" id="title" v-model="form.title" required />
            </div>

            <div class="mb-4">
                <label for="description">Description</label>
                <textarea id="description" v-model="form.description"></textarea>
            </div>

            <div class="mb-4">
                <label for="status">Status</label>
                <select id="status" v-model="form.status" required>
                    <option class="text-neutral-500" value="todo">A faire</option>
                    <option class="text-neutral-500" value="in-progress">En cours</option>
                    <option class="text-neutral-500" value="done">Terminée</option>
                </select>
            </div>

            <div class="mb-4">
                <label for="priority">Priority</label>
                <select id="priority" v-model="form.priority" required>
                    <option class="text-neutral-500" value="low">Low</option>
                    <option class="text-neutral-500" value="medium">Medium</option>
                    <option class="text-neutral-500" value="high">High</option>
                </select>
            </div>

            <button
                class="inline-flex items-center gap-2 rounded-sm border border-slate-50 bg-indigo-600 px-4 py-3 text-white hover:bg-transparent hover:text-indigo-600 focus:ring-3 focus:outline-hidden cursor-pointer transition-all duration-200 ease-in-out"
                type="submit">{{ labelButton }}</button>
        </form>
    </div>

</template>

<script setup lang="ts">
import { computed, reactive } from 'vue';
import { TFormType, TTodo } from '../types/todo';

const labelButton = computed(() => props.todo ? 'edit' : 'create');

const props = defineProps<{
    todo?: TTodo
}>();

const emit = defineEmits<{
    (e: 'submit', form: TFormType): void;
}>();



const form: TFormType = reactive(props.todo || {
    title: '',
    description: '',
    status: 'todo',
    priority: 'low',
});



const emitSubmit = () => {
    emit('submit', form);
};


</script>

<style scoped>
label {
    display: block;
    margin-bottom: 0.5rem;
}

input,
textarea,
select {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}
</style>