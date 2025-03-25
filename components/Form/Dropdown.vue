<template>
  <div
    :class="[
      wrapperClass,
      { 'dropdown-active': opened },
      'dropdown select-none inline-block rounded-md !relative transition duration-150',
    ]"
  >
    <div
      class="flex items-center justify-between gap-1"
      @click.stop="opened = !opened"
    >
      <slot name="head" />
      <div
        v-if="arrow"
        class="flex-center w-4 h-4 transition duration-300 rotate-90"
        :class="[
          full ? 'absolute right-[10px]' : '',
          opened ? '!rotate-[270deg]' : '',
          arrowDisplay ? 'sl:!inline-flex !hidden' : '',
        ]"
      ></div>
    </div>
    <transition name="dropdown">
      <div
        v-if="opened"
        class="dropdown__list overflow-auto top-[116%] absolute w-auto h-auto rounded-lg min-w-[70px] z-10"
        :class="[
          { '!w-full': full },
          {
            '!top-[-800%] !left-0': above,
            'left-0': position === 'left',
            'right-0': position === 'right',
          },
          bodyClass,
        ]"
        @click.capture="handleCloseDropdown"
      >
        <slot name="body">
          <button
            v-for="(item, index) in list"
            :key="index"
            class="pl-3 block w-full text-left transform duration-300 py-2 cursor-pointer flex-y-center gap-2 bg-[#EAF8FE]"
            :class="[
              activeItem === item.value
                ? 'pointer-events-none'
                : 'hover:!bg-blue/30',
            ]"
            @click.stop="$emit('on-handle', item.value)"
            type="button"
          >
            <div class="flex-y-center gap-1">
              <img
                :class="{ '!opacity-100': activeItem === item.value }"
                class="transition-300 opacity-0"
                src="@/assets/svg/done.svg"
                alt="done-illustration"
              />
              <img :src="`/flags/${item.value}.svg`" alt="flag" />
            </div>
            <span class="text-blue text-sm font-semibold leading-130 uppercase">
              {{ item.title }}
            </span>
          </button>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from "vue";
import { useWindowScroll } from "@vueuse/core";

interface Props {
  arrow?: boolean;
  arrowClass?: string;
  full?: boolean;
  removeEvent?: boolean;
  above?: boolean;
  wrapperClass?: string;
  bodyClass?: string;
  arrowDisplay?: boolean;
  close?: boolean;
  disabled?: boolean;
  position?: "right" | "left";
  activeItem?: string;
  list?: {
    title: string;
    value: string;
  }[];
}
const props = withDefaults(defineProps<Props>(), {
  arrow: false,
  full: false,
  removeEvent: false,
  above: false,
  arrowClass: "",
  wrapperClass: "",
  arrowDisplay: false,
  disabled: false,
  position: "right",
});

const emit = defineEmits<{
  (e: "on-toggle", value: boolean): void;
}>();

let opened = ref(false);
watch(opened, (newValue) => emit("on-toggle", newValue));

onMounted(() => {
  if (!props.removeEvent) {
    document.addEventListener("mousedown", hideEvent);
  }
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", hideEvent);
});

watch(
  () => props.removeEvent,
  (newV) => {
    if (newV) {
      document.removeEventListener("mousedown", hideEvent);
    } else {
      document.addEventListener("mousedown", hideEvent);
    }
  }
);

const { y } = useWindowScroll();

watch(
  () => y.value,
  () => {
    opened.value = false;
  }
);
const hideEvent = (e: Event) => {
  const target = e.target as HTMLInputElement;

  if (!target?.closest(".dropdown-active") && opened.value) {
    opened.value = false;
  }
};

function handleCloseDropdown() {
  if (!props.removeEvent) {
    opened.value = !opened.value;
  }
}
</script>

<style scoped>
.dropdown-active .dropdown__list {
  box-shadow: 0 5px 8px rgba(51, 64, 85, 0.04),
    inset 0 -1px 0 rgba(182, 186, 191, 0.2);
  background: #fff;
  opacity: 1;
  transform-origin: top center;
  border: 1px solid #f4f5f7;
}

.dropdown-enter-active {
  animation: dropdown 300ms ease-out;
}
.dropdown-leave-active {
  animation: dropdown 300ms ease-in reverse;
}

@keyframes dropdown {
  0% {
    opacity: 0;
    transform: translateY(-30px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
