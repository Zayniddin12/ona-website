<template>
  <div class="flex gap-3 lg:gap-6 lg:flex-col items-center">
    <span class="w-20 h-20 flex-center shrink-0">
      <CommonImage
        image-class="aspect-[80/80]"
        :src="item.icon"
        :alt="item?.title"
      />
    </span>
    <div class="lg:text-center">
      <Vue3Autocounter
        ref="counter"
        class="text-xl font-bold md:text-[32px] md:font-semibold text-dark leading-130 md:mt-3 mb-1"
        :start-amount="0"
        :end-amount="item.count || 0"
        :duration="5"
        separator=" "
        autoinit
      />
      <ClientOnly>
        <div
          class="text-sm sm:text-base font-450 text-dark-light leading-130 line-clamp-2"
        >
          {{ $t(item.title) }}
        </div>
      </ClientOnly>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  item: {
    icon: string;
    count: number;
    title: string;
  };
}
defineProps<Props>();
</script>
