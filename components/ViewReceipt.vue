<template>
    <div class="flex items-center justify-center">
        <NuxtImg :src="props.receiptUrl" />
    </div>
</template>

<script setup lang="ts">
type Props = {
    receiptUrl:string;
}

const props = defineProps<Props>();
</script>