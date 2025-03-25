<template>
  <SectionHead
    title="news"
    section-link="/news"
    section-title="all_articles"
    class="py-4 md:py-8"
  >
    <div class="container grid grid-cols-12 gap-2 md:gap-5">
      <div
        data-aos="fade-right"
        class="col-span-12 md:col-span-6 lg:col-span-7"
      >
        <CardHomeNewsLarge
          v-bind="{
            card: newsLarge,
            loading,
          }"
        />
      </div>
      <div
        class="flex flex-col gap-2 md:gap-4 col-span-12 md:col-span-6 lg:col-span-5 justify-between"
      >
        <CardHomeNewsSmall
          v-for="(card, index) in newsSmall"
          :key="index"
          v-bind="{ card, index, loading }"
        />
      </div>
    </div>
  </SectionHead>
</template>

<script setup lang="ts">
import type { TNews } from "~/types/news";
import { useNeedHelpStore } from "~/store/needHelp";
const { needLoading } = useNeedHelpStore();
interface Props {
  news: TNews[];
  loading: boolean;
}
const { news } = defineProps<Props>();
const newsLarge = news.slice(0, 1)[0];
const newsSmall = news.slice(1, 4);
</script>
