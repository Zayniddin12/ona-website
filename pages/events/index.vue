<template>
  <div>
    <div class="container !py-4">
      <BreadCrumb :links="link" />
      <p
        class="mt-3 md:mt-9 font-medium text-left text-2xl md:text-[40px] leading-130"
      >
        {{ $t("events") }}
      </p>
      <div
        class="grid max-sm:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 py-6"
      >
        <CardEvent
          v-for="item in eventState"
          :key="item?.id"
          :data="item"
          :loading="loading"
        />
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
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useEventsStore } from "~/store/events";
const eventsStore = useEventsStore();
const total = computed(() => eventsStore.count);
const limit = ref(12);
const offset = ref(0);

const currentPage = ref(1);

const { t: $t } = useI18n();

const link = [
  {
    title: $t("events"),
    url: "events",
  },
];

const loading = ref(true);

function fetchEventsItem() {
  eventsStore.events = [];
  eventsStore.fetchEvents(limit.value, offset.value);
}

onMounted(() => {
  eventsStore.fetchEvents(limit.value, offset.value);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});
const eventState = computed(() => eventsStore?.events);

const onPageChange = (page: number) => {
  currentPage.value = page;
  offset.value = (page - 1) * limit.value;
  loading.value = true;
  fetchEventsItem();

  setTimeout(() => {
    loading.value = false;
  }, 500);
};

useHead({
  title: `${$t("events")} | Ona foundation`,
});
</script>
