<template>
  <div
    class="relative group bg-grey-400 flex items-center hover:bg-[#35abb21a] transition duration-300 justify-between pl-3 p-1 h-[36] group sm:max-w-[240px] cursor-pointer rounded-[10px] border border-grey-300"
    @click="copyUrl"
  >
    <span
      class="block whitespace-nowrap line-clamp-1 truncate text-dark font-normal leading-125 text-base"
    >
      {{ copyText }}
    </span>
    <span
      class="w-[28px] h-[28px] shrink-0 transition duration-300 flex items-center justify-center md:ml-2 bg-blue rounded-lg"
    >
      <i class="transition">
        <i class="icon-copy text-lg text-white"></i>
      </i>
    </span>

    <div
      class="absolute bottom-full left-1/2 -translate-x-1/2 transition duration-300"
      :class="[
        show && copied
          ? '!-translate-y-4 !visible !opacity-100'
          : 'invisible opacity-0',
      ]"
    >
      <div
        class="tooltip bg-dark border border-[#4C4C4C] rounded-lg px-4 py-2 text-sm leading-130 text-white relative"
      >
        <!--          <slot></slot>-->
        {{ copyTooltip }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  copyText?: string;
  copyTooltip?: string;
  show?: boolean;
}
//
const props = withDefaults(defineProps<Props>(), {
  copyText: "Скопировать ссылку ",
  copyTooltip: "copied",
});
import { ref } from "vue";

const copied = ref();
function copyUrl() {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.value = window.location.href;
  input.select();
  input.focus();
  document.execCommand("copy");
  input.remove();
  copied.value = true;

  setTimeout(() => {
    copied.value = false;
  }, 1500);
}
</script>

<style scoped>
.text-wrapper {
  border-radius: 8px 0 0 8px;
}

.icon-wrapper {
  border-radius: 0 8px 8px 0;
}
.tooltip-custom {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}
.tooltip {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.tooltip::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -1px) rotate(180deg);
  width: 20px;
  height: 9px;
  background: #1C1F20;
  clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
}
</style>
