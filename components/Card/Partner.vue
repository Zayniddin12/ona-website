<template>
  <a
    :href="card?.url"
    target="_blank"
    class="bg-grey-400 w-[264px] h-[120px] flex-center px-4 rounded-2xl border border-grey-200 flex-center hover:bg-white hover:border-blue hover:border-opacity-20 duration-300 cursor-pointer group overflow-hidden"
  >
<!--    <div v-if="loading">-->
<!--      <CommonBlockPreloader v-bind="{ loading }" width="264px" height="120px" />-->
<!--    </div>-->
    <CommonImage
      v-if="!loading"
      :src="card?.image"
      alt="partner logo"
      image-class="!object-contain"
      class="h-[70px]"
    />
  </a>
</template>

<script setup lang="ts">
import type { TPartner } from "~/types/partner";

interface Props {
  card?: TPartner;
  noHover?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<Props>(), {});
</script>
