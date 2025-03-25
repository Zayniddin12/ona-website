<template>
  <div class="relative z-0">
    <img
      class="absolute -z-1 left-0 top-0 w-full h-full object-cover block sm:hidden"
      src="/images/help-bg.webp"
      alt="help image"
    />

    <div data-aos="fade-up" class="container py-4 md:py-8 z-1">
      <div
        class="bg-white/[.48] border-2 border-white rounded-2xl p-6 lg:py-9 lg:pl-12 flex-center-between max-lg:flex-col lg:pr-20"
      >
        <div class="lg:max-w-[80%] h-full flex flex-col justify-between">
          <i18n-t
            keypath="do_you_need_help"
            tag="h3"
            class="text-dark mb-4 lg:mb-7 text-xl font-bold md:text-2xl lg:text-[48px] !leading-130"
          >
            <template #help>
              <span class="text-white bg-blue rounded-lg px-1 font-bold">
                {{ $t("help") }}
              </span>
            </template>
          </i18n-t>
          <p class="text-dark-light leading-130 text-base">
            {{ list?.title }}
          </p>
          <ul class="help-list mt-5 lg:mt-10 pl-3">
            <li
              v-for="(item, index) in list?.lists"
              :key="index"
              class="mb-1 md:mb-2 last:mb-0 help-list-item text-dark text-base md:text-lg font-medium leading-125"
            >
              {{ item }}
            </li>
          </ul>
          <div class="hidden sm:flex gap-4 mt-5 md:mt-10 max-sm:flex-col">
            <NuxtLink
              to="/help"
              class="bg-[#e64056] hover:bg-[#e81c37] w-full font-medium text-base leading-125 h-full px-5 py-3 flex-center transition-300 text-white rounded-lg"
            >
              <div class="flex-y-center gap-2 text-lg">
                <i class="icon-heart text-2xl leading-6 text-white" />
                <h4 class="whitespace-nowrap">{{ $t("get_help") }}</h4>
              </div>
            </NuxtLink>

            <NuxtLink
              to="/help"
              class="w-full w-max-[246px] bg-[#ededee] hover:bg-[#d0d0d0] font-medium text-base leading-125 h-full px-5 py-3 flex-center transition-300 text-dark rounded-lg"
            >
              <div class="flex-y-center group gap-2 text-lg">
                <h4 class="whitespace-nowrap">{{ $t("more") }}</h4>
                <i
                  class="icon-chevron-right transition-300 group-hover:translate-x-[3px] text-green"
                />
              </div>
            </NuxtLink>
          </div>
        </div>
        <div class="flex-center my-4 sm:my-0">
          <CommonImage
            class="aspect-[368/368] sm:w-full sm:max-w-[400px] h-auto !mt-0 max-sm:mt-20 object-cover"
            src="images/online_donation.webp"
            alt="donate"
          />
        </div>
        <div class="flex flex-col w-full sm:hidden gap-4 justify-between">
          <NuxtLink
            to="/help"
            class="bg-[#e64056] hover:bg-[#e81c37] w-full font-medium text-base leading-125 h-full px-[7.5px] sm:px-5 py-3 flex-center transition-300 text-white rounded-lg"
          >
            <div class="flex-y-center gap-2 text-lg">
              <h4 class="whitespace-nowrap">{{ $t("get_help") }}</h4>
              <i class="icon-heart text-2xl leading-6 text-white" />
            </div>
          </NuxtLink>

          <NuxtLink
            to="/help"
            class="w-full w-max-[246px] bg-[#ededee] hover:bg-[#d0d0d0] font-medium text-base leading-125 h-full px-5 py-3 flex-center transition-300 text-dark rounded-lg"
          >
            <div class="flex-y-center gap-2 text-lg">
              <h4 class="whitespace-nowrap">{{ $t("more") }}</h4>
              <i class="icon-arrow-right" />
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { THelp } from "~/types/common";

interface Props {
  list: THelp;
}
defineProps<Props>();
</script>

<style scoped>
.help-list-item {
  list-style-type: disc;
  padding-inline-start: 1ch;
}
.help-list-item::marker {
  content: url("@/assets/svg/bullet-green.svg");
  transform: translateX(-8px);
}
</style>
