<template>
  <div class="w-[112px] h-[112px] relative cursor-pointer group">
    <img :src="item?.image" alt="card" class="w-full h-full object-cover" />

    <div
      class="bg-[#1C1F20] bg-opacity-[32%] w-full h-full absolute inset-0 z-[1]"
    />

    <div
      class="absolute z-[3] scale-0 group-hover:scale-100 transition-all -left-[15px] duration-500 bottom-2"
    >
      <a
        aria-label="username"
        :href="!!item.username && item.username!== '0' ? `https://instagram.com/${item?.username}` : ''"
        :target="!!item.username && item.username!== '0' ? '_blank' : ''"
      >
        <div class="rounded-lg">
          <CommonImage
            :src="item?.image"
            alt="card"
            class="aspect-[138/138] object-cover rounded-lg"
          />
        </div>
      </a>

    </div>
  </div>
</template>

<script setup lang="ts">
import type { TGallery } from "~/types/common";

interface Props {
  item: TGallery;
}
defineProps<Props>();
</script>
