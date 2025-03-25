<template>
  <div
    class="cursor-pointer relative bg-grey-400 hover:bg-grey-200 flex items-center justify-between pl-4 pr-1 py-1 rounded-[10px] group max-w-[240px] transition-300"
    @click="copyUrl"
  >
    <span
      style="word-break: break-all"
      class="line-clamp-1 text-base text-dark leading-130 transition-300"
    >
      {{ url }}
    </span>
    <span
      class="w-[28px] h-[28px] shrink-0 bg-blue group-hover:bg-[#008bd2] transition-300 rounded-lg flex-center ml-4 group relative"
    >
      <i class="icon-copy text-base text-white"></i>

      <CommonTooltip with-trigger :show="copied">
        {{ $t("copied") }}
      </CommonTooltip>
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";

const url = computed(() => {
  return process.client ? window.location.href.replace(/^https?:\/\//, "") : "";
});
const copied = ref(false);
async function copyUrl() {
  copied.value = true;
  await navigator.clipboard.writeText(window.location.href);
  setTimeout(() => {
    copied.value = false;
  }, 1500);
}
</script>

<style scoped>
.text-wrapper {
  border-radius: 8px 0 0 8px;
}

.icon-wrapper {
  border-radius: 0 8px 8px 0;
}
.tooltip-custom {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
</style>
