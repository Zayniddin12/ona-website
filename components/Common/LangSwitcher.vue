<template>
  <FormDropdown
    v-bind="{ list }"
    position="right"
    @on-handle="onChangeLang"
    :active-item="locale"
    body-class="!w-[92px]"
  >
    <template #head>
      <button
        type="button"
        class="pr-6 border-r border-gray-200 font-medium text-base leading-125 uppercase flex-y-center gap-2 transition-300"
        :class="
          dark
            ? 'bg-white/10 hover:bg-white/20 text-white'
            : 'hover:text-dark/70 text-dark-100'
        "
      >
        <img :src="`/flags/${activeLang.value}.svg`" alt="flag" class="w-5 h-5" />
        <!--        <i-->
        <!--          class="icon-global text-xl leading-5 transition-300"-->
        <!--          :class="[dark ? 'text-white' : 'text-grey-100']"-->
        <!--        />-->
        {{ activeLang.title }}
      </button>
    </template>
  </FormDropdown>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
interface Props {
  dark?: boolean;
}
defineProps<Props>();

const { locale } = useI18n();

const list = [
  {
    title: "O'z",
    value: "uz",
  },
  {
    title: "En",
    value: "en",
  },
  {
    title: "Ru",
    value: "ru",
  },
];
const activeLang = computed(() =>
  list.find((lang) => lang.value === locale.value)
);

const onChangeLang = (lang: string) => {
  const _locale = useCookie("locale");
  _locale.value = lang;
  window.location.reload();
};
</script>
