<template>
  <div>
    <SectionAbout v-if="about?.id" v-bind="{ about }" />
    <SectionOurMission v-if="missions?.length > 0" v-bind="{ missions }" />
    <SectionOurTeam v-if="members?.length > 0" v-bind="{ members }" />
    <SectionOurLicense v-if="licenses?.length > 0" v-bind="{ licenses }" />
  </div>
</template>

<script setup lang="ts">
import { useAboutStore } from "~/store/about";
import { useAsyncData } from "#app";
import { useI18n } from "vue-i18n";

const { t: $t } = useI18n();

const aboutStore = useAboutStore();
const { data: missions } = await useAsyncData(() => aboutStore.fetchContact());
const { data: about } = await useAsyncData(() => aboutStore.fetchAbout());
const { data: members } = await useAsyncData(() => aboutStore.fetchMembers(30));
const { data: licenses } = await useAsyncData(() => aboutStore.fetchLicenses());

useHead({
  title: `${$t("about_fond")} | Ona foundation`,
});
</script>
