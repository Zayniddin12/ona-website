<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useAsyncData } from "#app";
import { useAboutStore } from "~/store/about";

const aboutStore = useAboutStore();
const { data: members } = await useAsyncData(() => aboutStore.fetchMembers());

const { t: $t } = useI18n();
const link = [
  {
    title: $t("management"),
    url: "management",
  },
];

const getHeadUser = () => {
  if (!members.value) return;
  const targetIds = [1, 2, 20, 21, 19];
  return members.value.filter((member: { id: number }) => targetIds.includes(member.id));
}

console.log(getHeadUser());
</script>


<template>
  <div>
    <div class="container py-4 pb-12">
      <BreadCrumb :links="link" />
      <h1 class="pt-3 lg:pt-5 pb-3 lg:pb-8 text-dark text-lg lg:text-[32px] leading-120 font-bold">{{ $t("management") }}</h1>

      <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 grid-rows-1">
      <CardHeadMember v-for="(item, idx) in getHeadUser()" :key="idx" :card="item"/>
      </div>
      <CardTeamMember custome-class="!px-0" main-class="!bg-white" class="px-0 mt-5" v-if="members?.length > 0" v-bind="{members}"/>
    </div>
  </div>
</template>

<style scoped></style>
