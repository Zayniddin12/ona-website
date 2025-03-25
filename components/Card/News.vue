<template>
  <NuxtLink :to="{ name: 'news-id', params: { id: data?.slug } }" class="group">
    <div class="w-full h-full">
      <div
        class="w-full h-full rounded-2xl border border-grey-200 p-3 transition-300"
      >
        <div
          class="w-full rounded-t-lg rounded-b-[2px] !bg-gray relative overflow-hidden"
        >
          <BlockPreloader :loading="loading" height="206px" width="100%">
            <img
              class="w-full h-full object-cover group-hover:scale-[1.1] transition-300 aspect-[4/3]"
              :src="data?.image"
              alt="cover"
            />
          </BlockPreloader>
          <BlockPreloader
            :loading="loading"
            height="24px"
            width="106px"
            preloader-class="absolute"
          >
            <div
              class="py-1 px-2 rounded-[20px] border border-white/10 absolute bottom-2 left-2 bg-dark/70 backdrop-blur-[4px] text-white text-xs leading-130"
            >
              {{
                translateDate(data?.published_at, "DD MMMM YYYY", $i18n.locale)
              }}
            </div>
          </BlockPreloader>
        </div>
        <div class="flex flex-col justify-between h-auto">
          <BlockPreloader
            :loading="loading"
            height="20px"
            width="100%"
            border-radius="2px"
            margin="12px 0px 0px 0px"
          >
            <p
              class="line-clamp-2 text-dark leading-130 text-base font-medium mt-3 group-hover:text-blue transition-300"
            >
              {{ data?.title }}
            </p>
          </BlockPreloader>
          <BlockPreloader
            :loading="loading"
            height="15px"
            width="90%"
            border-radius="2px"
            margin="8px 0 0 0 "
          >
            <p class="line-clamp-2 text-dark-light leading-130 text-xs mt-2">
              {{ data?.short_description }}
            </p></BlockPreloader
          >
        </div>
        <BlockPreloader
          :loading="loading"
          height="20px"
          width="80%"
          margin="2px 0"
          border-radius="2px"
        >
        </BlockPreloader>

        <BlockPreloader
          :loading="loading"
          height="15px"
          width="80%"
          margin="2px 0"
          border-radius="2px"
        >
        </BlockPreloader>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import BlockPreloader from "~/components/Common/BlockPreloader.vue";
import type { TNews } from "~/types/news";

interface Props {
  data: TNews;
  loading?: boolean;
}
defineProps<Props>();
</script>
