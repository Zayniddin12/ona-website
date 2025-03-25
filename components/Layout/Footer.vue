<template>
  <div class="bg-dark-100">
    <div class="container">
      <div class="flex flex-col items-center pb-6">
        <NuxtLink
          @click="toTop"
          to="/"
          class="w-auto h-auto rounded-b-[20px] bg-white/[0.08] mx-auto inline-flex justify-center pt-[14px] px-6 pb-5"
        >
          <img src="/images/footer-logo.svg" alt="Logo" loading="lazy" />
        </NuxtLink>
        <p
          class="md:max-w-[45%] mx-auto text-center mb-6 mt-4 text-base text-white leading-140"
        >
          {{ $t("footer_desc") }}
        </p>
        <div
          class="inline-flex max-md:flex-col md:items-center md:justify-center py-2 px-3 border border-white/10 rounded-lg"
        >
          <div class="flex-y-center gap-2 max-md:pb-3 md:pr-5">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20.1393 16.8024C20.1393 17.1324 20.066 17.4716 19.9102 17.8016C19.7543 18.1316 19.5527 18.4433 19.2868 18.7366C18.8377 19.2316 18.3427 19.5891 17.7835 19.8183C17.2335 20.0474 16.6377 20.1666 15.996 20.1666C15.061 20.1666 14.0618 19.9466 13.0077 19.4974C11.9535 19.0483 10.8993 18.4433 9.85433 17.6824C8.80016 16.9124 7.801 16.0599 6.84766 15.1158C5.9035 14.1624 5.051 13.1633 4.29016 12.1183C3.5385 11.0733 2.9335 10.0283 2.4935 8.99242C2.0535 7.94742 1.8335 6.94825 1.8335 5.99492C1.8335 5.37159 1.9435 4.77575 2.1635 4.22575C2.3835 3.66659 2.73183 3.15325 3.21766 2.69492C3.80433 2.11742 4.446 1.83325 5.12433 1.83325C5.381 1.83325 5.63766 1.88825 5.86683 1.99825C6.10516 2.10825 6.316 2.27325 6.481 2.51159L8.60766 5.50909C8.77266 5.73825 8.89183 5.94909 8.97433 6.15075C9.05683 6.34325 9.10266 6.53575 9.10266 6.70992C9.10266 6.92992 9.0385 7.14992 8.91016 7.36075C8.791 7.57158 8.61683 7.79158 8.39683 8.01158L7.70016 8.73575C7.59933 8.83658 7.5535 8.95575 7.5535 9.10242C7.5535 9.17575 7.56266 9.23992 7.581 9.31325C7.6085 9.38658 7.636 9.44158 7.65433 9.49658C7.81933 9.79908 8.1035 10.1933 8.50683 10.6699C8.91933 11.1466 9.35933 11.6324 9.836 12.1183C10.331 12.6041 10.8077 13.0533 11.2935 13.4658C11.7702 13.8691 12.1643 14.1441 12.476 14.3091C12.5218 14.3274 12.5768 14.3549 12.641 14.3824C12.7143 14.4099 12.7877 14.4191 12.8702 14.4191C13.026 14.4191 13.1452 14.3641 13.246 14.2633L13.9427 13.5758C14.1718 13.3466 14.3918 13.1724 14.6027 13.0624C14.8135 12.9341 15.0243 12.8699 15.2535 12.8699C15.4277 12.8699 15.611 12.9066 15.8127 12.9891C16.0143 13.0716 16.2252 13.1908 16.4543 13.3466L19.4885 15.5008C19.7268 15.6658 19.8918 15.8583 19.9927 16.0874C20.0843 16.3166 20.1393 16.5458 20.1393 16.8024Z"
                stroke="#30A1DB"
                stroke-width="1.5"
                stroke-miterlimit="10"
              />
            </svg>
            <a
                v-if="contact?.phone_number"
              :href="`tel:${contact?.phone_number}`"
              class="text-sm leading-140 font-450 hover:text-blue text-white transition-300"
            >
              {{ formatPhoneNumber(contact?.phone_number) }}
            </a>
          </div>
          <div
            class="flex-y-center gap-2 max-md:pt-3 md:pl-5 max-md:border-t md:border-l border-white/10"
          >
            <i class="icon-sms text-[22px] leading-[22px] text-blue" />
            <a
                v-if="contact?.email"
                target="_blank"
              :href="`mailto:${contact?.email}`"
              class="text-sm leading-140 font-450 hover:text-blue text-white transition-300"
            >
              {{ contact?.email }}
            </a>
          </div>
          <!--          <div class="flex-y-center gap-2 max-md:pt-3 md:pl-5">-->
          <!--            <i class="icon-location text-[22px] leading-[22px] text-blue" />-->
          <!--            <a-->
          <!--              :href="addressLink"-->
          <!--              target="_blank"-->
          <!--              class="text-sm leading-140 font-450 hover:text-blue text-white transition-300"-->
          <!--            >-->
          <!--              {{ contact?.address }}-->
          <!--            </a>-->
          <!--          </div>-->
        </div>
      </div>
    </div>
    <div class="bg-white/[0.03] py-3">
      <div class="container flex-center-between max-lg:flex-col gap-3 relative">
        <div
          class="flex flex-col flex-1 lg:flex-row gap-3 items-center text-center md:text-start"
        >
          <p class="text-sm text-white leading-130 opacity-60">
            {{ $t("copyright") }}
          </p>

          <nuxt-link
            to="/pages/privacy-policy"
            class="text-white text-sm leading-130 hover:text-blue transition-300"
            >{{ $t("privacy_policy") }}</nuxt-link
          >
        </div>
        <div
          class="flex-y-center ml-0 justify-center gap-2 max-md:static max-md:translate-x-0 max-md:translate-y-0"
        >
          <template v-for="(item, index) of socials" :key="index">
            <a
              v-if="item?.link"
              :href="item?.link"
              target="_blank"
              aria-label="social"
              class="text-white hover:bg-blue transition-300 w-7 h-7 flex-center rounded-full bg-white/[0.08] text-3xl leading-7 group relative"
            >
              <i :class="item?.icon" />
              <CommonTooltip>{{ item.social_name }}</CommonTooltip>
            </a>
          </template>
        </div>

        <div
          class="flex-y-center justify-end gap-2 flex-1 text-sm text-white leading-130 my-1"
        >
          {{ $t("developed_by") }}
          <CommonUICLogo />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { socials, useContactStore } from "~/store/contact";

const contact = useContactStore().contactInfo;

const addressLink = computed(
  () =>
    `https://www.google.com/maps/@${contact?.location.replace(";", ",")},17z`
);
const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

onMounted(() => {
  useContactStore().fetchContact();
});
</script>
