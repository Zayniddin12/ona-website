<template>
  <div class="bg-grey-400 py-4 md:py-8">
    <SectionHead title="our_licences">
      <template #title>
        <i18n-t keypath="our_licences" tag="span" class="section__title">
          <template #licenses>
            <span class="text-blue">
              {{ $t("licences") }}
            </span>
          </template>
        </i18n-t>
      </template>
    </SectionHead>
    <div
      data-aos="fade-up"
      class="container grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <CardLicenses
        v-for="(card, idx) in licenses"
        :key="idx"
        v-bind="{ card }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TLicense } from "~/types/about";

interface Props {
  licenses: TLicense[];
}
defineProps<Props>();
</script>

<style scoped></style>
