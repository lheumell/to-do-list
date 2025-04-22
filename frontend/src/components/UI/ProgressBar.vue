<template>
    <div>
        <span class="font-bold text-sm">progression</span>
        <div class="w-[350px] h-4 rounded-lg border-2 border-slate-50">
            <div class="bg-green-500 h-full w-[0px] rounded-l-md" :class="{ 'rounded-r-md': value === 100 }"
                :style="{ width: widthByPercent }">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    value: number;
}>()


const widthByPercent = computed(() => {
    return `${props.value ? props.value * 3.5 - 4 : 0}px`
})
</script>