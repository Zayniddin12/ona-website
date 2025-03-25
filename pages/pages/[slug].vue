<template>
  <div>
    <div class="container !py-4">
      <BreadCrumb :links="breadcrumb" />

      <div class="mt-6 md:mt-9 max-w-[781px] justify-center mx-auto mb-[70px]">
        <p class="text-dark font-medium text-2xl md:text-[40px] leading-130 mb-4">
          {{ single?.title }}
        </p>
        <div v-html="single?.body"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

interface IStaticPage {
  id: number;
  title: string;
  slug: string;
  body: string;
}

const $route = useRoute();

const { t: $t } = useI18n();
const single = computed(() => data.value);

const { data } = await useAsyncData(() =>
  useApi()
    .$get<IStaticPage>(`v1/catalog/StaticPages/${$route.params.slug}`)
    .catch(() => {
      showError({
        statusCode: 404,
      });
    })
);
useMetaTags({
  title: data.value?.title,
  description: data.value?.body
    .replace(/<\/?[^>]+(>|$)/gi, "")
    .substring(0, 120),
});

const breadcrumb =  [
  {
    title: data.value?.title,
  },
]
</script>
