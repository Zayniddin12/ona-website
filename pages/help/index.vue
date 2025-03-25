<template>
  <div class="container !pt-[21px]">
    <BreadCrumb :links="link" />
    <div class="flex items-start space-x-[19px]">
      <div class="w-full">
        <p
          class="text-dark font-bold text-xl sm:text-2xl md:text-[32px] leading-130 mt-[15px]"
        >
          {{ $t("need_help") }}
        </p>
        <div
          v-if="help?.before_application"
          class="mt-6 text-dark leading-130"
          v-html="help?.before_application"
        />
        <div
            class="w-full flex flex-col gap-4 bg-white border border-grey-300 rounded-2xl p-5 shadow-form mt-6"
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
        <CommonModal :show="showSuccessModal">
          <CommonModalSuccess
            @close="showSuccessModal = false"
            :description="$t('your_request_for_contact_has_been_sent')"
          />
        </CommonModal>
        <div v-if="faq?.length" class="pt-6 pb-3 !md:pt-5 !md:pb-10 mb-10">
          <p
            class="text-dark font-medium text-[28px] md:text-[40px] leading-130 mb-4"
          >
            {{ $t("faq") }}
          </p>
          <div class="flex flex-col md:flex-row items-start gap-y-5 gap-x-4">
            <div class="flex flex-col gap-4 w-full md:md-1/2">
              <div
                v-for="(item, index) in faq.slice(0, count)"
                :key="index"
                class="w-full group border transition-300 rounded-xl shadow-collapse col-span-6 md:col-span-1 bg-white"
                :class="
                  selectedItem === item.id
                    ? 'border-blue faq-item-active'
                    : 'border-grey-200/50 faq-item'
                "
              >
                <div
                  class="flex items-center justify-between cursor-pointer py-[15px] md:py-[14px] px-5 border-b transition-300"
                  :class="
                    selectedItem === item.id
                      ? 'border-grey-300'
                      : 'border-transparent'
                  "
                  @click="openItem(item.id)"
                >
                  <h4
                    class="font-[450] text-lg leading-140 text-dark transition-300 group-hover:text-blue line-clamp-1"
                  >
                    {{ item?.question }}
                  </h4>
                  <div class="ml-4">
                    <svg
                      class="transition-300"
                      :class="{ 'rotate-180': selectedItem === item.id }"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        :class="{ 'stroke-blue': selectedItem === item.id }"
                        class="group-hover:stroke-blue transition-300"
                        d="M4.07992 8.90997L10.5999 15.43C11.3699 16.2 12.6299 16.2 13.3999 15.43L19.9199 8.90997"
                        stroke="#A2ABBE"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <CollapseTransition>
                  <div class="p-5 pt-4" v-if="selectedItem === item.id">
                    <p class="font-[400] text-base leading-140 text-dark-light">
                      {{ item.answer }}
                    </p>
                  </div>
                </CollapseTransition>
              </div>
            </div>
            <div class="flex flex-col gap-4 w-full md:md-1/2">
              <div
                v-for="(item, index) in faq.slice(count)"
                :key="index"
                class="group w-full border transition-300 rounded-xl shadow-collapse bg-white"
                :class="
                  selectedItem === item.id
                    ? 'border-blue faq-item-active'
                    : 'border-grey-200/50 faq-item'
                "
              >
                <div
                  class="flex items-center justify-between cursor-pointer py-[15px] md:py-[14px] px-5 border-b transition-300"
                  :class="
                    selectedItem === item.id
                      ? 'border-grey-300'
                      : 'border-transparent'
                  "
                  @click="openItem(item.id)"
                >
                  <h4
                    class="font-[450] text-lg leading-140 text-dark transition-300 group-hover:text-blue line-clamp-1"
                  >
                    {{ item?.question }}
                  </h4>
                  <div class="ml-4">
                    <svg
                      class="transition-300"
                      :class="{ 'rotate-180': selectedItem === item.id }"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        :class="{ 'stroke-blue': selectedItem === item.id }"
                        class="group-hover:stroke-blue transition-300"
                        d="M4.07992 8.90997L10.5999 15.43C11.3699 16.2 12.6299 16.2 13.3999 15.43L19.9199 8.90997"
                        stroke="#A2ABBE"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </div>
                </div>
                <CollapseTransition>
                  <div class="p-5 pt-4" v-if="selectedItem === item.id">
                    <p class="font-[400] text-base leading-140 text-dark-light">
                      {{ item?.answer }}
                    </p>
                  </div>
                </CollapseTransition>
              </div>
            </div>
          </div>
          <Button
            v-if="faqLength !== faq?.length"
            variant="secondary"
            class="mx-auto mt-6"
            @click="moreFaq"
          >
            {{ $t("load_more") }}

            <template #post-icon>
              <span class="icon-arrow-right rotate-90 ml-1" />
            </template>
          </Button>
        </div>
        <div class="!mb-8" v-if="help?.how_to">
          <p
            class="text-dark font-medium text-[28px] md:text-[40px] leading-130 mb-4"
          >
            {{ $t("survey_aid") }}
          </p>
          <div class="faq-html" v-html="help?.how_to" />
          <div
            v-if="help?.app_doc"
            class="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <CardSurvey :doc="help?.app_doc" />
          </div>
        </div>
      </div>
      <div class="max-md:hidden flex flex-col space-y-7">
        <IconCardHelp class="max-lg:max-w-[200px]" />
        <CardAdvertising
          v-if="advertisement?.image"
          :link="advertisement?.link"
          :image="advertisement?.image"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { required } from "@vuelidate/validators";
