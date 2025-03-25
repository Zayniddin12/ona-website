<template>
  <div class="p-5 border border-grey-300 rounded-2xl bg-white">
    <h2 class="text-dark font-medium text-2xl leading-130 mb-3">
      {{ $t("make_donation") }}
    </h2>
    <form @submit.prevent="submitForm" class="flex flex-col gap-4">
      <div class="flex sm:flex-row flex-col gap-4">
        <FormGroup :label="$t('your_name')" for-text="full_name">
          <FormInput
            v-model="form.values.full_name"
            :error="form.$v.value.full_name.$error"
            id="full_name"
            :placeholder="$t('enter_your_name')"
          />
        </FormGroup>
        <FormGroup :label="$t('support_project')">
          <FormInput
              v-if="isSingle"
              :model-value="$t('targeted_assistance')"
              :placeholder="$t('choose_project')"
              :disabled="true"
          />
          <FormSelect
            v-else
            v-model="form.values.donation_project"
            :error="form.$v.value.donation_project.$error"
            :key="form.values.donation_project"
            v-bind="{ list }"
            :placeholder="$t('choose_project')"
            :disabled="isSingle"
            value-key="id"
            label-key="title"
          />
        </FormGroup>
      </div>

      <FormFCheckbox v-model="isAnonim" :label="$t('donate_anonymously')" class="mt-1" />

      <FormGroup
        :label="$t('support_sum')"
        for-text="sum"
        labelWrapper="max-sm:flex-col max-sm:items-start gap-1"
      >
        <FormInput
          v-model="form.values.amount"
          :error="form.$v.value.amount.$error"
          id="sum"
          v-maska="moneyMask"
          :placeholder="$t('enter_support_sum')"
        />
        <template #labelOpposite>
          <div class="flex-y-center gap-2">
            <button
              v-for="(item, index) in sums"
              :key="index"
              type="button"
              class="py-1 px-2.5 text-sm font-medium leading-125 rounded-full hover:bg-blue/20 hover:text-blue transition-300"
              :class="
                form.values.amount === item
                  ? 'bg-blue text-white'
                  : 'text-dark-light bg-grey-300'
              "
              @click="form.values.amount = item"
            >
              {{ item }}
            </button>
          </div>
        </template>
      </FormGroup>
      <FormGroup :label="$t('choose_payment_method')">
        <FormPaymentRadio v-model="form.values.provider" :types="payments" />
        <template #labelOpposite>
          <p
            :class="{
              '!opacity-100 !pointer-events-auto':
                form.$v.value.provider.$error,
            }"
            class="text-sm text-red opacity-0 transition-300 pointer-events-none"
          >
            {{ $t("please_choose_payment_method") }}
          </p>
        </template>
      </FormGroup>
      <div>
        <i18n-t
          keypath="by_donating_you_agree_to_the_terms_of_use"
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
        <Button
          type="submit"
          class="w-full mt-2"
          variant="red"
          :loading="formLoading"
        >
          <div class="flex-y-center gap-2 text-lg">
            {{ $t("donate") }}
            <i class="icon-heart text-2xl leading-6 text-white" />
          </div>
        </Button>
      </div>
    </form>
    <CommonModal :title="modalTitle" :show="modal" @close="closeModal">
      <Transition name="fade" mode="out-in">
        <div :key="modal">
          <DonationFormAddCard
            v-show="step === 'addCard'"
            @add-card="addCard"
          />
          <DonationFormVerification
            v-if="step === 'verification'"
            :phone="orderPhone"
            :error="orderOtpError"
            @send-again="sendAgain"
            @verify="verified"
          />
          <DonationFormSuccess
            v-show="step === 'success'"
            :price="form.values.amount"
            @close="closeModal"
          />
          <DonationFormError v-show="step === 'error'" @close="modal = false" />
        </div>
      </Transition>
      <template v-if="step === 'verification'" #pre-title>
        <i
          @click="step = 'addCard'"
          class="icon-arrow-right rotate-180 text-dark text-lg hover:text-blue transition-300 cursor-pointer"
        />
      </template>
    </CommonModal>
  </div>
</template>

<script setup lang="ts">
import { required, minLength } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import type { ICommonDataResponse, TDonateTypes } from "~/types/common";
type TSteps = "addCard" | "verification" | "success" | "error";
type TOtp = { expire: string; number: string };
import { useRoute } from "vue-router";

import * as pkg from "vue-toastification";

