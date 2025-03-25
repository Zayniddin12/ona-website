<template>
  <Teleport to="body">
    <transition name="fade">
      <div
        v-if="show"
        class="ModalBg fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[1000]"
      />
    </transition>

    <transition name="bounceIn">
      <div
        v-if="show"
        id="ModalBg"
        :class="[
          bodyClass,
          animationIn ? 'animated' : '',
          'fixed top-[0%] right-[0] w-full h-screen flex items-center justify-center z-[1001] p-[15vh_auto_50px] overflow-auto',
        ]"
      >
        <div
          id="Modal"
          class="Modal bg-white w-full rounded-2xl relative border border-solid border-grey-300"
          :class="[
            maxWidth ? 'max-w-[676px]' : 'max-w-[440px]',
            bodyWrapperClass,
          ]"
        >
          <slot name="header">
            <div
              v-if="title"
              class="flex items-center justify-between w-full px-5 py-4 border-b border-grey-300 relative"
              :class="[headerClass, textCenter]"
            >
              <div class="flex-y-center gap-2">
                <slot name="pre-title" />
                <h5
                  class="text-dark text-2xl font-medium leading-130"
                  :class="textStyle"
                >
                  {{ title }}
                </h5>
              </div>
              <button class="group" @click.stop="close()">
                <i
                  class="icon-close-mark text-base group-hover:text-red transition-300"
                />
              </button>
            </div>
          </slot>
          <button
            v-if="!title"
            class="absolute group -top-16 md:top-0 right-0 md:-right-16 cursor-pointer modal-close bg-dark-500 w-10 h-10 rounded-lg flex items-center justify-center"
            @click.stop="close()"
          >
            <i
              class="icon-cancel text-light text-3xl transition-300 group-hover:text-grey-100"
            ></i>
          </button>
          <div :class="contentClass" class="p-5 pt-2">
            <slot />
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script setup lang="ts">
import { watch, ref, onMounted, onBeforeUnmount } from "vue";

interface Props {
  show: boolean;
  title?: string;
  contentClass?: string;
  bodyClass?: string;
  maxWidth?: boolean;
  bodyWrapperClass?: string;
  closeOnBackdrop?: boolean;
  headerClass?: string;
  textStyle?: string;
  textCenter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  title: "",
  contentClass: "",
  bodyClass: "px-4",
  closeOnBackdrop: true,
});

watch(
  () => props.show,
  (first) => {
    const body = document.body;
    if (first) {
      body.classList.add("overflow-hidden");
    } else {
      body.classList.remove("overflow-hidden");
    }
  }
);
const emit = defineEmits(["close"]);
function close() {
  emit("close");
}
let animationIn = ref(false);

const onMousedown = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;

  if (
    target.id !== "Modal" &&
    target.id === "ModalBg" &&
    props.closeOnBackdrop
  ) {
    animationIn.value = true;
    setTimeout(() => {
      animationIn.value = false;
    }, 500);
  }
};
const keydown = (event: KeyboardEvent) => {
  if (event.code === "Escape") {
    close();
  }
};

onMounted(() => {
  document?.addEventListener("mousedown", onMousedown);
  document?.addEventListener("keydown", keydown);
});
onBeforeUnmount(() => {
  document?.removeEventListener("mousedown", onMousedown);
  document?.removeEventListener("keydown", keydown);
});
</script>
<style>
#Modal {
  box-shadow: 0 5px 30px 0 rgba(0, 0, 0, 10%);
}
.ModalBg {
  background: rgba(28, 31, 32, 0.8);
}
.animated {
  animation: animatedIn 0.4s ease-in-out;
}

.clearfix:before,
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  overflow: hidden;
}
.clearfix:after {
  clear: both;
}
.clearfix {
  zoom: 1;
} /* IE < 8 */

@keyframes animatedIn {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  70% {
    transform: scale(0.95);
  }
}
.modal-close svg circle, .modal-close svg path {
  transition: 0.3s ease-in-out;
}
.modal-close:hover svg circle {
  stroke: #fa0738;
  opacity: 1;
}
/*.modal-close:hover svg path {*/
/*  stroke: #fa0738;*/
/*}*/
</style>
