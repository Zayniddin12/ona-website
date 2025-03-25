<template>
  <Swiper class="swiper" v-bind="settings" v-if="isMounted">
    <SwiperSlide v-for="(item, index) in loading ? 5 : data" :key="index">
      <CardEvent
        :data="loading ? undefined : item"
        v-bind="{ loading }"
        event-style="h-[391px]"
      />
    </SwiperSlide>
  </Swiper>
  <div v-else class="flex gap-4 overflow-x-hidden">
    <div v-for="i in 5" :key="i" class="w-[280px] h-[390px] flex-shrink-0">
      <CommonBlockPreloader
        :loading="!isMounted"
        width="100%"
        height="100%"
        border-radius="16px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/css";

import type { TEvent } from "~/types/events";

interface Props {
  data?: TEvent[];
  loading?: boolean;
}

const props = defineProps<Props>();

const settings = {
  loop: false,
  slidesPerView: 1,
  spaceBetween: 20,
  navigation: {
    nextEl: ".swiper-event-next",
    prevEl: ".swiper-event-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
    1280: {
      slidesPerView: 5,
    },
  },
  modules: [Navigation],
};

const isMounted = ref(false);

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 1000);
});
</script>
