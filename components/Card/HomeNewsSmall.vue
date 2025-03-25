<template>
  <ClientOnly>
    <NuxtLink
      data-aos="fade-left"
      :data-aos-delay="100 * index"
      :to="`/news/${card?.slug}`"
      class="flex-y-center gap-2 md:gap-5 group cursor-pointer rounded-2xl transition-300"
    >
      <div
        class="rounded-2xl shrink-0 overflow-hidden aspect-square md:aspect-[181/130] max-md:max-w-[105px] max-w-[181px]"
      >
        <div v-if="loading">
          <CommonBlockPreloader
            v-bind="{ loading }"
            width="181px"
            height="130px"
          />
        </div>
        <CommonImage
          v-else
          :src="card?.image"
          class="w-full h-full object-cover group-hover:scale-105 transition-300"
          :alt="card?.title"
        />
      </div>
      <div class="py-1 md:py-3">
        <CommonBlockPreloader
          :loading="loading"
          border-radius="4px"
          width="112px"
          height="18px"
        >
          <p
            class="transition-300 text-xs font-450 leading-130 text-grey-100 capitalize"
          >
            {{
              translateDate(card?.published_at, "MMMM DD, YYYY", $i18n.locale)
            }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          border-radius="4px"
          width="250px"
          height="23px"
          margin="8px 0 4px 0"
        >
          <p
            class="transition-300 text-dark font-medium leading-130 line-clamp-2 mt-2 mb-1 group-hover:text-blue"
          >
            {{ card?.title }}
          </p>
        </CommonBlockPreloader>
        <CommonBlockPreloader
          :loading="loading"
          border-radius="4px"
          width="100%"
          height="23px"
          margin="8px 0 0 0"
        >
          <p class="text-sm leading-130 text-dark-light line-clamp-2">
            {{ card?.short_description }}
          </p>
        </CommonBlockPreloader>
      </div>
    </NuxtLink>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { useI18n } from "vue-i18n";
import type { TNews } from "~/types/news";
interface Props {
  card?: TNews;
  loading?: boolean;
  index?: number;
}

const t = useI18n().t;
defineProps<Props>();
</script>
