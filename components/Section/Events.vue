<template>
  <SectionHead
    class="py-4 md:py-8"
    title="events"
    section-title="all_events"
    section-link="/events"
  >
    <div class="container">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-5">
        <CardEvent
          v-for="(data, index) in events"
          :key="index"
          v-bind="{ data }"
          data-aos="fade-up"
          :data-aos-delay="100 * index"
          class="first:col-span-2 group"
          event-style="group-first:!aspect-[582/391] h-full"
        />
      </div>
    </div>
  </SectionHead>
</template>

<script setup lang="ts">
import type { TEvent } from "~/types/events";

interface Props {
  events: TEvent[];
}
defineProps<Props>();

</script>
