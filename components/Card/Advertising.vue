<template>
  <a
    :href="link"
    class="relative h-[400px] lg:h-[540px] rounded-2xl overflow-hidden"
  >
    <img
      :src="image"
      alt="advertising image"
      class="absolute inset-0 h-full w-full"
    />
  </a>
</template>

<script setup lang="ts">
interface Props {
  image: string;
  link: string;
}

const props = withDefaults(defineProps<Props>(), {});
</script>
