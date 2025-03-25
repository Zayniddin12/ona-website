<script setup lang="ts"></script>

<template>
  <div class="container">
    <div
      class="bg-grey-300 flex flex-col lg:flex-row gap-5 lg:items-center justify-between p-5 md:px-10 lg:pr-24 md:py-9 rounded-2xl relative"
    >
      <div class="max-w-[534px]">
        <div class="flex items-center relative">
          <i18n-t
            keypath="to_be"
            tag="p"
            class="text-dark flex flex-col font-bold text-2xl lg:text-[48px] leading-130"
          >
            <template #text>
              <span
                class="text-white z-10 bg-blue px-1 rounded-lg font-bold leading-130"
              >
                {{ $t("our_friend") }}
              </span>
            </template>
          </i18n-t>
          <img
            class="absolute top-[10px] z-0 hidden xl:flex right-0 translate-x-[62%]"
            src="/images/indicator.svg"
            alt="indicator"
          />
        </div>

        <p class="mt-6 text-dark-light text-sm font-450 leading-140">
          {{ $t("our_friend_info") }}
        </p>
      </div>
      <div class="relative md:min-h-[180px] md:max-h-[190px]">
        <CommonImage
          class="aspect-[289/180] shrink-0 object-cover hidden md:block"
          src="/images/arrived.webp"
          alt="We arrived"
        />
      </div>
      <NuxtLink
        class="sm:max-w-[233px] w-full md:absolute right-[44px] bottom-9 flex"
        to="/partners"
      >
        <Button
          variant="transparent"
          class="backdrop-blur w-full group transition-300 hover:!bg-white !text-sm !bg-white/[.80] gap-1"
          text-class="!font-semibold !text-dark !text-sm"
        >
          {{ $t("more") }}
          <i
            class="icon-chevron-right text-blue flex items-center transition-300 justify-center w-5 h-5 group-hover:translate-x-[3px]"
          ></i>
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped></style>
