<script setup lang="ts">
import type { TNeedHelpTypes } from "~/types/common";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();
interface Props {
  data: TNeedHelpTypes;
}

defineProps<Props>();
const emit = defineEmits<{
  (event: "showModal", id: number): void;
}>();
const activeTab = ref("main-info");

const list = ref([
  {
    id: 0,
    label: $t("main_info"),
    value: "main-info",
  },
  {
    id: 1,
    label: $t("additional_info"),
    value: "additional-info",
  },
]);
</script>

<template>
  <div class="container">
    <div class="bg-white grid lg:grid-cols-3 shadow-headMember rounded-2xl">
      <div
        class="p-4 lg:p-6 flex-col sm:flex sm:flex-row items-center lg:items-start lg:flex-col gap-5 pb-10 lg:col-span-1 border-b lg:border-r border-grey-200"
      >
        <div
          class="flex w-full sm:w-[144px] sm:h-[144px] items-center relative justify-center"
        >
          <img
            v-if="data?.profile_photo?.file.length"
            class="block w-full h-full rounded-xl object-cover"
            :src="data?.profile_photo?.file"
            alt="profile photo"
          />
          <img
            v-else
            class="block w-full h-full rounded-xl object-cover"
            src="/images/default-image.webp"
            alt="profile photo"
          />
          <img
            class="w-full max-w-[54px] absolute left-4 bottom-4"
            src="/images/footer-logo.svg"
            alt="Logo"
          />
        </div>
        <div>
          <h4
            class="text-2xl mt-4 sm:mt-0 lg:mt-5 pb-2 relative after:absolute after:w-[10%] after:left-0 after:h-[1px] after:bg-grey-200 after:bottom-0 text-dark font-semibold leading-130 mb-2"
          >
            {{ data?.full_name }}
          </h4>
          <span
            class="text-dark-light w-full max-w-[333px] text-sm text-left font-450 mb-5 leading-130 line-clamp-2"
            >{{ data?.short_description }}</span
          >

          <Button
            variant="transparent"
            @click="emit('showModal', data.id)"
            class="backdrop-blur group !bg-red-100 transition-300 hover:!bg-red/70 !text-sm gap-1 w-full block mt-2 max-w-[150px]"
            text-class="!font-semibold !text-white !text-sm"
          >
            <i class="icon-heart text-base text-white mr-2"></i>
            {{ $t("donations") }}
          </Button>
        </div>
      </div>
      <div
        class="flex flex-col lg:col-span-2 items-start p-4 lg:px-6 lg:pt-4 lg:pb-10"
      >
        <CommonTabGroup
          main-class="border-b !flex-row !p-0 border-grey-200 !rounded-none !shadow-none !pb-0"
          active-class="!bg-transparent !font-semibold border-b-2 border-blue !rounded-none !shadow-none"
          item-class="!text-dark !max-w-max rounded-none"
          custome-class="!border-b-2 !bg-transparent !border-blue"
          v-model="activeTab"
          :list="list"
        />
        <template v-if="activeTab === 'main-info'">
          <div
            v-if="
              data?.constant_region ||
              (data?.constant_district &&
                data?.additional_info &&
                data?.short_description)
            "
          >
            <div
              v-if="data?.constant_region || data?.constant_district"
              class="mt-6 w-full pb-5 border-b border-grey-200"
            >
              <h3 class="text-dark text-lg mb-4 leading-130 font-bold">
                {{ $t("main_address") }}
              </h3>
              <div class="grid w-full grid-cols-2">
                <div v-if="data?.constant_region" class="flex flex-col gap-1">
                  <span class="text-grey-100 text-xs font-normal">{{
                    $t("region")
                  }}</span>
                  <p class="text-dark text-sm font-medium">
                    {{ data?.constant_region }}
                  </p>
                </div>
                <div v-if="data?.constant_district" class="flex flex-col gap-1">
                  <span class="text-grey-100 text-xs font-normal">{{
                    $t("city")
                  }}</span>
                  <p class="text-dark text-sm font-medium">
                    {{ data?.constant_district }}
                  </p>
                </div>
              </div>
            </div>
            <div v-if="data?.additional_info" class="mt-5">
              <h3 class="text-dark text-lg leading-130 font-bold">
                {{ $t("additional_info") }}
              </h3>
              <div class="mt-4">
                <span class="text-grey-100 text-xs font-normal">{{
                  $t("additional_info")
                }}</span>
                <p class="text-dark text-sm font-medium">
                  {{ data?.short_description }}
                </p>
              </div>
            </div>
          </div>
          <div v-else>
            <h3 class="text-dark text-lg mt-4 leading-130 font-bold">
              {{ $t("no_main_address") }}
            </h3>
          </div>
        </template>
        <template v-else>
          <div>
            <div v-if="data?.additional_info" class="mt-6">
              <h3 class="text-dark text-lg leading-130 font-bold">
                {{ $t("additional_info") }}
              </h3>
              <div class="mt-4">
                <span class="text-grey-100 text-xs font-normal">{{
                  $t("additional_info")
                }}</span>
                <p class="text-dark text-sm font-medium">
                  {{ data?.additional_info }}
                </p>
              </div>
            </div>
            <div class="mt-4" v-else>
              <h3 class="text-dark text-lg leading-130 font-bold">
                {{ $t("no_additional_address") }}
              </h3>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
