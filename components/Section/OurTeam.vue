<template>
  <SectionHead title="our_team" class="py-4 md:py-8">
    <template #title>
      <i18n-t keypath="our_team" tag="span" class="section__title">
        <template #team>
          <span class="text-blue">
            {{ $t("team") }}
          </span>
        </template>
      </i18n-t>
    </template>
    <div
      class="container grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 md:gap-y-6"
      :class="customeClass"
    >
      <CardMember
        data-aos="zoom-in"
        :data-aos-delay="idx * 100"
        v-for="(card, idx) in members"
        :key="idx"
        v-bind="{ card }"
      />
    </div>
  </SectionHead>
</template>

<script setup lang="ts">
import type { TMember } from "~/types/about";

interface Props {
  members: TMember[];
  customeClass?: string
}
defineProps<Props>();
</script>
