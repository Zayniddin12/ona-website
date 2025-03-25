<template>
  <NuxtLayout>
    <div>
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>

<script setup>
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useContactStore } from "~/store/contact";
import { useAsyncData } from "#app";

const route = useRoute();
const contactStore = useContactStore();

if ("setup" in route.query) {
  throw new Error("error in setup");
}
if ("mounted" in route.query) {
  onMounted(() => {
    throw new Error("error in mounted");
  });
}

const { locale } = useI18n();
locale.value = useCookie("locale").value || "ru";

useAsyncData(() => contactStore.fetchContact());
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.2s ease-in-out;
}

.layout-enter-from,
.layout-leave-to {
  transform: scale(0.99);
  opacity: 0;
}
</style>
