<template>
  <button
    v-bind="{ disabled, type }"
    class="button rounded-lg py-2.5 flex-y-center cursor-pointer transition-300 relative px-3"
    :style="{ '--spinnerColor': spinnerColor }"
    :class="[{ 'pointer-events-none': loading }, `button-${variant}`]"
    @click.stop="$emit('onClick')"
  >
    <i
      v-if="loading"
      :class="[
        'transition-300 absolute-center',
        loading ? 'opacity-100 visible' : 'opacity-0 invisible',
      ]"
    >
      <svg class="circular-loader" viewBox="25 25 50 50">
        <circle
          class="circular-loader__path"
          cx="50"
          cy="50"
          r="20"
          fill="none"
        />
      </svg>
    </i>
    <div :class="textStyle">
      <slot name="pre-icon"></slot>
      <slot>
        {{ text }}
      </slot>
      <slot name="post-icon"></slot>
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type TButtonVariants =
  | "primary"
  | "secondary"
  | "green"
  | "red"
  |  "blue"
  | "transparent";

interface Props {
  text?: string;
  textClass?: string;
  spinnerColor?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: string;
  variant?: TButtonVariants;
}

const props = withDefaults(defineProps<Props>(), {
  text: "Button",
  textClass: "",
  spinnerColor: "white",
  disabled: false,
  loading: false,
  variant: "primary",
});

const textStyle = computed(() => {
  const labelClass = props.textClass;
  return [
    !props.loading ? "opacity-100 visible" : "opacity-0 invisible",
    "w-full justify-center transition font-medium letter-3 !leading-sm text-sm select-none flex items-center gap-x-1",
    labelClass,
  ];
});
</script>

<style lang="css">
.button:not(:disabled):active {
  transform: scale(0.9);
}

.button:disabled {
  background: #cdcdd0 !important;
  box-shadow: none;
}

.button:not(:disabled):active {
  transform: scale(0.9);
}

.button:disabled {
  cursor: not-allowed;
}

.button:disabled:hover {
  cursor: not-allowed;
  box-shadow: none;
}

.button__shadow {
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.button-text {
  @apply font-medium text-sm leading-[17px] tracking-[-0.3px];
}

.button .circular-loader {
  width: 24px;
  height: 24px;
  stroke: var(--spinnerColor);
}

.button .circular-loader__path {
  fill: none;
  stroke-width: 5px;
  stroke-linecap: round;
  animation: animate-stroke 1s ease-in-out infinite;
}

@keyframes animate-stroke {
  0% {
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 89, 200;
    stroke-dashoffset: -124;
  }
}

.button {
  transition: 0.3s ease all;
}

.button-primary {
  background: #30a1db;
  color: white;
}

.button-primary:hover {
  background: #008bd2;
}

.button-primary-light {
  background: #f7fbfe;
  color: #30a1db;
}

.button-primary-light:hover {
  background: rgba(48, 161, 219, 0.2);
}

.button-secondary {
  background: #ededee;
  color: #1c1f20;
}

.button-secondary .circular-loader {
  stroke: #1c1f20;
}

.button-secondary:hover {
  background: #d0d0d0;
}

.button-green {
  background: #0ec84d;
  color: #fff;
}

.button-green:hover {
  transition: 0.3s ease all;
  background: #0e9c3f;
}
.button-red {
  background: #e64056;
  color: #fff;
}

.button-blue {
  background: #30A1DB;
  color: #fff;
}

.button-blue:hover {
  background: #1199e1;
  color: #fff;
}

.button-red:hover {
  transition: 0.3s ease all;
  background: #e81c37;
}
.button-transparent {
  background: rgba(255, 255, 255, 0.16);
  color: #fff;
}

.button-transparent:hover {
  transition: 0.3s ease all;
  background: rgba(255, 255, 255, 0.3);
}
</style>
