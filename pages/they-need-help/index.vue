<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAsyncData } from "#app";
import { useAboutStore } from "~/store/about";
import { useNeedHelpStore } from "~/store/needHelp";
import { useRoute } from "vue-router";

const { t: $t } = useI18n();
const aboutStore = useAboutStore();
const route = useRoute();

const link = [
  {
    title: $t("they_need_your_help"),
    url: "they-need-help",
  },
];

const helpStore = useNeedHelpStore();
const helpData = computed(() => useNeedHelpStore().statistic);
const single = computed(() => useNeedHelpStore().single);
const { data: members } = await useAsyncData(() => aboutStore.fetchMembers());

const modalState = ref(false);
const currentPage = ref(1);
const loading = ref(false);

const checkSingle = computed(() => {
  return !!route.query?.id;
});


const paginationData = reactive({
  offset: 0,
  limit: 4,
});

const changePage = (id: number) => {
  currentPage.value = id;
  paginationData.offset = paginationData.limit * (id - 1);
  helpStore.fetchStatistics(paginationData.limit, paginationData.offset);
};

const getList = () => {
  loading.value = true;

  if (!checkSingle.value) {
    helpStore.fetchStatistics(4).finally(() => loading.value = false);
  }else {
    helpStore.fetchSingleStatistic(Number(route.query?.id)).finally(() => loading.value = false);
  }

};

getList();

const getSingleList = (id: number) => {
  console.log(single.value, id);
  helpStore.fetchSingleStatistic(id)
  modalState.value = true;
};

const closeModal = (currentPage: number) => {
  modalState.value = false;
};

watch(() => route.query?.id, () => {
  getList();
}, { immediate: true });
</script>

<template>
  <div>
    <div class="container py-4 pb-12">
      <BreadCrumb :links="link" />

      <h1
        class="pt-5 pb-8 text-dark text-lg lg:text-[32px] leading-120 font-bold"
      >
        {{ $t("they_need_your_help") }}
      </h1>

      <div class="flex flex-col gap-5">

        <div v-if="!checkSingle" class="flex flex-col gap-5">
          <CommonBlockPreloader v-for="n in 4" :key="n" :loading="loading" height="450px" width="100%" />
        </div>

        <CardNeedHelpInside
          v-for="(element, index) in checkSingle ? [single] : helpData?.results"
          :key="index"
          :data="element"
          @show-modal="getSingleList"
        />
        <CommonModal
          :show="modalState"
          :max-width="true"
          :title="$t('donations')"
          @close="closeModal(currentPage)"
        >
          <CardNeedHelpCard :data="single" class="my-4" />
          <SectionMakeDonation />
        </CommonModal>
        <CommonPagination
          v-if="!checkSingle"
          @handle-page="changePage"
          :total="helpData?.count"
          :per-page="4"
          :max-page-show="4"
          class="mt-3 ml-auto"
        />
      </div>
    </div>
  </div>
</template>
<style scoped></style>
