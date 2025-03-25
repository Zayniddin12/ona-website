<template>
  <div class="p-5 w-full rounded-2xl bg-white">
    <form @submit.prevent="submitForm" class="flex flex-col gap-5">
      <div class="flex md:flex-row flex-col gap-4">
        <div class="flex flex-col gap-2 w-full">
          <FormInput
            v-model="form.values.full_name"
            :error="form.$v.value.full_name.$error"
            id="full_name"
            :placeholder="$t('your_name')"
          />
          <FormFCheckbox
            v-model="isAnonim"
            :label="$t('donate_anonymously')"
            class="mt-1"
            :checked="isAnonim"
          />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <FormSelect
            v-model="form.values.donation_project"
            :error="form.$v.value.donation_project.$error"
            :key="form.values.donation_project"
            v-bind="{ list }"
            :placeholder="$t('support_project')"
            value-key="id"
            label-key="title"
          />
        </div>
        <div class="flex flex-col gap-2 w-full">
          <div class="flex flex-col gap-2 w-full">
            <FormInput
              v-model="form.values.amount"
              :error="form.$v.value.amount.$error"
              id="sum"
              v-maska="moneyMask"
              :placeholder="$t('enter_support_sum')"
            />
          </div>
          <div class="flex-y-center gap-2">
            <button
              v-for="(item, index) in sums"
              :key="index"
              type="button"
              class="py-1 px-2.5 text-sm font-medium leading-125 rounded-full hover:bg-blue/20 hover:text-blue transition-300 whitespace-nowrap"
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
        </div>
      </div>
      <div
        class="flex flex-col gap-2 w-full border-t border-b border-grey-300 py-5"
      >
        <ClientOnly>
        <FormPaymentRadio
          main-custom-class="lg:grid-cols-4"
          v-model="form.values.provider"
          :types="payments"
          :error="form.$v.value.provider.$error"
        />
        </ClientOnly>
      </div>
      <div class="md:flex items-center justify-between gap-3">
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
        <Button
          type="submit"
          class="w-full md:max-w-[228px] mt-4 md:mt-0"
          variant="blue"
          :loading="formLoading"
        >
          <div class="flex-y-center gap-2 text-lg">
            <i class="icon-heart text-2xl leading-6 text-white" />
            <span class="text-sm">{{ $t("donate") }} </span>
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
import { required, minLength, requiredIf } from "@vuelidate/validators";
import { useI18n } from "vue-i18n";
import type { ICommonDataResponse, TDonateTypes } from "~/types/common";
type TSteps = "addCard" | "verification" | "success" | "error";
type TOtp = { expire: string; number: string };

import * as pkg from "vue-toastification";

const { useToast } = pkg;
const { t: $t } = useI18n();
const modal = ref(false);
const step = ref<TSteps>("addCard");
const buttonLoading = ref(false);
const orderId = ref(0);
const orderPhone = ref("");
const orderOtpError = ref(false);
const cardInfo = ref<TOtp>();
const formLoading = ref(false);
const isAnonim = ref(false);
const form = useForm(
  {
    full_name: "",
    donation_project: "",
    amount: "",
    provider: "",
  },
  {
    full_name: {
      required: requiredIf(function () {
        return !isAnonim.value;
      }),
    },
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

// function removeNameValidation() {
//   if (form.values.full_name === "") {
//     form.$v.value.full_name.$touch();
//   }
// }

const submitForm = async () => {
  form.$v.value.$touch();

  if (!form.$v.value.$invalid) {
    formLoading.value = true;
    buttonLoading.value = true;
    const token = await useRecaptcha("check_code");
    if (isAnonim.value) {
      form.values.full_name = "Anonim user";
    }

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
        console.log(res, "res");
        if (form.values.provider !== "card") {
          window.open(res.payment_url, "_blank");
        } else {
          orderId.value = res.id;
          modal.value = true;
        }

        if (res.payment_url) {
          window.location.reload();
          form.values.full_name = "";
          form.values.donation_project = "";
          form.values.amount = "";
          form.values.provider = "";
          isAnonim.value = false;
          form.$v.value.$reset();
        }
      })
      .finally(() => {
        buttonLoading.value = false;
        formLoading.value = false;
      });
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
const payments = ["payme", "uzum", "click"]; //"card"
</script>
