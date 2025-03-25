<template>
  <nuxt-link
    to="/pages/privacy-policy"
    class="fixed bottom-10 right-8 md:right-10 z-20 cursor-pointer"
  >
    <div class="lefter group">
      <span class="animate-2nd duration-200 block group-hover:hidden" />
      <div
        class="bg-[#30A1DB] h-max w-max p-[12px] rounded-full cursor-pointer z-[3] relative"
      >
        <img class="image" src="~/assets/svg/warning.svg" alt="warning" />
      </div>
      <div class="overlay">
        <div
          class="text text-white font-semibold text-[16px] e:text-[20px]"
        >
          {{ $t("beware_of_scams") }}
        </div>
      </div>
    </div>
  </nuxt-link>
</template>
<style scoped>
.animate-2nd {
  background: rgba(48, 161, 219, 0.24);
  border-radius: 50%;
  position: absolute;
  width: 80px;
  height: 80px;
  z-index: 3;
  animation: pulse 2s infinite;
  pointer-events: none !important;
  top: -13px;
  left: -13px;
}

@keyframes pulse {
  0% {
    transform: scale(0.7);
  }
  70% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(0.7);
  }
}

.image {
  display: block;
}

.overlay {
  position: absolute;
  bottom: 0;
  right: 0;
  left: -281px;
  background-color: #30a1db;
  border-bottom-left-radius: 46px;
  border-top-left-radius: 46px;
  overflow: hidden;
  width: 0;
  height: 54px;
  transition: 0.5s ease;
}

.lefter:hover .overlay {
  right: 0;
  width: 304px;
}

.text {
  color: white;
  font-size: 18px;
  position: absolute;
  top: 50%;
  left: 50%;
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  white-space: nowrap;
}
</style>