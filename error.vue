<template>
  <div class="">
    <LayoutHeader />
    <div
      class="error-wrapper container h-[calc(100vh_-_84px)] relative flex-center flex-col"
    >
      <img
        class="absolute-center-x top-10 max-md:hidden"
        src="/images/error-pattern.svg"
        alt="error pattern"
      />
      <img class="mb-8 md:mb-16" src="/images/404.svg" alt="404" />
      <div class="text-center text-[#383838]">
        <h1 class="mb-1.5 text-[32px] font-semibold leading-10">
          {{ $t("error_404") }}
        </h1>
        <p class="text-2xl leading-8">
          {{ $t("page_not_found") }}
        </p>
      </div>
      <NuxtLink to="/">
        <Button class="mt-3 md:mt-6 !px-8" text-class="!font-450 !text-lg">
          {{ $t("go_to_homepage") }}
        </Button></NuxtLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NuxtError } from "#app";

const props = defineProps({
  error: Object as () => NuxtError,
});
</script>

<style scoped>
.error-wrapper {
  height: calc(100vh - 84px);
}
</style>
