<template>
  <label
    class="text-dark leading-125 font-450"
    :class="labelClass"
    :for="forText"
  >
    {{ label }}
  </label>
</template>
<script setup lang="ts">
interface Props {
  label: string;
  labelClass?: string;
  forText?: string;
}
defineProps<Props>();
</script>
