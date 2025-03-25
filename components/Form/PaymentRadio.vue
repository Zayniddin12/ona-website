<template>
  <div class="grid sm:grid-cols-2 gap-2" :class="mainCustomClass">
    <div
      v-for="(item, index) of types"
      :key="index"
      class="h-11 relative z-0 rounded-[10px] flex group"
    >
      <input
        class="w-full h-full z-1 relative opacity-0 cursor-pointer"
        aria-label="payment radio"
        type="radio"
        @input="checking"
        name="type-payment"
        :value="item"
        :class="dynamicClass"
      />
      <div
        class="w-full h-full absolute inset-0 z-0 bg-grey-400 border rounded-[10px] p-3 flex-center-between transition-300"
        :class="[
          isChecked === item
            ? 'border-blue bg-white'
            : 'border-grey-300 group-focus-within:bg-white group-focus-within:border-blue group-hover:bg-white group-hover:border-blue',
          error ? 'border-red' : 'border-grey-300',
        ]"
      >
        <CommonImage
          v-if="item !== 'card'"
          :src="`/images/${item}.svg`"
          class="max-h-5"
          alt="card"
        />
        <div v-else class="flex-y-center gap-2">
          <i class="icon-card text-grey-100 text-2xl leading-6" />
          <p class="font-450 leading-125 text-dark">
            {{ $t("pay_with_card") }}
          </p>
        </div>
        <span
          class="rounded-full w-5 h-5 z-1 flex items-center justify-center transition-all duration-300 border-[1.5px] group-focus-within:border-blue group-hover:border-blue/20"
          :class="
            isChecked === item
              ? 'bg-blue border-blue'
              : 'bg-white border-grey-200'
          "
        >
          <span
            class="w-2.5 h-2.5 bg-white rounded-full"
            :class="isChecked === item ? 'opacity-100' : 'opacity-0'"
            style="box-shadow: 0 0 7px rgba(51, 51, 51, 0.5)"
          />
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, ref } from "vue";

interface Props {
  modelValue?: string;
  types: [string];
  dynamicClass?: string;
  mainCustomClass?: string;
  error?: boolean;
}

const props = defineProps<Props>();
const emit = defineEmits<{
  (e: "update:modelValue", value: any): void;
}>();

const isChecked = ref("paymeuz");

watch(
  () => props.modelValue,
  (newValue) => {
    isChecked.value = newValue;
  },
  { immediate: true }
);

const checking = (e: any) => {
  isChecked.value = e.target.value;
  console.log(isChecked.value, "isChecked.value");
  emit("update:modelValue", isChecked.value);
};
</script>
