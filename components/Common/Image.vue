<template>
  <div
    v-lazy="src"
    :error-state="errorState"
    class="image-loading overflow-hidden"
  >
    <img :alt class="object-cover w-full h-full" :class="imageClass" />
  </div>
</template>

<script setup lang="ts">
import type { TClassName } from "~/types/common";

interface Props {
  src: string | undefined;
  alt?: string;
  errorState?: string;
  imageClass?: TClassName;
}
withDefaults(defineProps<Props>(), {
  imageClass: "",
  errorState: "",
  alt: "image",
});
</script>
