<script setup lang="ts">
import BlockPreloader from "~/components/Common/BlockPreloader.vue";
import type { TReportAudit } from "~/types/common";
import dayjs from "dayjs";

interface Props {
  data?: TReportAudit;
  loading?: boolean;
}

const props = defineProps<Props>();

const getFileName = (url: string) => {
  if(!url.length && url === "") return "";
  return url.split("/reports/")[1].split('.')[0];
};
</script>

<template>
<div
  class="bg-white border group border-grey-200 rounded-2xl transition-300 hover:cursor-pointer hover:border-[#BAD5EA] hover:shadow-reportCard">
  <div
      v-if="loading"
      class="flex flex-col gap-6"
  >
    <div class="p-6">
      <BlockPreloader
          :loading="loading"
          width="100%"
          height="26px"
          margin="12px 0"
          border-radius="4px"
      ></BlockPreloader>
      <BlockPreloader
          :loading="loading"
          width="100%"
          height="26px"
          margin="12px 0"
          border-radius="4px"
      ></BlockPreloader>
    </div>
    <div class="flex items-center justify-between px-6">
     <div class="flex-y-center gap-8 w-full">
       <BlockPreloader
           :loading="loading"
           width="20%"
           height="26px"
           margin="12px 0"
           border-radius="4px"
       ></BlockPreloader>
       <BlockPreloader
           :loading="loading"
           width="20%"
           height="26px"
           margin="12px 0"
           border-radius="4px"
       ></BlockPreloader>
     </div>
      <BlockPreloader
          :loading="loading"
          width="60%"
          height="26px"
          margin="12px 0"
          border-radius="4px"
      ></BlockPreloader>
    </div>
  </div>
  <div class="p-6 pr-[18px]">
    <h4 class="text-dark-200 text-xl font-bold leading-130 uppercase mb-1.5">{{data?.title}}</h4>
    <p class="text-[#838995] text-sm font-450 leading-130 line-clamp-2">{{data?.description}}</p>
  </div>
  <div class="px-2 py-3 md:py-4 md:pl-6 flex items-center flex-col space-y-1 md:space-y-0 md:flex-row justify-between md:pr-5 border-t border-grey-600">
    <div class="flex-y-center gap-8">
      <div class="flex-y-center gap-2">
        <span class="flex items-center justify-center w-7 h-7 rounded-lg p-1 shadow-iconDoc">
        <i class="flex-y-center justify-center icon-document-text text-grey-100 w-5 h-5"></i>
      </span>
        <strong class="text-dark-light text-sm font-semibold leading-130">{{ getFileName(data?.file) }}</strong>
      </div>
      <div class="flex-y-center gap-2">
        <span class="flex items-center justify-center w-7 h-7 rounded-lg p-1 shadow-iconDoc">
        <i class="flex-y-center justify-center icon-document-text text-grey-100 w-5 h-5"></i>
      </span>
        <strong class="text-dark-light text-sm font-semibold leading-130">{{dayjs(data?.date).format("DD.MM.YYYY") }}</strong>
      </div>
    </div>
    <nuxt-link target="_blank" :to="data?.file" class="flex-y-center gap-2">
      <span class="text-blue transition-300 opacity-0 group-hover:opacity-100 text-sm font-semibold leading-130">{{$t('download')}}</span>
      <i class="icon-download flex items-center justify-center transition-300 group-hover:text-blue text-grey-100 w-6 h-6"></i>
    </nuxt-link>
  </div>
</div>
</template>

<style scoped>

</style>