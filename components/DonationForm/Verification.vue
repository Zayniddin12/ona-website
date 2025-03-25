<template>
  <div class="pt-4 text-center">
    <h3 class="text-base leading-4 font-semibold text-dark">
      {{ $t("enter_verification_code") }}
    </h3>
    <p class="max-w-[80%] mx-auto my-2 text-sm leading-14 text-dark-light">
      {{ $t("enter_verification_code_desc") }}
    </p>
    <p class="text-base font-semibold text-dark leading-125 mb-4">
      {{ phone }}
    </p>
    <FormOtp v-model="otp" @submit="verify" :error="error" />
    <i18n-t
      v-if="timeout"
      keypath="dont_get_code_yet"
      tag="p"
      class="text-sm leading-130 text-grey-100 my-2"
    >
      <template #send_again>
        <button
          @click="sendAgain"
          type="button"
          class="text-blue hover:underline cursor-pointer"
        >
          {{ $t("send_again") }}
        </button>
      </template>
    </i18n-t>
    <CommonTimer
      v-else
      :seconds="10"
      class="text-base leading-125 font-semibold mt-2"
      @timeout="timeout = true"
    />
    <Button
      class="w-full mt-5"
      :variant="otp.length !== 6 || error ? 'secondary' : 'primary'"
      :class="{ 'pointer-events-none': otp.length !== 6 }"
      text-class="!text-lg !font-450 !leading-135 !transition-300"
      :text="$t('continue')"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  phone: string;
  error?: boolean;
}
defineProps<Props>();
const emit = defineEmits<{
  (e: "verify", value: string): void;
  (e: "sendAgain"): void;
}>();
const otp = ref("");
const timeout = ref(false);
const verify = (code: string) => {
  emit("verify", code);
};
const sendAgain = () => {
  emit("sendAgain");
  timeout.value = false;
};

const showAgainButton = ref(false);
onMounted(() => {
  setTimeout(() => {
    showAgainButton.value = true;
  }, 30000);
});
</script>
