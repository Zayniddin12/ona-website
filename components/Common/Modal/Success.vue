<template>
  <div class="pt-2 text-center">
    <i
      @click="$emit('close')"
      class="icon-close-mark flex justify-end text-dark text-lg hover:text-red transition cursor-pointer mb-4"
    />
    <img
      class="mx-auto"
      src="/images/success_illustration.svg"
      alt="success-illustration"
    />
    <h4 class="mt-6 mb-1 font-bold text-lg leading-18">
      {{ title }}
    </h4>
    <p class="text-dark-light text-base leading-4 mb-8">
      {{ description }}
    </p>
    <p v-if="short_description" class="mb-2 text-base leading-4 text-green">
      {{ short_description }}
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
  title?: string;
  description?: string;
  short_description?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Успешно отправлено!",
  description: "Ваша просьба о помощи отправлено",
});
defineEmits<{
  (e: "close"): void;
}>();
</script>
