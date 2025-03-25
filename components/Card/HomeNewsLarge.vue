<template>
  <router-link
    :to="`/news/${card?.slug}`"
    class="group relative rounded-2xl overflow-hidden group cursor-pointer inline-block w-full aspect-[898/429] h-full"
  >
    <!--    aspect-[682/429]-->
    <div v-if="loading">
      <CommonBlockPreloader v-bind="{ loading }" width="869px" height="422px" />
    </div>
    <CommonImage
      v-if="!loading"
      :src="card?.image"
      image-class="aspect-[682/429]  object-cover rounded-none"
      alt="image"
    />
    <div
      class="main-overlay-blue absolute w-full h-full left-0 top-0 z-1 opacity-0 transition-all duration-500 group-hover:opacity-100"
    />
    <div
      class="main-overlay absolute w-full h-full z-2 left-0 bottom-0 transition-all duration-500 opacity-100 group-hover:opacity-0"
    />
    <div
      class="px-6 pb-6 flex flex-col justify-end absolute w-full h-full top-0 left-0 z-3"
    >
      <p
        class="text-white line-clamp-2 transition duration-300 text-base mb-4 sm:text-2xl leading-5 sm:leading-[31px] font-bold group-hover:text-mainColor"
      >
        {{ card?.title }}
      </p>
      <p class="text-sm line-clamp-2 text-color font-medium leading-[18px]">
        {{ card?.short_description }}
      </p>
    </div>
  </router-link>
</template>
<script lang="ts" setup>
import type { TNews } from "~/types/news";

interface Props {
  card?: TNews;
  loading?: boolean;
}

withDefaults(defineProps<Props>(), {});
</script>

<style scoped>
.main-overlay {
  background: linear-gradient(360deg, #090d14 17.4%, rgba(9, 13, 20, 0) 100%);
}
.main-overlay-blue {
  background: linear-gradient(360deg, #30a1db 17.4%, rgba(9, 13, 20, 0) 100%);
}
.text-color {
  color: rgba(255, 255, 255, 0.8);
}

@media screen and (min-width: 1024px) and (max-width: 1200px) {
  .card-wrap {
    width: 70%;
  }
  .card-wrap img {
    object-fit: fill;
  }
}
</style>
