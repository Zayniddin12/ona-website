<template>
  <div>
    <div class="container !py-4">
      <BreadCrumb :links="link" />
      <ClientOnly>
        <i18n-t
          tag="p"
          keypath="programs_title"
          class="text-2xl max-sm:text-2xl lg:text-[32px] text-dark font-bold items-start leading-130 gap-x-1 mt-9"
        >
          <template #program>
            <span>
              {{ $t("program") }}
            </span>
          </template>
        </i18n-t>
      </ClientOnly>

      <div
        class="grid max-sm:grid-cols-1 grid-cols-2 lg:grid-cols-3 gap-5 py-6"
      >
        <CardProgram
          v-for="(item, index) in cardData"
          :data="item"
          :key="index"
          :loading="loading"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref } from "vue";
import { useProgramsStore } from "~/store/programs";

const programsStore = useProgramsStore();
const route = useRoute();

const { t: $t } = useI18n();

const link = [
  {
    title: $t("programs"),
    url: "programs",
  },
];

const loading = ref(true);

const cardData = computed(() => programsStore?.programs);

onMounted(() => {
  programsStore.fetchPrograms();
  setTimeout(() => {
    loading.value = false;
  }, 1000);
});

useHead({
  title: `${$t("programs")} | Ona foundation`,
});
</script>
