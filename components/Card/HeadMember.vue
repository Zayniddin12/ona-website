<template>
  <div
    v-if="card"
    class="p-3 !pt-0 flex flex-col items-start sm:items-center md:p-4 bg-white head-member shadow-headMember rounded-2xl"
  >
    <div class="flex items-stretch w-full h-full lg:h-auto lg:w-auto">
      <div class="aspect-auto w-[240px]">
        <img
          v-if="card?.image"
          class="w-full md:w-[240px] h-[200px] md:h-[230px] object-cover border border-grey-100/10 rounded-xl"
          :src="card?.image"
          alt="card"
        />
        <img
          v-else
          class="max-w-full max-h-full rounded-xl"
          src="/images/default-image.webp"
          alt="default"
        />
      </div>
    </div>
    <div class="flex flex-col py-3 justify-between gap-2">
      <div>
        <h5
          class="line-clamp-2 font-bold text-xl text-dark-100 lg:text-2xl leading-130 mb-1 h-16"
        >
          {{ card?.full_name ?? "Бахтиёров Шохрух Бахтиярович" }}
        </h5>
      </div>
      <div class="flex flex-col gap-4">
        <p class="line-clamp-2 font-450 leading-130 text-blue">
          {{ card?.level ?? "Председатель фонда “Ona”" }}
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TMember } from "~/types/about";

interface Props {
  card?: TMember;
}

const props = defineProps<Props>();

const addressLink = computed(
  () =>
    `https://www.google.com/maps/@${props.card?.location?.replace(
      ";",
      ","
    )},17z`
);
</script>

<style lang="css">
.head-member {
  background-image: url("/images/management-bg.webp");
  overflow: hidden;
  background-position: center right;
  background-repeat: no-repeat;
  background-size: 519px 317px;
  width: 100%;
}

@media (max-width: 1023px) {
  .head-member {
    background-image: none;
  }
}
</style>
<!--commit -->
