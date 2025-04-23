<template>
  <div v-if="isOpen" class="z-10">
    <div class="bg-neutral-950 opacity-50 absolute top-0 right-0 h-full w-full "></div>
    <div ref="panelRef"
      class="absolute w-[600px] top-0 right-0 h-full bg-neutral-900 p-4 rounded-l-md border-l-2 border-neutral-950">
      <div class="flex items-center justify-between border-b-2 border-neutral-950 p-4">
        <h2 class="text-lg font-bold text-slate-50">{{ title }}</h2>
        <button class="cursor-pointer px-4 py-2 border border-slate-50 rounded-md hover:bg-red-500"
          @click="handleClose">✖</button>
      </div>
      <slot />
    </div>
  </div>

</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

const panelRef = ref()

defineProps<{
  title: string;
  isOpen: boolean;
}>();

onClickOutside(panelRef, _ => handleClose())

const emit = defineEmits<{
  (e: 'onClose'): void;
}>();

const handleClose = () => {
  emit('onClose');
}


</script>