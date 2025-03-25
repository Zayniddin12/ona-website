<template>
  <div
    class="shadow-survey p-5 rounded-2xl border border-grey-300 flex flex-col w-full"
  >
    <div class="flex-y-center space-x-[10px]">
      <span class="icon-document-text text-blue text-[30px] leading-[30px]" />
      <div class="flex flex-col items-start">
        <p class="leading-[110%] font-450">{{ $t("survey") }}</p>
        <p class="text-sm leading-[110%]">
          {{ $t("application_for_assistance") }}
        </p>
      </div>
    </div>
    <div class="flex-y-center space-x-[10px] mt-5">
      <Button @click="downloadFile(doc, $t('survey'))" class="w-1/2">
        <template #pre-icon>
          <span class="icon-document-download text-white leading-16" />
        </template>
        {{ $t("download") }}
      </Button>
      <a :href="doc" target="_blank" class="w-1/2">
        <Button variant="green" class="w-full">
          <template #pre-icon>
            <span class="icon-folder-open text-white leading-16" />
          </template>
          {{ $t("open") }}
        </Button>
      </a>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  doc?: string;
}
defineProps<Props>();
</script>
