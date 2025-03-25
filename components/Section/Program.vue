<template>
  <div class="relative overflow-hidden">
    <SectionHead
      class="py-4 md:pt-8 md:pb-20 relative z-1"
      title="charity_programs"
      section-title="all_programs"
      section-link="/programs"
      body-class="max-w-[1016px]"
    >
      <template #icon>
        <img src="/images/pointer.svg" alt="Pointer" class="w-[137px] h-[130px]" />
      </template>
      <div class="container" data-aos="fade-up">
        <div v-if="loading" class="grid grid-cols-4 gap-4">
          <CommonPreloader
            v-bind="{ loading }"
            v-for="index in 4"
            :key="index"
            height="250px"
            width="100%"
          />
        </div>
        <Swiper v-else v-bind="settings" class="programs-slider">
          <SwiperSlide v-for="(data, index) in [...programs, ...programs]" :key="index">
            <CardProgramNew v-bind="{ data }" />
          </SwiperSlide>
        </Swiper>
      </div>
    </SectionHead>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import { Autoplay } from "swiper";
import type { TPrograms } from "~/types/programs";
interface Props {
  programs: TPrograms[];
  loading?: boolean;
}
defineProps<Props>();

const settings = {
  slidesPerView: 1,
  spaceBetween: 20,
  breakpoints: {
    320: {
      slidesPerView: 1,
    },
    620: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
    1279: {
      slidesPerView: 4,
    },
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
    pauseOnMouseEnter: true,
  },
  loop: true,
  modules: [Autoplay],
};
</script>

<style scoped>
.programs-slider {
  overflow: visible !important;
}
</style>
