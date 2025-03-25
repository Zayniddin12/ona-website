<template>
  <div
    class="relative pt-[118px] pb-8 md:pb-[72px] -mt-[85px] overflow-y-hidden"
  >
    <div class="container grid lg:grid-cols-2 gap-5 relative z-1">
      <div class="flex flex-col justify-between gap-10">
        <div>
          <div class="flex-y-center gap-3">
            <img
              src="/favicon.svg"
              alt="about us icon"
              class="about-icon rounded-xl"
            />
            <h1 class="font-semibold text-2xl sm:text-[50px] leading-[64px]">
              {{ about?.title }}
            </h1>
          </div>
          <div class="mt-6 text-lg leading-135" v-html="about?.body" />
        </div>
        <div
          v-if="
            about.youtube || about.twitter || about.telegram || about.instagram
          "
        >
          <p class="font-medium text-xl leading-130 mb-2">
            {{ $t("me_on_social_sets") }}
          </p>
          <div class="flex-y-center gap-2">
            <template v-for="(item, index) in socials" :key="index">
              <a
                data-aos="zoom-in"
                :data-aos-delay="index * 100"
                :href="item?.link"
                target="_blank"
                class="hover:bg-blue hover:text-white transition-300 w-9 h-9 flex-center rounded-full bg-white text-4xl leading-8 group relative"
              >
                <i :class="item?.icon" />
                <CommonTooltip>{{ item.social_name }}</CommonTooltip>
              </a>
            </template>
          </div>
        </div>
      </div>
      <!--      <SectionMakeDonation />-->

      <div
        class="absolute bottom-0 opacity-60 blur-[271px] left-0 -z-1 max-md:hidden h-[403px] w-[403px] translate-y-1/2 rounded-full bg-[#C88CF2]"
      />
      <div
        class="absolute bottom-0 opacity-60 blur-[271px] right-0 -z-1 max-md:hidden h-[403px] w-[403px] translate-y-1/2 rounded-full bg-[#3A64F8]"
      />
    </div>
    <img
      class="absolute bottom-0 right-0 z-0 max-md:hidden"
      src="~/assets/svg/about-new-pattern.svg"
      alt="logo-pattern"
    />
  </div>
</template>

<script setup lang="ts">
import type { TAbout } from "~/types/about";

interface Props {
  about: TAbout;
}
const props = defineProps<Props>();

const socials = computed(() => [
  {
    icon: "icon-telegram",
    link: props.about?.telegram,
    social_name: "Telegram",
  },
  {
    icon: "icon-twitter",
    link: props.about?.twitter,
    social_name: "Twitter",
  },
  {
    icon: "icon-youtube",
    link: props.about?.youtube,
    social_name: "Youtube",
  },
  {
    icon: "icon-instagram",
    link: props.about?.instagram,
    social_name: "Instagram",
  },
]);
</script>

<style scoped>
.about-icon {
  box-shadow: 0 4px 34px rgba(48, 161, 219, 0.36);
}
</style>
