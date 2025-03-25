<template>
  <div class="container">
    <BreadCrumb class="py-4" v-bind="{ links }" />
    <p
      class="text-dark font-bold text-xl sm:text-2xl md:text-[32px] leading-130 mt-2 md:mt-[15px] mb-3 md:mb-6"
    >
      {{ $t("contact_with_us") }}
    </p>

    <form
      class="bg-white border border-grey-300 rounded-2xl shadow-form grid grid-cols-2 mb-8"
      @submit.prevent
    >
      <div
        class="col-span-2 lg:col-span-1 flex flex-col gap-4 lg:border-r lg:border-grey-300 p-5"
      >
        <p class="text-2xl leading-130 font-medium">
          {{ $t("fill_form") }}
        </p>

        <div class="grid grid-cols-2 gap-5">
          <FormGroup :label="$t('full_name')" class="col-span-2 md:col-span-1">
            <FormInput
              v-model="form.values.full_name"
              :error="form.$v.value.full_name.$error"
              :placeholder="$t('enter_full_name')"
            />
          </FormGroup>
          <FormGroup
            :label="$t('phone_number')"
            class="col-span-2 md:col-span-1"
          >
            <FormPhoneNumber
              v-model="form.values.phone_number"
              :error="form.$v.value.phone_number?.$error"
            />
          </FormGroup>
        </div>
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
        <div class="h-[80px]">
          <client-only>
            <vue-recaptcha
              class="mb-7 mx-auto"
              ref="recaptcha"
              size="100px"
              :sitekey="siteKey"
              @verify="verifyMethod"
              @expired="expiredMethod"
            />
          </client-only>
        </div>
        <div
          class="flex md:items-center max-md:flex-col-reverse max-md:w-full gap-5"
        >
          <Button
            @click="submit"
            :loading="formLoading"
            :disabled="!captchaToken"
            variant="primary"
            class="mt-2 text-lg px-[100px]"
          >
            {{ $t("send") }}
          </Button>
          <i18n-t
            keypath="clicking_you_agree_to_the_terms_of_use"
            tag="p"
            class="text-center text-grey-100 text-sm leading-130 flex flex-col items-start"
          >
            <template #terms_of_use>
              <NuxtLink
                to="/pages/terms-of-use"
                class="text-blue transition-300 hover:opacity-70 cursor-pointer"
              >
                {{ $t("terms_of_use") }}
              </NuxtLink>
            </template>
          </i18n-t>
        </div>
      </div>
      <div
        class="col-span-2 lg:col-span-1 p-5 flex flex-col items-stretch max-lg:pt-0"
      >
        <p class="text-2xl leading-130 font-medium mb-4">
          {{ $t("contact_info") }}
        </p>
        <div class="flex flex-col space-y-3">
          <a
            v-for="(link, index) of linkList"
            :key="index"
            :href="link.link"
            class="text-dark-light leading-130 inline-flex items-center hover:text-blue group duration-300"
          >
            <svg
              v-if="link?.icon === 'phone'"
              class="mr-2"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="transition-300 group-hover:fill-blue"
                d="M17.45 22.75C16.32 22.75 15.13 22.48 13.9 21.96C12.7 21.45 11.49 20.75 10.31 19.9C9.14 19.04 8.01 18.08 6.94 17.03C5.88 15.96 4.92 14.83 4.07 13.67C3.21 12.47 2.52 11.27 2.03 10.11C1.51 8.87 1.25 7.67 1.25 6.54C1.25 5.76 1.39 5.02 1.66 4.33C1.94 3.62 2.39 2.96 3 2.39C3.77 1.63 4.65 1.25 5.59 1.25C5.98 1.25 6.38 1.34 6.72 1.5C7.11 1.68 7.44 1.95 7.68 2.31L10 5.58C10.21 5.87 10.37 6.15 10.48 6.43C10.61 6.73 10.68 7.03 10.68 7.32C10.68 7.7 10.57 8.07 10.36 8.42C10.21 8.69 9.98 8.98 9.69 9.27L9.01 9.98C9.02 10.01 9.03 10.03 9.04 10.05C9.16 10.26 9.4 10.62 9.86 11.16C10.35 11.72 10.81 12.23 11.27 12.7C11.86 13.28 12.35 13.74 12.81 14.12C13.38 14.6 13.75 14.84 13.97 14.95L13.95 15L14.68 14.28C14.99 13.97 15.29 13.74 15.58 13.59C16.13 13.25 16.83 13.19 17.53 13.48C17.79 13.59 18.07 13.74 18.37 13.95L21.69 16.31C22.06 16.56 22.33 16.88 22.49 17.26C22.64 17.64 22.71 17.99 22.71 18.34C22.71 18.82 22.6 19.3 22.39 19.75C22.18 20.2 21.92 20.59 21.59 20.95C21.02 21.58 20.4 22.03 19.68 22.32C18.99 22.6 18.24 22.75 17.45 22.75ZM5.59 2.75C5.04 2.75 4.53 2.99 4.04 3.47C3.58 3.9 3.26 4.37 3.06 4.88C2.85 5.4 2.75 5.95 2.75 6.54C2.75 7.47 2.97 8.48 3.41 9.52C3.86 10.58 4.49 11.68 5.29 12.78C6.09 13.88 7 14.95 8 15.96C9 16.95 10.08 17.87 11.19 18.68C12.27 19.47 13.38 20.11 14.48 20.57C16.19 21.3 17.79 21.47 19.11 20.92C19.62 20.71 20.07 20.39 20.48 19.93C20.71 19.68 20.89 19.41 21.04 19.09C21.16 18.84 21.22 18.58 21.22 18.32C21.22 18.16 21.19 18 21.11 17.82C21.08 17.76 21.02 17.65 20.83 17.52L17.51 15.16C17.31 15.02 17.13 14.92 16.96 14.85C16.74 14.76 16.65 14.67 16.31 14.88C16.11 14.98 15.93 15.13 15.73 15.33L14.97 16.08C14.58 16.46 13.98 16.55 13.52 16.38L13.25 16.26C12.84 16.04 12.36 15.7 11.83 15.25C11.35 14.84 10.83 14.36 10.2 13.74C9.71 13.24 9.22 12.71 8.71 12.12C8.24 11.57 7.9 11.1 7.69 10.71L7.57 10.41C7.51 10.18 7.49 10.05 7.49 9.91C7.49 9.55 7.62 9.23 7.87 8.98L8.62 8.2C8.82 8 8.97 7.81 9.07 7.64C9.15 7.51 9.18 7.4 9.18 7.3C9.18 7.22 9.15 7.1 9.1 6.98C9.03 6.82 8.92 6.64 8.78 6.45L6.46 3.17C6.36 3.03 6.24 2.93 6.09 2.86C5.93 2.79 5.76 2.75 5.59 2.75ZM13.95 15.01L13.79 15.69L14.06 14.99C14.01 14.98 13.97 14.99 13.95 15.01Z"
                fill="#A2ABBE"
              />
            </svg>
            <span
              v-else
              class="text-grey-100 text-2xl leading-[24px] mr-2 group-hover:text-blue duration-300"
              :class="link.icon"
            />
            {{ link.title }}
          </a>
        </div>

        <div
          class="relative w-full h-[190px] mt-4 rounded-xl overflow-hidden"
          data-aos="zoom-out"
        >
          <img
            :src="`https://static-maps.yandex.ru/1.x/?ll=${location.long},${location.lat}&size=650,350&z=15&l=map&pt=${location.long},${location.lat},org`"
            alt="RepublicMap image"
            class="absolute inset-0 h-[190px] w-full object-cover"
          />
          <a
            target="_blank"
            :href="addressLink"
            class="bg-blue text-white pl-3 pr-4 py-2 rounded-md border border-solid border-light border-opacity-[16%] text-sm leading-[18px] font-medium text-light absolute right-3 bottom-3 z-[2] transition-300 hover:bg-opacity-90 flex-y-center gap-2"
          >
            <span class="icon-paper-plane" />{{ $t("how_to_go") }}
          </a>
        </div>
      </div>
    </form>
    <CommonModal :show="showSuccessModal">
      <CommonModalSuccess
        @close="showSuccessModal = false"
        :description="$t('your_request_for_contact_has_been_sent')"
      />
    </CommonModal>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { isValidPhone } from "~/utils";
