<template>
  <div>
    <div class="container !py-4">
      <BreadCrumb :links="link" />
      <p
        class="mt-3 md:mt-5 font-bold text-left text-xl sm:text-2xl lg:text-[32px] leading-130"
      >
        {{ $t("news") }}
      </p>
      <div
        class="grid max-[500px]:grid-cols-1 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-5 mt-3 lg:mt-6 pb-4"
      >
        <CardNews
          v-for="item in cardData"
          :key="item.id"
          :data="item"
          :loading="loading"
        />
      </div>
      <div class="flex items-center justify-end pb-4" v-if="total > limit">
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
import { useNewsStore } from "~/store/news";
const { t: $t } = useI18n();
const newsStore = useNewsStore();
const currentPage = ref(1);
const limit = ref(12);
const offset = ref(0);

const link = [
  {
    title: $t("news"),
    url: "news",
  },
];

const loading = ref(true);
const cardData = computed(() => newsStore?.news);
const total = computed(() => newsStore?.newsCount);

function fetchNewsItem() {
  newsStore.news = [];
  newsStore.fetchNews(limit.value, offset.value);
}

onMounted(() => {
  offset.value = (currentPage.value - 1) * limit.value;
  newsStore.fetchNews(limit.value, offset.value);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

const onPageChange = (page: number) => {
  currentPage.value = page;
  offset.value = (page - 1) * limit.value;
  loading.value = true;
  fetchNewsItem();

  setTimeout(() => {
    loading.value = false;
  }, 500);
};

useHead({
  title: `${$t("news")} | Ona foundation`,
});
</script>
