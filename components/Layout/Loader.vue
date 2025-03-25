<template>
  <transition name="fade">
    <div
        v-if="loading"
        class="w-full h-screen fixed inset-0 z-[99999] flex-center bg-white"
    >
        <div :class="{  fullSvg }" class="spinner flex-y-center relative"/>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

interface Props {
  customLoading?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  customLoading: undefined,
})

const fullSvg = ref(false)
const loading = ref(true)


onMounted(() => {
  const body = document.body
  body.style.overflow = 'hidden'
  setTimeout(() => {
    fullSvg.value = true
  }, 1000)

  setTimeout(() => {
    fullSvg.value = true
  }, 1000)

  setTimeout(() => {
    body.style.overflow = ''
    loading.value = false
  }, 2000)
})

watch(
    () => props.customLoading,
    (newValue) => {
      if (typeof newValue !== 'undefined') {
        loading.value = newValue
      }
    },
    {
      immediate: true,
    }
)
</script>

<style scoped>
.background-shadow-loader {
  backdrop-filter: blur(28px);
}
@keyframes animateFirstPath {
  0% {
    fill: #52618f;
  }
  100% {
    fill: #a2bcde;
  }
}

.spinner {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: radial-gradient(farthest-side,#31A1DB 94%,#0000) top/9px 9px no-repeat,
  conic-gradient(#0000 30%,#31A1DB);
  -webkit-mask: radial-gradient(farthest-side,#0000 calc(100% - 9px),#000 0);
  animation: spinner-c7wet2 1s infinite linear;
}

@keyframes spinner-c7wet2 {
  100% {
    transform: rotate(1turn);
  }
}
</style>
