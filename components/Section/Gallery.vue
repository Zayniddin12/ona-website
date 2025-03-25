<template>
  <div>
    <CommonBlockPreloader v-bind="{ loading }" height="400px" width="100%" />
    <div v-if="!loading">
      <div v-if="gallery?.length > 0" ref="galleryHolder" class="py-4 md:py-8">
        <Vue3Marquee :duration="700" :pause="!isGalleryHolderVisible" :clone="true" :pause-on-hover="true">
          <CardGallery v-for="(item, index) in gallery" :key="index" v-bind="{ item }" />
        </Vue3Marquee>

        <Vue3Marquee direction="reverse" :pause="!isGalleryHolderVisible" :clone="true" :duration="700" :pause-on-hover="true">
          <CardGallery v-for="(item, index) in galleryReversed" :key="index" v-bind="{ item }" />
        </Vue3Marquee>

        <Vue3Marquee :duration="700" :pause="!isGalleryHolderVisible" :clone="true" :pause-on-hover="true">
          <CardGallery v-for="(item, index) in gallery" :key="index" v-bind="{ item }" />
        </Vue3Marquee>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { Vue3Marquee } from "vue3-marquee"
import type { TGallery } from "~/types/common"
import {useIntersectionObserver} from "@vueuse/core";

interface Props {
  gallery: TGallery[];
  loading?: boolean;
}
const props = defineProps<Props>()

const galleryHolder = ref()
const isGalleryHolderVisible = ref(false)

const galleryReversed = JSON.parse(JSON.stringify(props.gallery)).reverse()

onMounted(() => {
  if (galleryHolder.value) {
    useIntersectionObserver(galleryHolder.value, ([{ isIntersecting }], observerElement) => {
      isGalleryHolderVisible.value = isIntersecting
    })
  }
})

</script>

<style>
.marquee {
  gap: 0 !important;
  /*overflow: auto !important;*/
}

.vue3-marquee {
  //overflow: auto !important;
}
.vue3-marquee.horizontal {
  overflow-x: initial !important;
}
.marquee:hover {
  z-index: 99 !important;
}
</style>
