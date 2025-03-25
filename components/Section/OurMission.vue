<template>
  <div class="bg-grey-400 py-4 md:py-8">
    <SectionHead title="our_mission">
      <template #title>
        <i18n-t keypath="our_mission" tag="span" class="section__title">
          <template #mission>
            <span class="text-blue">
              {{ $t("mission") }}
            </span>
          </template>
        </i18n-t>
      </template>
    </SectionHead>
    <div class="container grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 grid lg:grid-cols-2 gap-5">
        <CardMission
          data-aos="flip-left"
          :data-aos-delay="idx * 100"
          v-for="(card, idx) in missions"
          :key="idx"
          v-bind="{ card }"
        />
      </div>
      <img
        data-aos="fade-left"
        class="max-md:hidden rounded-2xl w-full border border-grey-100"
        src="~/assets/svg/world-care.svg"
        alt="world-care"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TMission } from "~/types/about";

interface Props {
  missions: TMission[];
}
defineProps<Props>();
</script>
<style>
[data-aos="fade-left"],
[data-aos="fade-right"] {
  transform: translate3d(0, 100px, 0);
  opacity: 0;
  transition-property: transform, opacity;
}

[data-aos="fade-left"].aos-animate,
[data-aos="fade-right"].aos-animate {
  transform: translate3d(0, 0, 0);
  opacity: 1;
}
</style>