const { useToast } = pkg;
const { t: $t } = useI18n();
const route = useRoute();

const modal = ref(false);
const step = ref<TSteps>("addCard");
const buttonLoading = ref(false);
const orderId = ref(0);
const orderPhone = ref("");
const orderOtpError = ref(false);
const cardInfo = ref<TOtp>();
const isSingle = ref(false);
const isAnonim = ref(false);
const formLoading = ref(false);
const form = useForm(
  {
    full_name: isAnonim.value ? 'Anonim user' : '',
    donation_project: "",
    amount: "",
    provider: "",
  },
  {
    full_name: { requiredIf: () => isAnonim.value},
    donation_project: { required },
    amount: { required, minLength: minLength(5) },
    provider: { required },
  }
);

function closeModal() {
  modal.value = false;
  form.values.full_name = "";
  form.values.donation_project = "";
  form.values.amount = "";
  form.values.provider = "";
  form.$v.value.$reset();
  step.value = "addCard";
}

const submitForm = async () => {
  if(isSingle.value) {
    form.values.donation_project = '3'
  }

  if(isAnonim.value) {
    form.values.full_name = 'Anonim user'
  }

  form.$v.value.$touch();
  if (!form.$v.value.$invalid) {
    formLoading.value = true;
    buttonLoading.value = true;
    const token = await useRecaptcha("check_code");


    useApi()
      .$post("v1/payment/MakeDonation", {
        body: {
          ...form.values,
          amount: +form.values.amount.replaceAll(/\s/g, ""),
        },
        headers: {
          "captcha-security": token,
        },
      })
      .then((res: { payment_url: string; id: number }) => {
        if (form.values.provider !== "card") {
          window.open(res.payment_url, "_blank");
        } else {
          orderId.value = res.id;
          modal.value = true;
        }

        if (res.payment_url) {
          (form.values.full_name = ""),
            (form.values.donation_project = ""),
            (form.values.amount = ""),
            (form.values.provider = "");
          form.$v.value.$reset();
        }
      })
      .finally(() => {
        buttonLoading.value = false;
        formLoading.value = false;
      });
  } else {
    useToast().error($t("fill_all_fields_clear"));
  }
};

const sentOtp = (data: TOtp) => {
  const expiry = data.expire.split("/");
  const token = useRecaptcha("check_code");
  useApi()
    .$post("v1/payment/CardSentOpt", {
      body: {
        order: orderId.value,
        card_number: data.number.replaceAll(" ", ""),
        expire_date: `${expiry[1]}${expiry[0]}`,
      },
      headers: {
        "captcha-security": token,
      },
    })
    .then((res: { otp_sent_phone: string }) => {
      orderPhone.value = res.otp_sent_phone;
      step.value = "verification";
    })
    .catch((err) => {
      if (err._data.error.message === "card_not_found") {
        useToast().error($t("card_not_found"));
      } else {
        useToast().error(err._data.detail);
      }
    });
};

const addCard = (data: TOtp) => {
  cardInfo.value = data;
  sentOtp(data);
};

const verified = (code: string) => {
  const token = useRecaptcha("check_code");
  useApi()
    .$post("v1/payment/CardVerifyOpt", {
      body: {
        order: orderId.value,
        code: code,
      },
      headers: {
        "captcha-security": token,
      },
    })
    .then(() => {
      step.value = "success";
    })
    .catch((err) => {
      if (err.response) {
        if (err._data.error.code === "insufficient_funds") {
          useToast().error($t("insufficient_funds"));
        } else {
          useToast().error($t("wrong_otp"));
          orderOtpError.value = true;
        }
      }
    });
};
const sendAgain = () => {
  if (cardInfo.value) sentOtp(cardInfo.value);
};
const modalTitle = computed(() => {
  if (step.value === "addCard") {
    return $t("enter_card_details");
  } else if (step.value === "verification") {
    return $t("verification");
  }
  return "";
});

const sums = ["50 000", "100 000", "200 000"];
const list = ref<TDonateTypes[]>();
const fetchDonateTypes = () => {
  useApi()
    .$get("v1/payment/DonationProjectList")
    .then((res: ICommonDataResponse<TDonateTypes>) => {
      list.value = res.results;
    });
};
fetchDonateTypes();
const payments = ["payme", "uzum", "click"];

watch(() => route.query?.id, (val) => {
  if (val) {
    return isSingle.value = true;
  }
  isSingle.value = false;
}, { deep: true, immediate: true})
</script>
