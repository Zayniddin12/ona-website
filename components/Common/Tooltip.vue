<template>
  <div
    class="absolute bottom-full left-1/2 -translate-x-1/2 transition-all duration-300 z-3"
    :class="[
      show && withTrigger
        ? '-translate-y-4 visible opacity-100'
        : 'invisible opacity-0 translate-y-0',
      {
        'group-hover:visible group-hover:opacity-100 group-hover:-translate-y-4':
          !withTrigger,
      },
    ]"
  >
    <div
      class="tooltip"
      :style="{
        '--box-shadow': shadowColor,
        '--bg-color': bgColor,
        '--border-color': borderColor,
        '--text-color': textColor,
      }"
      :class="[tooltipClass]"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script setup lang="ts">
import { watch } from "vue";

export interface Props {
  withTrigger?: boolean;
  show?: boolean;
  tooltipClass?: string;
  bgColor?: string;
  shadowColor?: string;
  borderColor?: string;
  textColor?: string;
  timeout?: number;
}
const props = withDefaults(defineProps<Props>(), {
  shadowColor: "rgba(0, 0, 0, 0.2)",
  bgColor: "#1C1F20",
  borderColor: "#4C4C4C",
  textColor: "#fff",
  timeout: 1000,
});
const emit = defineEmits(["hide"]);
watch(
  () => props.show,
  (value) => {
    if (value) {
      setTimeout(() => {
        emit("hide");
      }, props.timeout);
    }
  }
);
</script>
<style scoped>
.tooltip {
  box-shadow: 0 6px 12px var(--box-shadow);
  border: 1px solid var(--border-color);
  background-color: var(--bg-color);
  color: var(--text-color);
  @apply rounded-lg px-4 py-2 text-sm leading-4 relative whitespace-nowrap;
}

.tooltip::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -4px) rotate(45deg);
  width: 10px;
  height: 10px;
  background: #1C1F20;
  border-right: 1px solid var(--border-color);
  border-bottom: 1px solid var(--border-color);
  /*clip-path: polygon(50% 0%, 0% 100%, 100% 100%);*/
  /*border: 1px solid var(--border-color);*/
}
</style>
