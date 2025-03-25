<template>
  <div class="pb-10">
    <div class="container !py-4">
      <BreadCrumb :links="link" />
      <div
        class="flex flex-col lg:flex-row items-start justify-between gap-x-5 mt-9"
      >
        <div class="w-full">
          <p
            class="text-dark font-semibold text-3xl lg:text-[40px] max-sm:text-2xl leading-130 mb-6 max-sm:mb-3"
          >
            {{ singleData?.title }}
          </p>
          <div class="w-full">
            <img
              :src="singleData?.image"
              class="w-full h-full object-cover rounded-2xl mb-6 aspect-[883/278]"
              alt="cover"
              loading="lazy"
            />
            <p class="!text-base leading-130 text-black mb-4">
              {{ singleData?.short_description }}
            </p>
            <ClientOnly>
              <p
                class="text-base text-[000] leading-130"
                style="font-weight: 400"
                v-if="singleData?.description"
                v-html="singleData?.description"
              ></p>
            </ClientOnly>
          </div>

          <!--          <p class="text-xl text-dark font-semibold">Программа по поддержке здоровья граждан</p>-->
          <!--          <p><span><i class="icon-play text-blue"></i></span> соблюдение прав человека в области охраны здоровья</p>-->
          <!--          <p><span><i class="icon-play text-blue"></i></span> соблюдение прав человека в области охраны здоровья</p>-->
          <!--          <p><span><i class="icon-play text-blue"></i></span> соблюдение прав человека в области охраны здоровья</p>-->
          <!--          <p><span><i class="icon-play text-blue"></i></span> соблюдение прав человека в области охраны здоровья</p>-->
          <!--          <p><span><i class="icon-play text-blue"></i></span> соблюдение прав человека в области охраны здоровья</p>-->
          <!--          <p>Программа по поддержке здоровья граждан</p>-->
          <!--          <p>соблюдение прав человека в области охраны здоровья;</p>-->
          <!--          <p>доступность медицинской помощи для всех слоев населения;</p>-->
          <!--          <p>приоритет профилактических мер;</p>-->
          <!--          <p>социальная защищенность граждан в случае утраты здоровья;</p>-->
          <!--          <p>единство медицинской науки и практики.</p>-->
        </div>
        <div class="pt-4">
          <p class="text-dark leading-130 text-2xl font-semibold mb-5">
            {{ $t("other_programs") }}
          </p>
          <div
            class="flex items-center grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-col max-sm:justify-center mx-auto gap-4"
          >
            <CardProgram
              v-for="item in cardData.slice(0, 4)"
              :data="item"
              :icon-top="true"
              :loading="loading"
              :card-style="' !w-full lg:!w-[281px] !h-[140px]'"
              :content-style="'!min-h-[72px]'"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import { ref } from "vue";
import { useProgramsStore } from "~/store/programs";
import { useAsyncData } from "#app";
import type { TPrograms } from "~/types/programs";

const { t } = useI18n();
const route = useRoute();

const programsStore = useProgramsStore();

const loading = ref(true);
const singleData = ref<TPrograms | null>();

// function fetchNewsSingle(){
//   useApi().$get(`catalog/OurPrograms/${route.params.id}/`).then((res) =>{
//     loading.value = false
//     singleData.value = res
//   }).catch((err) =>{
//     if(err.status === 404){
//       showError({
//         statusCode:404
//       })
//     }
//   })
// }

function fetchProgramsSingle(): Promise<TPrograms> {
  return new Promise((resolve, reject) => {
    useApi()
      .$get<TPrograms>(`v1/catalog/OurPrograms/${route.params.id}/`)
      .then((res) => {
        loading.value = false;
        resolve(res);
      })
      .catch((err) => {
        reject(err);
        if (err.status === 404) {
          showError({
            statusCode: 404,
          });
        }
      });
  });
}

const { data } = await useAsyncData(
  "fetchProgram",
  async () => await fetchProgramsSingle()
);
singleData.value = data.value;
useSeoMeta({
  title: () => `${t("programs")} | ${data.value?.title}`,
  ogImage: () => data.value?.image,
  ogDescription: () => data.value?.description?.replace(/<\/?[^>]+(>|$)/g, ""),
});

const link = [
  {
    title: t("programs"),
    url: "programs",
  },
  {
    title: `${singleData.value?.title}`,
    url: `programs/${route.params.id}`,
  },
];

onMounted(() => {
  programsStore.fetchPrograms();

  setTimeout(() => {
    loading.value = false;
  }, 600);
});

const cardData = computed(() => programsStore?.programs);
</script>
