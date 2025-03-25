<template>
  <NuxtLink :to="`/events/${data?.slug}`">
    <div
      class=""
      :class="
        eventStyle +
        ' w-full aspect-[281/276] rounded-2xl overflow-hidden relative p-3 md:py-[28px] md:px-7 group card-wrapper'
      "
    >
      <div
        class="box-linear-event absolute w-full h-full top-0 left-0 z-2 pointer-events-none group-hover:opacity-0 transition-300"
      />
      <div
        class="box-linear-event-blue absolute w-full h-full top-0 left-0 z-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-300"
      />
      <div
        v-if="loading"
        class="absolute w-full h-full bg-grey-400 z-4 top-0 left-0 pt-7"
      >
        <BlockPreloader
          :loading="loading"
          width="82%"
          height="26px"
          margin="12px 0"
          border-radius="4px"
          preloader-class="absolute z-5 left-7 right-7 top-7"
        ></BlockPreloader>
        <BlockPreloader
          :loading="loading"
          width="43%"
          height="14px"
          margin="12px 0"
          border-radius="4px"
          preloader-class="absolute z-5 left-7 right-7 top-[60px]"
        ></BlockPreloader>
        <BlockPreloader
          :loading="loading"
          width="82%"
          height="26px"
          margin="12px 0"
          border-radius="4px"
          preloader-class="absolute z-5 left-7 right-7 bottom-[92px]"
        ></BlockPreloader>
        <BlockPreloader
          :loading="loading"
          width="52%"
          height="26px"
          margin="12px 0"
          border-radius="4px"
          preloader-class="absolute z-5 left-7 right-7 bottom-[60px]"
        ></BlockPreloader>
        <BlockPreloader
          :loading="loading"
          width="82%"
          height="14px"
          margin="12px 0"
          border-radius="4px"
          preloader-class="absolute z-5 left-7 right-7 bottom-7"
        ></BlockPreloader>
      </div>
      <img
        :src="data?.thumbnail"
        :alt="data?.title"
        class="absolute top-0 left-0 w-full h-full object-cover z-1 pointer-events-none"
      />
      <div
        class="w-full h-full relative z-3 text-white pointer-events-none flex flex-col justify-between"
      >
        <div>
          <ClientOnly>
            <BlockPreloader
              :loading="loading"
              width="100%"
              height="26px"
              margin="12px 0"
              border-radius="4px"
              preloader-class="absolute z-6"
            >
              <p class="font-medium text-xl leading-[26px]">
                {{
                  translateDate(data?.event_at, "DD MMMM YYYY", $i18n.locale)
                }}
              </p>
            </BlockPreloader>
          </ClientOnly>
          <p
            class="flex-y-center gap-x-1 md:gap-x-[7px] text-sm leading-130 line-clamp-1"
          >
            <i class="icon-location" />
            <i class="line-clamp-1">{{ data?.address }}</i>
          </p>
        </div>
        <div>
          <p
            class="text-base leading-[132%] font-semibold mb-2 line-clamp-2 sm:line-clamp-3"
          >
            {{ data?.title }}
          </p>
          <div class="flex-center-between">
            <p
              class="group-hover:text-grey-200 font-normal text-base leading-130 text-grey-100 transition-300 line-clamp-1"
            >
              {{ data?.category }}
            </p>
            <i
              class="icon-arrow-right text-white opacity-0 -translate-x-0.5 group-hover:translate-x-0 group-hover:opacity-100 z-3 transition-300"
            ></i>
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style>
.box-linear-event {
  background: linear-gradient(180deg, rgba(28, 31, 32, 0.3) 0%, #1c1f20 100%);
}

.box-linear-event-blue {
  background: linear-gradient(
    180deg,
    rgba(53, 183, 250, 0.33) 0%,
    #35b7fa 100%
  );
}
</style>

<script setup lang="ts">
import BlockPreloader from "~/components/Common/BlockPreloader.vue";
import type { TEvent } from "~/types/events";
import dayjs from "dayjs";

interface Props {
  data?: TEvent;
  loading?: boolean;
  eventStyle?: string;
}

defineProps<Props>();
</script>
