<template>
  <div class="home-bg">
    <div class="container flex flex-col py-4 md:py-8 gap-y-8 items-center">
      <SectionDonationStatistics data-aos="fade-left" v-bind="{ statistics }" />
      <CommonTabGroup v-model="activeTab" :list="formTabList" />
      <SectionMakeDonationMain
        v-if="activeTab === 'help'"
        data-aos="fade-right"
        style="box-shadow: 0 14px 30px rgba(28, 31, 32, 0.06)"
      />
      <template v-if="activeTab === 'get-help'">
        <div
          class="w-full flex flex-col gap-4 bg-white border border-grey-300 rounded-2xl p-5 shadow-form"
        >
          <i18n-t
            keypath="send_our_bot"
            tag="h3"
            class="text-dark mb-4 text-xl font-bold md:text-2xl lg:text-2xl !leading-130"
          >
            <template #bot>
              <a
                href="https://t.me/Ona_foundation_bot"
                target="_blank"
                class="text-blue font-bold"
              >
                @Ona_foundation_bot
              </a>
            </template>
          </i18n-t>
          <ul class="flex flex-col gap-2 mb-4 pl-2 md:pl-4">
            <li
              v-for="(item, i) in botTextList"
              :key="i"
              class="flex items-center gap-2"
            >
              <span class="w-2 h-2 bg-blue" />
              <span>{{ item }}</span>
            </li>
          </ul>

          <div class="mx-auto w-400px text-center">
            <Button
              @click="openBot"
              variant="primary"
              class="mt-2 text-lg px-[100px]"
            >
              {{ $t("go_to_bot") }}
            </Button>
          </div>
        </div>
      </template>
      <template v-if="activeTab === 'become-help'">
        <div class="w-full">
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
                  v-model="formPartners.values.name"
                  :error="formPartners.$v.value.name.$error"
                  :placeholder="$t('enter_your_name')"
                />
              </FormGroup>
              <FormGroup
                :label="$t('phone_number')"
                class="col-span-2 md:col-span-1"
              >
                <FormPhoneNumber
                  v-model="formPartners.values.phone"
                  :error="formPartners.$v.value.phone?.$error"
                />
              </FormGroup>
            </div>
              <FormGroup
                :label="$t('organization_name')"
                class="col-span-2 md:col-span-1"
              >
                <FormInput
                  v-model="formPartners.values.organization"
                  :error="formPartners.$v.value.organization.$error"
                  :placeholder="$t('enter_name')"
                />
              </FormGroup>
            <div class="col-span-2 md:col-span-1">
              <div class="flex-y-center justify-between mb-2">
                <FormLabel :label="$t('message')" />
                <p class="text-xs text-[#A2ABBE] leading-125 ml-1">
                  {{ formPartners.values.message?.length }}/2000
                </p>
              </div>

              <FormTextArea
                v-model="formPartners.values.message"
                :error="formPartners.$v.value.message.$error"
                :maxlength="2000"
                :placeholder="$t('message')"
              />
            </div>

            <div
              class="flex md:items-center max-md:flex-col-reverse max-md:w-full gap-5"
            >
              <Button
                @click="submitPartners"
                variant="primary"
                class="mt-2 text-lg px-[100px]"
                :loading="formLoading"
              >
                {{ $t("send") }}
              </Button>
              <i18n-t
                  keypath="click_to_button"
                  tag="p"
                  class="text-center text-grey-100 text-sm leading-130"
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
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TStatistics } from "~/types/common";
import { useI18n } from "vue-i18n";
import { required } from "@vuelidate/validators";
import { useHelpStore } from "~/store/help";
import * as pkg from "vue-toastification";

import { isValidPhone } from "~/utils";
import { useHandleError } from "~/composables/useHandleError";

const { useToast } = pkg;
interface Props {
  statistics: TStatistics;
}
defineProps<Props>();

const { handleError } = useHandleError();
const { t: $t } = useI18n();
const helpTypes = computed(() => useHelpStore().helpTypes);
const showSuccessModal = ref(false);
const formLoading = ref(false);

function openBot() {
  window.open("https://t.me/Ona_foundation_bot", "_blank");
}

const filesId = ref([]);

const form = useForm(
  {
    full_name: "",
    phone_number: "",
    address: "",
    amount: "",
    files: [],
  },
  {
    full_name: { required },
    phone_number: { required, isValidPhone },
    amount: { required },
    files: {},
  }
);

// Parterns form
const formPartners = useForm(
  {
    name: "",
    phone: "",
    organization: "",
    message: "",
  },
  {
    name: { required },
    phone: { required, isValidPhone }, //, minLength: minLength(3)
    organization: { required },
    message: { required },
  }
);

const submit = async () => {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    formLoading.value = true;
    for (let i = 0; i < form.values.files.length; i++) {
      const formData = new FormData();
      formData.append("file", form.values.files[i]);
      const token = await useRecaptcha("check_code");
      await useApi()
        .$post("v1/help/fileupload/", {
          body: formData,
          headers: {
            "captcha-security": token,
          },
        })
        .then((res) => {
          filesId.value.push(res.id);
        });
    }
    const token = await useRecaptcha("check_code");
    useApi()
      .$post("v1/help/application/", {
        body: {
          ...form.values,
          doc: filesId.value,
          phone_number: `+998${form.values.phone_number?.replaceAll(" ", "")}`,
          amount: `${form.values.amount?.replaceAll(" ", "")}`,
        },
        headers: {
          "captcha-security": token,
        },
      })
      .then(() => {
        showSuccessModal.value = true;
        form.values.full_name = "";
        form.values.phone_number = "";
        form.values.amount = "";
        form.values.files = [];
        form.$v.value.$reset();
      })
      .finally(() => (formLoading.value = false));
  } else {
    if (
      form.values.phone_number.length < 1 &&
      form.$v.value.phone_number.$error
    ) {
      useToast().error($t("fill_all_fields_clear"));
    }
  }
};

// Partners submit form

const submitPartners = async () => {
  console.log(formPartners.$v.value, "formPartners.$v.value.$error");
  formPartners.$v.value.$touch();
  if (!formPartners.$v.value.$invalid) {
    formLoading.value = true;
    const token = await useRecaptcha("check_code");
    useApi()
      .$post("v1/common/partner-aplications/", {
        headers: {
          "captcha-security": token,
        },
        body: {
          ...formPartners.values,
          phone: `${formPartners.values.phone?.replaceAll(" ", "")}`,
        },
      })
      .then(() => {
        showSuccessModal.value = true;
        formPartners.values.name = "";
        formPartners.values.phone = "";
        formPartners.values.organization = "";
        formPartners.values.message = "";
        formLoading.value = false;
      })
      .catch((e) => {
        handleError(e);
      })
      .finally(() => {
        formPartners.$v.value.$reset();
        formLoading.value = false;
      });
  } else {
    useToast().error($t("fill_all_fields_clear"));
  }
};

const activeTab = ref("help");

const formTabList = ref([
  {
    label: $t("tab_help"),
    value: "help",
  },
  {
    label: $t("tab_get_help"),
    value: "get-help",
  },
  {
    label: $t("tab_become_friend"),
    value: "become-help",
  },
]);

const botTextList = ref([
  $t("fio"),
  $t("born"),
  $t("request_goal"),
  $t("need_help_type"),
  $t("full_address"),
  $t("who_needs_help"),
  $t("contacts"),
  $t("application_date"),
]);
</script>
