<template>
  <div class="lg:p-7 lg:pt-6">
    <div class="grid md:grid-cols-3 gap-5">
      <CardStatistics
        v-for="(item, index) in statisticsData"
        :key="index"
        v-bind="{ item }"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TStatistics } from "~/types/common";

const date = new Date();
interface Props {
  statistics: TStatistics;
}
const props = defineProps<Props>();
const statisticsData = computed(() => [
  {
    icon: "/images/statics/item-1.webp",
    count: props.statistics?.people_donated,
    title: "statistics.people_donated",
  },
  {
    icon: "/images/statics/item-2.webp",
    count: props.statistics?.boxes_count,
    title: "statistics.boxes_count",
  },
  {
    icon: "/images/statics/item-3.webp",
    count:
      +props.statistics?.donation_received_women +
      +props.statistics?.donation_received_children,
    title: "statistics.donation_received_women",
  },
  // {
  //   icon: "/images/statics/item-4.svg",
  //   count: props.statistics?.donation_received_children,
  //   title: "statistics.donation_received_children",
  // },
]);
</script>
