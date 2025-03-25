<template>
  <div class="overflow-hidden main-page">
    <div class="relative">
      <LazySectionEntrance
        v-bind="{
          loading: entranceLoading,
          data: entrance,
        }"
      />
      <LazySectionProgram v-if="programs?.length > 0" v-bind="{ programs }" />
      <LazySectionDonation id="help" v-bind="{ statistics }" />
    </div>
    <div v-if="false">
      <CardNeedHelp :data="helpData" />
    </div>
    <LazySectionBecomeFriend />
    <LazySectionNews
      v-if="news?.length > 0"
      v-bind="{ news, loading: newsLoading }"
    />
    <LazySectionHelp v-if="list" v-bind="{ list }" />
    <!--    <SectionEvents v-if="events?.length > 0" v-bind="{ events }" />-->
    <ClientOnly>
      <LazySectionPartners
          v-if="partners?.length > 0"
          v-bind="{ partners }"
          class="relative z-1"
      />
    </ClientOnly>
    <LazySectionFAQNew v-if="faq?.length > 0" v-bind="{ faq }" />
    <LazySectionGallery
      v-bind="{ gallery, loading: galleryLoading }"
      class="relative z-2"
    />
    <LazyMapPartner />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { usePartnersStore } from "~/store/partners";
import { useAsyncData } from "#app";
import { useEventsStore } from "~/store/events";
import { useNewsStore } from "~/store/news";
import { useHomeStore } from "~/store/home";
import { useHelpStore } from "~/store/help";
import { useNeedHelpStore } from "~/store/needHelp";
import { useProgramsStore } from "~/store/programs";
const helpStore = useNeedHelpStore();
const helpData = computed(() => {
  if (!useNeedHelpStore().statistic) return;
  return useNeedHelpStore().statistic;
});

const { t: $t } = useI18n();
const homeStore = useHomeStore();
const { galleryLoading } = useHomeStore();
const { entranceLoading } = useHomeStore();
// const { data: partners } = useAsyncData(() => usePartnersStore().fetchPartners(100));
// const { data: events } = useAsyncData(() => useEventsStore().fetchHomeEvents());
// const { data: news } = useAsyncData(() => useNewsStore().fetchHomeNews());
// const { data: gallery } = useAsyncData(() => useHomeStore().fetchGallery(30));
// const { data: programs } = useAsyncData(() => useProgramsStore().fetchHomePrograms(4));

// const { data: list } = useAsyncData(() => useHomeStore().fetchHelpList());
// const { data: faq } = useAsyncData(() => useHelpStore().fetchHomeFaq());
// const { data: statistics } = useAsyncData(() => useHomeStore().fetchStatistics())
// const { data: entrance } = useAsyncData(() => homeStore.fetchEntrance());

const partners = await usePartnersStore().fetchPartners(100)
const events = await useEventsStore().fetchHomeEvents()
const news = await useNewsStore().fetchHomeNews()
const gallery = await useHomeStore().fetchGallery(30)
const programs = await useProgramsStore().fetchHomePrograms(4)
const list = await useHomeStore().fetchHelpList()
const faq = await useHelpStore().fetchHomeFaq()
const statistics = await useHomeStore().fetchStatistics()
const entrance = await homeStore.fetchEntrance()

helpStore.fetchStatistics(4)

useHead({
  title: `${$t("home")} | Ona foundation`,
});
</script>

<style lang="css">
.main-page {
  background-image: url("/images/full-bg.webp");
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: top;
  background-size: cover;
  z-index: 0;
}
</style>
