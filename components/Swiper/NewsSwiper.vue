<template>
  <Swiper v-if="isMounted" v-bind="settings" class="swiper">
    <SwiperSlide v-for="item in data" :key="item.id">
      <CardNews :data="item" :loading="loading" />
    </SwiperSlide>
  </Swiper>
  <div v-else class="flex gap-4 overflow-x-hidden">
    <div v-for="i in 5" :key="i" class="w-[280px] h-[276px] flex-shrink-0">
      <CommonBlockPreloader
        :loading="!isMounted"
        width="100%"
        height="80%"
        border-radius="16px"
      />
      <CommonBlockPreloader
        :loading="!isMounted"
        width="100%"
        height="18%"
        border-radius="16px"
        margin="10px 0 0 0"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import "swiper/css";
import { ref } from "vue";
const isMounted = ref(false);
interface Props {
  data?: object;
  loading?: boolean;
}

const settings = {
  spaceBetween: 20,
  slidesPerView: 1.5,
  loop: true,
  modules: [Navigation],
  navigation: {
    nextEl: ".swiper-video-next",
    prevEl: ".swiper-video-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 3,
    },
    1024: {
      slidesPerView: 4,
    },
  },
};
defineProps<Props>();

onMounted(() => {
  setTimeout(() => {
    isMounted.value = true;
  }, 1000);
});
</script>
