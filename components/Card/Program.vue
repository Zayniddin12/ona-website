<template>
  <NuxtLink
    :to="`/programs/${data?.slug}`"
    :class="`w-full  border border-grey-200 rounded-2xl relative overflow-hidden p-2 flex flex-col justify-end group ${cardStyle}`"
  >
    <div
      v-if="loading"
      class="absolute w-full h-full bg-grey-400 z-4 top-0 left-0"
    />
    <div class="box-linear absolute w-full h-full top-0 left-0 z-2" />
    <img
      :src="data?.image"
      alt="cover"
      class="absolute top-0 left-0 w-full h-full object-cover z-1"
    />
    <div
      v-if="loading"
      class="absolute right-2 left-2 bg-grey-200 min-h-[122px] rounded-lg z-6 p-3"
      :class="iconTop ? 'min-h-[72px]' : ''"
    >
      <BlockPreloader
        width="87%"
        height="20px"
        :loading="loading"
        border-radius="4px"
      >
      </BlockPreloader>
      <BlockPreloader
        width="57%"
        height="20px"
        :loading="loading"
        border-radius="4px"
        margin="12px 0"
        v-if="!iconTop"
      >
      </BlockPreloader>
      <BlockPreloader
        width="87%"
        height="16px"
        :loading="loading"
        border-radius="4px"
        margin="12px 0"
        v-if="!iconTop"
      >
      </BlockPreloader>
      <BlockPreloader
        width="57%"
        height="16px"
        :loading="loading"
        border-radius="4px"
        margin="12px 0"
      >
      </BlockPreloader>
    </div>
    <div
      :class="`w-full min-h-[122px] bg-dark/60 z-3 relative rounded-lg backdrop-blur-[5px] p-3 cursor-pointer pointer-events-none ${contentStyle}`"
    >
      <p
        class="text-white leading-130 mb-1 line-clamp-2 max-w-[342px]"
        :class="iconTop ? 'text-lg' : 'text-xl'"
      >
        {{ data?.title }}
      </p>
      <div
        class="text-grey-500 hmtl-text text-base leading-130 line-clamp-2"
        v-html="data?.description"
      ></div>
    </div>
    <!--    <i-->
    <!--      class="icon-arrow-right text-white absolute top-5 right-5 opacity-0 -translate-x-0.5 group-hover:translate-x-0 group-hover:opacity-100 z-3 transition-300"-->
    <!--      :class="iconTop ? '!top-2 !right-2 text-xl' : ''"-->
    <!--    ></i>-->
  </NuxtLink>
</template>

<script setup lang="ts">
import BlockPreloader from "~/components/Common/BlockPreloader.vue";
import type { TPrograms } from "~/types/programs";

interface Props {
  data: TPrograms;
  cardStyle?: string;
  iconTop?: boolean;
  contentStyle?: string;
  loading?: boolean;
  dynamicWidth: string;
}

withDefaults(defineProps<Props>(), {
  cardStyle: "aspect-[382/284]",
  contentStyle: "",
});
</script>

<style>
.box-linear {
  background: linear-gradient(
    180deg,
    rgba(28, 31, 32, 0) 32.22%,
    rgba(28, 31, 32, 0.6) 87.68%
  );
  transition: background 0.3s ease-in-out;
}

.box-linear::after {
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: linear-gradient(
    180deg,
    rgba(53, 183, 250, 0.33) 0%,
    #35b7fa 100%
  );
  cursor: pointer;
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.box-linear:hover::after {
  opacity: 1;
}

.hmtl-text p {
  color: #82878f !important;
}

.hmtl-text p span {
  color: #82878f !important;
}

.hmtl-text span p {
  color: #82878f !important;
}
</style>
