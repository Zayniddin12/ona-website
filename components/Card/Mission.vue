<template>
  <div
    class="flex flex-col items-start gap-y-3 !min-h-[122px] rounded-2xl bg-white shadow p-3 md:p-5 md:pt-6 hover:!scale-[1.02] hover:shadow-missionCardShadow cursor-pointer"
  >
    <div class="flex-y-center gap-2">
      <img
        class="w-8 h-8 object-contain"
        :src="card?.icon"
        alt="mission icon"
      />
      <p class="text-dark font-semibold text-base leading-130 line-clamp-1">
        {{ card?.title }}
      </p>
    </div>
    <p class="line-clamp-2 text-sm md:text-base leading-130 text-dark-light">
      {{ card?.body }}
    </p>
  </div>
</template>

<script setup lang="ts">
import type { TMission } from "~/types/about";

interface Props {
  card?: TMission;
}
defineProps<Props>();
</script>

<style scoped>
.shadow {
  box-shadow: 0 0 32px rgba(5, 16, 21, 0.08);
}
</style>
