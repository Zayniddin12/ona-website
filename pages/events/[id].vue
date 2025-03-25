<template>
  <div>
    <ClientOnly>
      <div class="container !py-4">
        <BreadCrumb :links="link" />
        <div
          class="flex items-start justify-between flex-col lg:flex-row gap-x-5 mt-6"
        >
          <div class="w-full">
            <p
              class="text-2xl md:text-[32px] font-medium leading-130 text-dark"
            >
              {{ singleData?.title }}
            </p>
            <div class="flex items-center gap-x-8 my-4">
              <div class="text-grey-100 flex items-center gap-x-1">
                <i class="icon-calendar inline-block text-base"></i>
                <p class="text-base">
                  {{
                    translateDate(
                      singleData?.published_at,
                      "DD MMMM YYYY",
                      $i18n.locale
                    )
                  }}
                </p>
              </div>
              <div class="text-grey-100 flex items-center gap-x-1">
                <i class="icon-eye inline-block text-base"></i>
                <p class="text-base">{{ singleData?.view_count }}</p>
              </div>
            </div>
            <div
              class="rounded-2xl overflow-hidden relative w-full h-[372px] mb-6"
            >
              <img
                :src="singleData?.thumbnail"
                alt="single"
                class="absolute top-0 left-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div class="vhtml-text" v-html="singleData?.content"></div>
            <div
              class="flex items-center max-sm:!items-start max-sm:flex-col max-sm:gap-5 justify-between py-7"
            >
              <CommonShareButtons :title="singleData?.title" />
              <CommonCopyUrl />
            </div>
          </div>
          <div class="w-full lg:w-[281px]">
            <p
              class="font-medium text-[24px] leading-130 w-full md:max-w-[250px] mb-4"
            >
              {{ $t("events_side") }}
            </p>
            <div
              class="w-full rounded-xl bg-blue flex items-center lg:justify-between justify-evenly !gap-x-2 md:gap-x-10 py-2 !px-3 md:px-[30px] text-white mb-6"
            >
              <div class="text-center">
                <p class="font-medium text-[26px] leading-130 px-4">
                  {{
                    translateDate(
                      singleData?.published_at,
                      "MMMM",
                      $i18n.locale
                    )
                  }}
                </p>
                <p class="font-medium text-[26px] leading-130">
                  {{ dayjs(singleData?.published_at).format("DD") }} -
                  {{ dayjs(singleData?.end_date).format("DD") }}
                </p>
              </div>
              <div class="w-[1px] h-[87px] bg-white"></div>
              <div class="text-center">
                <span><i class="icon-clock text-3xl"></i></span>
                <p class="font-medium text-[26px] leading-130">
                  {{ formatDate(singleData?.published_at).hours }}:{{
                    formatDate(singleData?.published_at).minutes
                  }}
                </p>
              </div>
            </div>
            <p class="font-medium text-[24px] leading-130 max-w-[250px] mb-4">
              {{ $t("other_events") }}
            </p>
            <div
              class="w-full rounded-xl bg-white border border-grey-300 shadow-form overflow-hidden"
            >
              <NuxtLink
                v-for="item in eventsRecommendData.slice(0, 6)"
                :key="item.id"
                :to="`/events/${item?.slug}`"
                class="event-link group"
              >
                <div
                  class="event-name w-full py-4 px-5 border-t border-grey-300 group-hover:bg-blue group-hover:text-white transition-200"
                >
                  <p class="text-base font-medium leading-130">
                    {{ item.title }}
                  </p>
                </div>
              </NuxtLink>
            </div>
          </div>
        </div>
        <div
          v-if="eventsRecommendLoading || eventsRecommendData.length"
          class="border-t border-grey-200 pt-6 md:mt-0 mt-6"
        >
          <div class="flex items-end justify-between">
            <p
              class="text-dark text-2xl md:text-[40px] leading-130 font-medium"
            >
              {{ $t("similar_events") }}
            </p>
            <div class="flex items-center gap-x-3">
              <button
                class="swiper-event-prev w-10 h-10 rounded-lg bg-grey-400 border border-grey-300 flex items-center justify-center hover:bg-blue transition-200 group"
              >
                <i
                  class="icon-arrow-right-square text-2xl leading-6 rotate-180 inline-block text-grey-100 group-hover:text-white transition-200"
                ></i>
              </button>
              <button
                class="swiper-event-next w-10 h-10 rounded-lg bg-grey-400 border border-grey-300 flex items-center justify-center hover:bg-blue transition-200 group"
              >
                <i
                  class="icon-arrow-right-square text-2xl leading-6 inline-block text-grey-100 group-hover:text-white transition-200"
                ></i>
              </button>
            </div>
          </div>
          <div class="pt-[30px] pb-[57px]">
            <SwiperEventSwiper
              :data="eventsRecommendData"
              :loading="eventsRecommendLoading"
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ref } from "vue";
import type { TEvent, TEventsSingle } from "~/types/events";
import dayjs from "dayjs";
import { useAsyncData } from "#app";
import { useEventsStore } from "~/store/events";
import type { ICommonDataResponse } from "~/types/common";

const { t } = useI18n();
const route = useRoute();
const link = computed(() => [
  {
    title: t("events"),
    url: "events",
  },
  {
    title: singleData.value?.title,
    url: `events/${route.params.id}`,
  },
]);
const eventsRecommendData = ref<TEvent[]>([]);
const eventsRecommendLoading = ref(true);

function fetchEventRec() {
  eventsRecommendLoading.value = true;
  useApi()
    .$get(`v1/catalog/Events/${route.params.id}/Similar/`, {
      params: {
        limit: 8,
      },
    })
    .then((res: ICommonDataResponse<TEvent>) => {
      eventsRecommendData.value = res.results;
    })
    .finally(() => {
      eventsRecommendLoading.value = false;
    });
}

function formatDate(start: string) {
  const startDate = new Date(start);

  const dateItem = {
    start: startDate.getDate(),
    hours: startDate.getHours(),
    minutes: startDate.getMinutes(),
  };
  return dateItem;
}
const { data: singleData } = await useAsyncData<TEventsSingle>(() =>
  useEventsStore().fetchEventsSingle(route.params.id.toString() ?? "")
);

fetchEventRec();

useSeoMeta({
  title: () => `${t("events")} | ${singleData.value?.title}`,
  ogImage: () => singleData.value?.thumbnail,
  ogDescription: () => singleData.value?.short_description,
});
</script>

<style>
.event-link:nth-child(1) .event-name {
  border-top: none;
}

.vhtml-text p {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #1c1f20;
  word-break: break-word;
}

.vhtml-text hr {
  display: inline-block;
  width: 100%;
  margin: 12px 0;
}

.vhtml-text h3 {
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  color: #1c1f20;
  margin-bottom: 12px;
}

.vhtml-text iframe {
  border-radius: 16px;
  margin: 12px 0;
}
</style>
