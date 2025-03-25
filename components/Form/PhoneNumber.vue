<template>
  <div
    ref="inputWrapper"
    class="phone-input relative w-full h-11"
    :class="[
      'inline-flex items-center transition-300 relative bg-grey-400 rounded-[10px] border w-full group',
      error ? '!border-red' : 'border-grey-300 focus-within:border-blue',
    ]"
  >
    <hr class="h-[42px] top-0 border border-solid absolute left-[3.5rem]" />

    <VueTelInput
      ref="phoneInput"
      v-model="phone"
      :disabled="readonly"
      :input-options="{ placeholder, maxlength: 17, showDialCode: true }"
      class="py-[2px] !rounded-lg transition-300"
      :class="{ invalid: !valid, '!border-red': error }"
      default-country="uz"
      valid-characters-only
      @validate="handleValidatedPhone"
    />

    <Transition name="fade">
      <common-block-preloader
        v-if="loading"
        class="right-0 absolute w-min inline-block scale-[0.4] ml-[calc(100%-20px)] top-2"
      />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import "@/assets/styles/vue-tel-input.css";

import { useEventListener } from "@vueuse/core";
import { onMounted, ref, watch } from "vue";
import { VueTelInput } from "vue-tel-input";

interface Props {
  error?: boolean;
  modelValue?: string;
  placeholder?: string;
  loading?: boolean;
  readonly?: boolean;
  isLocal?: boolean;
}

const props = defineProps<Props>();

interface Emits {
  (event: "update:modelValue", value: string): void;

  (event: "trigger", value: boolean): void;

  (event: "blur", value: string): void;

  (event: "reset-validation"): void;
}

const emit = defineEmits<Emits>();

const valid = ref(false);
const invalidError = ref(false);
const phone = ref("");

const phoneInput = ref<HTMLElement>();
const inputWrapper = ref<HTMLElement>();

useEventListener(phoneInput, "keydown", (e: KeyboardEvent) => {
  if (e.key === "Backspace" && phone.value === "+") {
    e.preventDefault();
  }
});

watch(
  () => phone.value,
  (value) => {
    emit("update:modelValue", value);
  }
);

watch(
  () => props.modelValue,
  () => {
    phone.value = props.modelValue ?? "";
  },
  { immediate: true }
);

const onFocus = () => {
  if (phone.value?.length === 0) {
    emit("update:modelValue", "+998");
  }
};

const onBlur = () => {
  if (phone.value?.length === 1) {
    phone.value = "";
    setTimeout(() => {
      emit("reset-validation");
    }, 10);
  }

  // On change tab validation touch method fires immediately. So we need to wait
  setTimeout(() => emit("blur", phone.value), 500);
};

const onPaste = (e: ClipboardEvent) => {
  e.preventDefault();

  const pastedText = e.clipboardData?.getData("text/plain") ?? "";

  const hasDefaultPlus = phone.value.startsWith("+");
  const hasPastedPlus = pastedText?.startsWith("+");

  if (hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText;
  } else if (hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`;
  } else if (!hasDefaultPlus && hasPastedPlus) {
    phone.value = pastedText;
  } else if (!hasDefaultPlus && !hasPastedPlus) {
    phone.value = `+${pastedText}`;
  }
};

onMounted(() => {
  const phoneInput = inputWrapper.value?.querySelector(
    ".phone-input input"
  ) as HTMLInputElement;
  phoneInput.setAttribute("placeholder", props.placeholder ?? "");

  phoneInput.onblur = onBlur;
  phoneInput.onpaste = onPaste;

  if (props.modelValue) {
    phone.value = props.modelValue;
  }
});

interface IValidateOptions {
  country: {
    dialCode: string;
    iso2: string;
    name: string;
  };
  countryCode: string | undefined;
  formatted: string | "";
  valid: boolean | undefined;
  countryCallingCode?: string;
  nationalNumber?: string;
  number?: string;
}

function handleValidatedPhone(options: IValidateOptions) {
  valid.value = !!options?.countryCode;
  invalidError.value =
    !options.valid &&
    !!options?.countryCode &&
    options.formatted.length > String(options.number)?.length;
  emit("trigger", invalidError.value);
}
</script>

<style>
.phone-input .vue-tel-input {
  @apply w-full h-full focus-within:!bg-white;
}

.phone-input .vti__input {
  @apply ml-2;
}

.phone-input input {
  @apply py-2 pl-0 bg-transparent text-sm font-medium text-dark;
}

.phone-input input::placeholder {
  @apply text-sm font-medium text-gray-400;
}
</style>
