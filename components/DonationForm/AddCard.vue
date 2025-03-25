<template>
  <form @submit.prevent="addCard">
    <FormGroup :label="$t('card_detail')">
      <div class="flex gap-4">
        <FormInput
          v-model="form.values.number"
          :error="form.$v.value.number.$error"
          input-class="placeholder:tracking-[0.12em]"
          placeholder="____ ____ ____ ____"
          v-maska="`#### #### #### ####`"
        />
        <FormInput
          v-model="form.values.expire"
          :error="form.$v.value.expire.$error"
          class="!w-1/4"
          input-class="placeholder:tracking-[0.12em]"
          placeholder="__/__"
          v-maska="`##/##`"
        />
      </div>
    </FormGroup>
    <i18n-t
      keypath="by_donating_you_agree_to_the_terms_of_use"
      tag="p"
      class="mt-4 mb-2 text-grey-100 text-sm leading-130"
    >
      <template #terms_of_use>
        <NuxtLink
          to="/pages/terms-of-use"
          class="text-blue transition-300 hover:opacity-70 cursor-pointer focus:underline"
        >
          {{ $t("terms_of_use") }}
        </NuxtLink>
      </template>
    </i18n-t>
    <Button class="w-full">
      <p class="text-lg leading-135 font-450">
        {{ $t("continue") }}
      </p>
    </Button>
  </form>
</template>

<script setup lang="ts">
import { minLength, required } from "@vuelidate/validators";

const form = useForm(
  {
    number: "",
    expire: "",
  },
  {
    number: { required, cardNumberValidator, minLength: minLength(19) },
    expire: { required, checkExpireDate },
  }
);
const emit = defineEmits<{
  (e: "add-card", value: { number: string; expire: string }): void;
}>();
const addCard = () => {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    emit("add-card", form.values);
  }
};
</script>
