<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useEventsStore } from "~/store/events";
const eventsStore = useEventsStore();

const { data: data } = await useAsyncData(() => eventsStore.fetchReportAudit());

const loading = ref(false);
const total = computed(() => eventsStore.count);
const limit = ref(12);
const offset = ref(0);

const currentPage = ref(1);

const { t: $t } = useI18n();
const link = [
  {
    title: $t("report_audit"),
    url: "report-audit",
  },
];

function fetchEventsItem() {
  eventsStore.events = [];
  eventsStore.fetchEvents(limit.value, offset.value);
}

const onPageChange = (page: number) => {
  currentPage.value = page;
  offset.value = (page - 1) * limit.value;
  loading.value = true;
  fetchEventsItem();

  setTimeout(() => {
    loading.value = false;
  }, 500);
};
</script>

<template>
  <div>
    <div class="container lg:px-0 !py-4">
      <BreadCrumb :links="link" />
      <h1 class="py-5 text-dark text-lg lg:text-[32px] leading-120 font-bold">
        {{ $t("report_audit") }}
      </h1>
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-5">
        <div class="w-full max-w-full lg:col-span-3">
          <div class="gap-5">
            <template v-if="data.length">
              <template v-for="(card, idx) in data" :key="idx">
                <CardReportAudit :loading="loading" :data="card" />
              </template>
            </template>
            <p v-else class="text-red">{{ $t("no_data") }}</p>
          </div>
          <div class="flex items-center justify-end pb-6" v-if="total > limit">
            <CommonPagination
              :total="total"
              :max-page-show="4"
              :per-page="limit"
              @handle-page="onPageChange"
            />
          </div>
        </div>
        <div
          class="lg:col-span-1 bg-white w-full border-2 xl:pt-28 border-white overflow-x-hidden relative flex flex-col gap-6 items-center justify-between p-6 rounded-2xl"
        >
          <img
            class="max-w-[160px] mr-auto xl:absolute left-0 top-[-11px] shrink-0 object-cover"
            src="/images/arrived.webp"
            alt="We arrived"
          />
          <div class="max-w-full">
            <div class="flex items-center relative">
              <i18n-t
                keypath="to_be"
                tag="p"
                class="text-dark flex flex-col font-bold text-2xl lg:text-[28px] leading-130"
              >
                <template #text>
                  <span
                    class="text-white z-10 bg-blue px-1 rounded-lg font-bold leading-130"
                  >
                    {{ $t("be_partner") }}
                  </span>
                </template>
              </i18n-t>
              <svg
                class="absolute top-[10px] z-0 hidden xl:flex right-0 translate-x-[40%]"
                xmlns="http://www.w3.org/2000/svg"
                width="106"
                height="204"
                viewBox="0 0 106 204"
                fill="none"
              >
                <path
                  d="M3.00006 49C103.5 4.49996 122.18 -3.37546 136.5 29.5001C155.487 58.3127 58.3484 126.138 57 86.5C55.6506 46.862 172.862 20.6326 128.5 115C108.33 157.906 86.8448 170.121 76.5099 187.658"
                  stroke="#30A1DB"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-dasharray="10 10"
                />
                <path
                  d="M75.5145 189.348L73.6514 177.187"
                  stroke="#30A1DB"
                  stroke-width="3"
                  stroke-linecap="round"
                />
                <path
                  d="M75.5151 189.348L86.0307 186.827"
                  stroke="#30A1DB"
                  stroke-width="3"
                  stroke-linecap="round"
                />
              </svg>
            </div>

            <p class="mt-6 text-dark-light text-sm font-450 leading-140">
              {{ $t("our_friend_info") }}
            </p>
          </div>
          <div class="w-full">
            <NuxtLink
              class="max-w-[233px] bg-white/[.62] w-full rounded-[10px] flex border border-[rgba(96, 98, 99, 0.40)]"
              to="/help"
            >
              <Button
                variant="transparent"
                class="backdrop-blur w-full group transition-300 hover:!bg-white !text-sm !bg-white/[.80] gap-1"
                text-class="!font-semibold !text-dark !text-sm"
              >
                {{ $t("more") }}
                <i
                  class="icon-chevron-right text-red flex items-center transition-300 justify-center w-5 h-5 group-hover:translate-x-[3px]"
                ></i>
              </Button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
