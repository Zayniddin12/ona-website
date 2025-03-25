<template>
  <div>
    <div class="container !py-4">
      <BreadCrumb :links="link" />
      <div class="max-w-[782px] mt-6 mx-auto mb-4 md:mb-8">
        <h2
          class="text-xl sm:text-2xl md:text-[32px] font-bold leading-130 text-dark"
        >
          {{ singleData?.title }}
        </h2>
        <!--        <div class="flex items-center gap-x-8 my-4">-->
        <!--          <div class="text-grey-100 flex items-center gap-x-1">-->
        <!--            <i class="icon-calendar inline-block text-base"></i>-->
        <!--            <p class="text-base">-->
        <!--              {{-->
        <!--                translateDate(-->
        <!--                  singleData?.published_at,-->
        <!--                  "DD MMMM YYYY",-->
        <!--                  $i18n.locale-->
        <!--                )-->
        <!--              }}-->
        <!--            </p>-->
        <!--          </div>-->
        <!--          <div class="text-grey-100 flex items-center gap-x-1">-->
        <!--            <i class="icon-eye inline-block text-base"></i>-->
        <!--            <p class="text-base">{{ singleData?.view_count }}</p>-->
        <!--          </div>-->
        <!--        </div>-->
        <div
          class="rounded-2xl overflow-hidden relative w-full h-[273px] md:h-[372px] mb-3 md:mb-6 mt-3 md:mt-[18px]"
        >
          <img
            :src="singleData?.image"
            alt="single"
            class="absolute top-0 left-0 w-full h-full object-cover object-left"
          />
        </div>
        <div class="vhtml-text" v-html="singleData?.content"></div>
        <div
          class="flex items-center flex-row max-[441px]:items-start max-[441px]:flex-col justify-between gap-5 mt-6"
        >
          <ShareButtons :title="singleData?.title" />
          <CommonCopyUrl />
        </div>
      </div>
      <div
        class="border-t border-grey-200 pt-4 md:pt-6"
        v-if="singleData?.similar_news"
      >
        <div class="flex items-end justify-between">
          <p class="text-dark text-2xl md:text-[40px] leading-130 font-medium">
            {{ $t("similar_news") }}
          </p>
          <div class="flex items-center gap-x-3">
            <client-only>
              <button
                class="swiper-video-prev w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-grey-400 border border-grey-300 flex items-center justify-center hover:bg-blue transition-200 group"
              >
                <i
                  class="icon-arrow-right-square text-xl sm:text-2xl leading-5 sm:leading-6 rotate-180 inline-block text-grey-100 group-hover:text-white transition-200"
                />
              </button>
            </client-only>
            <client-only>
              <button
                class="swiper-video-next w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-grey-400 border border-grey-300 flex items-center justify-center hover:bg-blue transition-200 group"
              >
                <i
                  class="icon-arrow-right-square text-xl sm:text-2xl leading-5 sm:leading-6 inline-block text-grey-100 group-hover:text-white transition-200"
                />
              </button>
            </client-only>
          </div>
        </div>
        <ClientOnly>
          <div class="py-6 sm:pt-[30px] sm:pb-[57px]">
            <ClientOnly>
              <NewsSwiper :data="singleData?.similar_news" :loading="loading" />
            </ClientOnly>
          </div>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute } from "vue-router";
import ShareButtons from "~/components/Common/ShareButtons.vue";
import NewsSwiper from "~/components/Swiper/NewsSwiper.vue";
import { ref } from "vue";
import { useNewsStore } from "~/store/news";
import { useAsyncData } from "#app";
import type { TNews } from "~/types/news";

const { t } = useI18n();
const route = useRoute();

const loading = ref(true);

const newsStore = useNewsStore();

const singleData = ref([]);

function fetchNewsSingle(): Promise<TNews> {
  return new Promise((resolve, reject) => {
    useApi()
      .$get<TNews>(`v1/catalog/NewsDetailSimilar/${route.params.id}`)
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

const data = await useAsyncData(() => fetchNewsSingle());
singleData.value = data.data.value;

useSeoMeta({
  ogImage: () => data.data.value?.image,
  title: () => `${t("news")} | ${data.data.value?.title}`,
  ogTitle: () => `${t("news")} | ${data.data.value?.title}`,
  description: () => `${t("news")} | ${data.data.value?.short_description}`,
  ogDescription: () => `${t("news")} | ${data.data.value?.short_description}`,
});

const link = [
  {
    title: t("news"),
    url: "news",
  },
  {
    title: `${data.data.value?.title}`,
    url: `news/${route.params.slug}`,
  },
];

const isMounted = ref(false);

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    isMounted.value = true;
  }, 1000);
});
</script>

<style>
.vhtml-text {
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #1c1f20;
  word-break: break-word;
}

.vhtml-text h3 {
  font-weight: 600;
  font-size: 20px;
  line-height: 130%;
  color: #1c1f20;
  margin-bottom: 12px;
}

.vhtml-text div {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
  margin-bottom: 50px;
}

.vhtml-text div img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 253/180;
}

@media screen and (max-width: 500px) {
  .vhtml-text div {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

.vhtml-text blockquote {
  margin: 20px 0;
  padding: 20px;
  position: relative;
  background: #fff8f0;
  border-radius: 16px;
  position: relative;
}

.vhtml-text blockquote p {
  margin-top: 0;
  padding-top: 0;
  padding-bottom: 8px;
}

.vhtml-text blockquote p,
.vhtml-text blockquote {
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  color: #1c1f20;
  font-style: italic;
}

.vhtml-text blockquote svg {
  position: absolute;
  bottom: 0;
  right: 0;
}

.vhtml-text p {
  font-weight: 400;
  font-size: 16px;
  line-height: 140%;
  color: #1c1f20;
}

.vhtml-text p iframe {
  width: 100%;
  margin: 16px 0;
}
</style>
