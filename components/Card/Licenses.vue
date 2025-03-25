<template>
  <div class="p-3 pb-4 rounded-xl shadow bg-white flex flex-col">
    <div class="flex-grow">
      <img
        class="border border-grey-200 aspect-[256/171] w-full rounded-sm object-contain"
        :src="card?.image"
        alt="card image"
      />
      <h4 class="mt-2 mb-4 font-medium leading-130 text-black">
        {{ card.title }}
      </h4>
    </div>
    <div class="mt-auto">
      <Button
        @click="downloadFile(card?.file, card?.title)"
        class="w-full"
        :text="$t('load')"
      >
        <template #pre-icon>
          <i class="icon-download text-white mr-2" />
        </template>
      </Button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TLicense } from "~/types/about";

interface Props {
  card?: TLicense;
}
defineProps<Props>();
</script>

<style scoped>
.shadow {
  box-shadow: 0 0 32px rgba(5, 16, 21, 0.08);
}
</style>
