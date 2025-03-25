<template>
  <div class="relative">
    <div v-if="files?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-3">
      <div
        v-for="(file, index) in files"
        :key="index"
        class="flex-center-between gap-1 bg-grey-400 border border-grey-300 rounded-[10px] p-3"
      >
        <div class="flex-y-center">
          <span class="icon-document-text text-blue text-xl"></span>
          <h5
            class="ml-2 text-normal text-base leading-125 text-dark line-clamp-1 break-all"
          >
            {{ file?.name }}
          </h5>
        </div>
        <span
          @click="deleteItem(index)"
          class="icon-trash text-grey-100 transition-300 hover:text-red text-xl cursor-pointer"
        />
      </div>
      <Button
        v-if="files.length < 5"
        text-class="h-8 !text-lg !font-450 !leading-135"
        variant="secondary"
        :text="'+  ' + $t('add_file')"
        @click="chooseFile"
      />
    </div>
    <div
      v-else
      @click="chooseFile"
      class="flex-center flex-col border border-dashed py-3 md:py-10 rounded-[10px] border-blue bg-[#EBF6FC] cursor-pointer transition-300 hover:bg-[#BADDEF]"
    >
      <div class="flex-y-center">
        <span class="icon-document-upload text-blue text-2xl" />
        <h5 class="ml-1 text-dark font-medium text-lg leading-125">
          {{ $t("choose_title") }}
        </h5>
      </div>
      <h6 class="mt-1 text-dark-light font-medium text-sm leading-125">
        {{ $t("file_formats") }}
      </h6>
    </div>
    <input
      class="absolute top-0 left-0 opacity-0 w-0 h-0 pointer-events-none"
      :id="`input-${uniqueId}`"
      type="file"
      multiple
      accept=".doc, .docx, .ppt, .pdf, .jpg, .png"
      @change="uploadFile"
      :disabled="files.length >= 5"
    />
  </div>
</template>

<script setup lang="ts">

import * as pkg from "vue-toastification";
import {useI18n} from "vue-i18n";

const { useToast } = pkg;
const { t: $t } = useI18n();
interface Props {
  modelValue?: any;
  customClass?: string;
  isClearFiles?: boolean;
  default: any;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
  (e: "before", value: any): void;
}>();

const uniqueId = ref();
function chooseFile() {
  const input = document.getElementById(
    `input-${uniqueId.value}`
  ) as HTMLInputElement;
  input?.click();
}

watch(
  () => props.default,
  (val) => {
    files.value = val;
  }
);

const file = ref(null);
const files = ref([]);
const uploadFile = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files?.length > 0) {
    if(input.files[0].size < 1024000) {
    files.value.push(...input.files);
    emit("update:modelValue", files.value);
    }
    else {
      useToast().error($t('max_file_size_10'))
    }
  }
};
const deleteItem = (idx: number) => {
  files.value.splice(idx, 1);
  emit("update:modelValue", files.value);
};
onMounted(() => {
  uniqueId.value = generateUniqueId();
});
</script>
