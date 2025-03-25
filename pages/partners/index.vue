<template>
  <div class="container !pt-[21px] flex items-start space-x-[19px]">
    <div class="w-full">
      <i18n-t
        keypath="to_be"
        tag="p"
        class="text-dark font-bold text-xl sm:text-2xl md:text-[40px] leading-130 mt-[15px]"
      >
        <template #text>
          <span class="text-blue">
            {{ $t("be_partner") }}
          </span>
        </template>
      </i18n-t>

      <p class="my-6 text-dark leading-130">
        {{ $t("partner_info") }}
      </p>
      <form
        @submit.prevent
        class="flex flex-col gap-4 bg-white border border-grey-300 rounded-2xl p-5 shadow-form"
      >
        <div class="grid grid-cols-2 gap-5">
          <FormGroup
            :label="$t('person_for_contact')"
            class="col-span-2 md:col-span-1"
          >
            <FormInput
              v-model="form.values.name"
              :error="form.$v.value.name.$error"
              :placeholder="$t('enter_your_name')"
            />
          </FormGroup>
          <FormGroup
            :label="$t('phone_number')"
            class="col-span-2 md:col-span-1"
          >
            <FormPhoneNumber
              v-model="form.values.phone"
              :error="form.$v.value.phone?.$error"
            />
          </FormGroup>
        </div>
        <FormGroup
          :label="$t('organization_name')"
          class="col-span-2 md:col-span-1"
        >
          <FormInput
            v-model="form.values.organization"
            :error="form.$v.value.organization.$error"
            :placeholder="$t('enter_name')"
          />
        </FormGroup>
        <div class="col-span-2 md:col-span-1">
          <div class="flex-y-center justify-between mb-2">
            <FormLabel :label="$t('message')" />
            <p class="text-xs text-[#A2ABBE] leading-125 ml-1">
              {{ form.values.message?.length }}/2000
            </p>
          </div>

          <FormTextArea
            v-model="form.values.message"
            :error="form.$v.value.message.$error"
            :maxlength="2000"
            :placeholder="$t('message')"
          />
        </div>

        <div
          class="flex md:items-center max-md:flex-col-reverse max-md:w-full gap-5"
        >
          <Button
            @click="submit"
            variant="primary"
            class="text-lg px-[100px]"
            :loading="formLoading"
          >
            {{ $t("send") }}
          </Button>
          <i18n-t
            for="terms_of_use"
            keypath="clicking_you_agree_to_the_terms_of_use"
            tag="p"
            class="text-center text-grey-100 text-sm leading-130 flex flex-col items-start"
          >
            <template #terms>
              <NuxtLink
                to="/pages/terms-of-use"
                class="text-blue transition-300 hover:opacity-70 cursor-pointer"
              >
                {{ $t("terms_of_use") }}
              </NuxtLink>
            </template>
          </i18n-t>
        </div>
      </form>
      <CommonModal :show="showSuccessModal">
        <CommonModalSuccess
          @close="showSuccessModal = false"
          :description="$t('your_request_for_contact_has_been_sent')"
        />
      </CommonModal>
    </div>
    <div class="max-md:hidden shrink-0">
      <img
        src="/images/partner-shake.svg"
        alt="image of hand shake"
        class="object-cover"
      />
    </div>
  </div>
  <div class="container !my-16">
    <p
      class="text-dark font-bold text-xl sm:text-2xl md:text-[32px] leading-130"
    >
      {{ $t("our_friends") }}
    </p>
    <div class="grid grid-cols-12 gap-5 mt-6">
      <CardPartner
        class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-3 !w-full"
        v-for="(card, ind) of partners"
        :key="ind"
        v-bind="{ card }"
      />
    </div>
    <Button
      v-if="partnersLength !== partners.length"
      variant="secondary"
      class="mx-auto mt-6"
      @click="morePartners"
    >
      {{ $t("load_more") }}

      <template #post-icon>
        <span class="icon-arrow-right rotate-90 ml-1" />
      </template>
    </Button>
  </div>

  <!--  <div class="container">-->
  <!--    <h2-->
  <!--      class="text-dark font-bold text-xl sm:text-2xl md:text-[32px] leading-130 mb-3 md:mb-6"-->
  <!--    >-->
  <!--      {{ $t("donation_boxes") }}-->
  <!--    </h2>-->
  <!--  </div>-->

  <MapPartner :title="$t('donation_boxes')" />
</template>

<script setup lang="ts">
import { required } from "@vuelidate/validators";
import { useMediaQuery } from "@vueuse/core";
import { useI18n } from "vue-i18n";
import { usePartnersStore } from "~/store/partners";
import { useHomeStore } from "~/store/home";
import * as pkg from "vue-toastification";
const { useToast } = pkg;
const { t: $t } = useI18n();
const isTabletScreen = useMediaQuery("(max-width: 768px)");
const showSuccessModal = ref(false);
const partnerStore = usePartnersStore();
const formLoading = ref(false);
const form = useForm(
  {
    name: "",
    phone: "",
    organization: "",
    adress: "",
    help_type: "",
    message: "",
  },
  {
    name: { required },
    phone: { required, isValidPhone },
    organization: { required },
    adress: { required },
    help_type: { required },
    message: { required },
  }
);

const submit = async () => {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    formLoading.value = true;
    const token = await useRecaptcha("check_code");
    useApi()
      .$post("v1/common/partner-aplications/", {
        headers: {
          "captcha-security": token,
        },
        body: form.values
      })
      .then(() => {
        showSuccessModal.value = true;
        form.values.name = "";
        form.values.phone = "";
        form.values.organization = "";
        form.values.adress = "";
        form.values.help_type = "";
        form.values.message = "";
        formLoading.value = false;
      })
      .finally(() => {
        form.$v.value.$reset();
      });
  } else {
    useToast().error($t("fill_all_fields_clear"));
  }
};
const params = ref({
  limit: isTabletScreen.value ? 6 : 12,
  offset: 0,
});
const morePartners = () => {
  params.value.offset += params.value.limit;
  partnerStore.fetchFullPartners(params.value, true);
};
const partners = computed(() => partnerStore.fullPartners);
const partnersLength = computed(() => partnerStore.fullPartnersCount);
partnerStore.fetchFullPartners(params.value);
const helpTypes = computed(() => useHomeStore().commonHelpTypes);
useAsyncData(() => useHomeStore().fetchCommonHelpTypes());

useHead({
  title: `${$t("our_partners")} | Ona foundation`,
});
</script>
