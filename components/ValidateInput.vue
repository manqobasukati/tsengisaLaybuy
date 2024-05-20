<template>
  <div>
    <div class="text-red-500 text-xs" v-if="message">{{ message }}</div>
  </div>
</template>

<script setup lang="ts">
import type { ZodError } from 'zod';

type Props = {
  errors: ZodError | null;
  path: string;
};

const props = defineProps<Props>();
const message = computed(() => {
  const findPath = props.errors?.errors.find((val) => {
    return val.path.includes(props.path);
  });

  if (findPath) {
    return `${findPath?.message}`;
  }
  return '';
});
</script>