import { useHelpStore } from "~/store/help";
import { useI18n } from "vue-i18n";
import * as pkg from "vue-toastification";

const { useToast } = pkg;

const { t: $t } = useI18n();
const selectedItem = ref(0);
const openItem = (id: number) => {
  if (selectedItem.value === id) {
    selectedItem.value = 0;
    return;
  }
  selectedItem.value = id;
};

const link = [
  {
    title: $t("need_help"),
    url: "help",
  },
];
const helpTypes = computed(() => useHelpStore().helpTypes);
const showSuccessModal = ref(false);
const formLoading = ref(false);

const filesId = ref([]);


const submit = async () => {
  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    formLoading.value = true;
    for (let i = 0; i < form.values.files?.length; i++) {
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
      .$post("v1/common/partner-aplications/", {
        body: {
          ...form.values,
          doc: filesId.value,
          phone_number: `${form.values.phone_number?.replaceAll(" ", "")}`,
          amount: `${form.values.amount?.replaceAll(" ", "")}`,
        },
        headers: {
          "captcha-security": token,
        },
      })
      .then(() => {
        showSuccessModal.value = true;
        form.values.name = "";
        form.values.phone_number = "";
        form.values.amount = "";
        form.values.files = [];
        form.$v.value.$reset();
      })
      .finally(() => (formLoading.value = false));
  } else {
    if (
      form.values.phone_number?.length < 1 &&
      form.$v.value.phone_number.$error
    ) {
      useToast().error($t("fill_all_fields_clear"));
    }
  }
};

const params = ref({
  limit: 6,
  offset: 0,
});
// const faq = computed(() => useHelpStore().faq);
const count = computed(() => Math.floor(faq.value?.length / 2));
const faqLength = computed(() => useHelpStore().faqCount);
const { data: help } = useAsyncData(() => useHelpStore().fetchHelpPage());
const { data: advertisement } = useAsyncData(() =>
  useHelpStore().fetchAdvertisement()
);
const { data: faq } = useAsyncData(() => useHelpStore().fetchFaq(params.value));
// useHelpStore().fetchFaq(params.value);value
// useHelpStore().fetchHelpTypes();

const moreFaq = () => {
  params.value.offset += params.value.limit;
  useHelpStore().fetchFaq(params.value, true);
};

const form = useForm(
  {
    name: "",
    phone_number: "",

    amount: "",
    files: [],
  },
  {
    name: { required },
    phone_number: { required, isValidPhone },
    amount: { required },
    files: {},
  }
);
useHead({
  title: `${$t("need_help")} | Ona foundation`,
});


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

function openBot() {
  window.open("https://t.me/Ona_foundation_bot", "_blank");
}
</script>
