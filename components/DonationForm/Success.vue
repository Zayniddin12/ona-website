<template>
  <div class="pt-2 text-center">
    <i
      @click="$emit('close')"
      class="icon-close-mark flex justify-end text-dark text-lg hover:text-red transition cursor-pointer mb-4"
    />
    <img class="mx-auto" src="/images/card_added.svg" alt="card_add" />
    <h4 class="mt-6 mb-1 font-bold text-lg leading-18">
      {{ $t("successful_paid") }}
    </h4>
    <p class="text-dark-light text-base leading-4">
      {{ formatMoneyDecimal(price) }} {{ $t("sum") }}
    </p>
    <p class="mt-8 text-base leading-4 text-green mb-2">
      {{ $t("thanks_for_donation") }}
    </p>
    <Button
      text-class="!text-lg !font-450 !leading-135"
      class="w-full"
      variant="secondary"
      :text="$t('close')"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
interface Props {
  price?: number;
}
defineProps<Props>();
defineEmits<{
  (e: "close"): void;
}>();
</script>
