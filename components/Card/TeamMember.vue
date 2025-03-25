<template>
  <div
      class="container grid md:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-5 md:gap-y-6"
      :class="customeClass"
  >
    <CardMember
        data-aos="zoom-in"
        :data-aos-delay="idx * 100"
        :main-class="mainClass"
        v-for="(card, idx) in members"
        :key="idx"
        v-bind="{ card }"
    />
  </div>
</template>

<script setup lang="ts">
import type { TMember } from "~/types/about";

interface Props {
  members: TMember[];
  customeClass?: string
  mainClass?: string
}
defineProps<Props>();
</script>