import * as pkg from "vue-toastification";
import { VueRecaptcha } from "vue-recaptcha";
import { required } from "@vuelidate/validators";
import { useContactStore } from "~/store/contact";
const { useToast } = pkg;

const { t: $t } = useI18n();
const contact = useContactStore().contactInfo;
const formLoading = ref(false);
const showSuccessModal = ref(false);
const siteKey = import.meta.env.VITE_APP_SITE_KEY;
const captchaToken = ref();

function verifyMethod(response: any) {
  captchaToken.value = response;
}

function expiredMethod() {
  captchaToken.value = null;
}

const form = useForm(
  {
    full_name: "",
    phone_number: "",
    message: "",
  },
  {
    full_name: { required },
    phone_number: { required, isValidPhone },
    message: { required },
  }
);

const addressLink = computed(
  () =>
    `https://www.google.com/maps/@${contact?.location.replace(";", ",")},17z`
);
const location = computed(() => {
  return {
    lat: contact?.location.split(";")[0],
    long: contact?.location.split(";")[1],
  };
});

// const callbackVerify = (token: string) => {
//   captchaToken.value = token;
// };
// const callbackExpired = () => {
//   captchaToken.value = "";
// };

const submit = async () => {
  const token = await useRecaptcha("check_code");
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    formLoading.value = true;
    useApi()
      .$post("v1/contact/aplication/", {
        headers: {
          "captcha-security": token,
        },
        body: {
          ...form.values,
          phone_number: `${form.values.phone_number?.replaceAll(" ", "")}`,
        },
      })
      .then(() => {
        showSuccessModal.value = true;
        form.values.full_name = "";
        form.values.phone_number = "";
        form.values.message = "";
        form.$v.value.$reset();
        formLoading.value = false;
      })
      .catch(() => {
        useToast().error($t("error"));
      });
  } else {
    useToast().error($t("make_sure_everything_is_correct"));
  }
};

const linkList = computed(() => [
  {
    title: contact?.email,
    icon: "icon-sms",
    link: `mailto: ${contact?.email}`,
  },
  {
    title: formatPhoneNumber(contact?.phone_number ?? ""),
    icon: "phone",
    link: `tel: ${contact?.phone_number}`,
  },
  {
    title: contact?.address,
    icon: "icon-location",
    link: addressLink.value,
  },
]);
const links = [
  {
    title: $t("contact_with_us"),
    url: "/contact",
  },
];
useHead({
  title: `${$t("contact_with_us")} | Ona foundation`,
});
</script>
