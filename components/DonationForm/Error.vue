<template>
  <div class="pt-2 text-center">
    <i
      @click="$emit('close')"
      class="icon-close-mark flex justify-end text-dark text-lg hover:text-red transition cursor-pointer mb-4"
    />
    <img
      class="mx-auto"
      src="/images/card_add_error.svg"
      alt="error-illustration"
    />
    <h4 class="mt-6 mb-1 font-bold text-lg leading-18">
      {{ $t("error") }}
    </h4>
    <p class="text-dark-light text-base leading-4">
      {{ $t("something_went_wrong_on_payment") }}
    </p>
    <div class="mt-[60px] flex-y-center gap-5">
      <Button
        text-class="!text-lg !font-450 !leading-135"
        class="w-full"
        variant="secondary"
        :text="$t('close')"
        @click="$emit('close')"
      />
      <Button
        text-class="!text-lg !font-450 !leading-135"
        class="w-full"
        :text="$t('retry')"
        @click="$emit('retry')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  price?: number;
}
defineProps<Props>();
defineEmits<{
  (e: "close"): void;
  (e: "retry"): void;
}>();
</script>
