<template>
  <div class="scroll-none overflow-x-scroll">
    <ul class="flex items-center gap-x-1 text-sm leading-130">
      <li>
        <nuxt-link
          :to="'/'"
          class="hover:text-grey-100 text-dark transition-300 mr-1"
        >
          {{ $t("home") }}
        </nuxt-link>
        <i class="icon-chevron-right text-[10px] text-grey-100"></i>
      </li>
      <li v-for="(item, index) in links" :key="index">
        <nuxt-link
          :to="`/${item.url}`"
          class="truncate hover:text-grey-100 text-dark transition-300 mr-1"
          :class="{
            'text-grey-100 pointer-events-none': index === links.length - 1,
          }"
        >
          {{ item.title }}
        </nuxt-link>
        <i
          v-if="index < links.length - 1"
          class="icon-chevron-right text-[10px] text-grey-100"
        ></i>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface Props {
  links?: Object;
}

defineProps<Props>();
</script>

<style>
.scroll-none::-webkit-scrollbar-thumb {
  display: none;
}
.scroll-none::-webkit-scrollbar {
  display: none;
}
</style>
