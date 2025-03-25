<template>
  <SectionHead
    title="they_help_us"
    section-title="become_friend"
    section-link="/partners"
    class="py-4 md:py-8"
  >
    <div ref="partnersHolder" class="flex flex-col gap-7 md:gap-8 !overflow-hidden">
      <Vue3Marquee :duration="700" :pause="!isPartnersHolderVisible" :pause-on-hover="true">
        <CardPartner
            v-for="(card, index) in partners"
            :key="index"
            v-bind="{ card }"
            class="mr-7"
        />
      </Vue3Marquee>
      <Vue3Marquee direction="reverse" :duration="700" :pause="!isPartnersHolderVisible" :pause-on-hover="true">
        <CardPartner
            v-for="(card, index) in reversedPartners"
            :key="index"
            v-bind="{ card }"
            class="mr-7"
        />
      </Vue3Marquee>
    </div>
  </SectionHead>
</template>

<script lang="ts" setup>
import { Vue3Marquee } from "vue3-marquee"
import type { TPartner } from "~/types/partner"
import {useIntersectionObserver} from "@vueuse/core"

interface Props {
  partners: TPartner[]
  loading?: boolean
  position?: string
  isDark?: boolean
}

const props = defineProps<Props>();

const partnersHolder = ref()
const isPartnersHolderVisible = ref(false)

const reversedPartners = JSON.parse(JSON.stringify(props.partners)).reverse()

onMounted(() => {
  if (partnersHolder.value) {
    useIntersectionObserver(partnersHolder.value, ([{ isIntersecting }], observerElement) => {
      isPartnersHolderVisible.value = isIntersecting
    })
  }
})

</script>

<style>
.marquee-partners {
  display: flex;
  overflow: hidden !important;
  user-select: none;
  gap: 3rem;
  padding: 100px 0 20px 0;
  margin: -100px 0 -20px 0;
}

.marquee-partners__group_left {
  flex-shrink: 0;
  margin-left: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 28px;
  min-width: 100%;
  animation: scroll-left 1000s linear infinite;
}

.marquee-partners__group_left:hover {
  animation-play-state: paused;
}

.marquee-partners__group_right:hover {
  animation-play-state: paused;
}

.marquee-partners__group_right {
  flex-shrink: 0;
  margin-right: -200px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 28px;
  min-width: 100%;
  animation: scroll-right 1000s linear infinite;
}

@media (prefers-reduced-motion: reduce) {
  .marquee-partners__group_left {
    animation-play-state: paused;
  }
}

.marquee-partners__group_left p {
  aspect-ratio: 1;
  object-fit: cover;
  border-radius: 1rem;
  border: 1px solid #ccc;
  padding: 3rem;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0);
  }

  100% {
    transform: translateX(calc(-100% + 3rem));
  }
}

@keyframes scroll-right {
  0% {
    transform: translateX(-50%);
  }

  100% {
    transform: translateX(calc(0 + 3rem));
  }
}
</style>
