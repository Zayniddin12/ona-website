<template>
  <Transition name="menu">
    <div
      v-if="openMenu"
      class="absolute w-full z-10 left-0 bg-white top-[60px] h-[calc(100vh_-_60px)] pt-10"
    >
      <div class="container h-full flex flex-col justify-between gap-16">
        <div class="flex flex-col gap-4">
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="font-450 text-sm leading-6 text-dark"
          >
            <NuxtLink @click="$emit('close')" :to="item?.link">
              {{ $t(item?.title) }}
            </NuxtLink>
            <div class="flex mt-4 flex-col gap-4" v-if="item?.subMenu">
              <div
                  v-for="(item, index) in item?.subMenu"
                  :key="index"
                  class="font-450 text-sm leading-6 text-dark"
              >
                <NuxtLink @click="$emit('close')" :to="item?.link">
                  {{ $t(item?.title) }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>

        <div class="pt-4 pb-20 md:pb-28">
          <a
            class="text-2xl font-medium leading-6 text-dark"
            :href="`tel:${contact?.phone_number}`"
          >
            {{ formatPhoneNumber(contact?.phone_number) }}
          </a>
          <div class="flex-y-center gap-2 mt-4">
            <template v-for="(item, index) in socials" :key="index">
              <a
                v-if="item?.link"
                :href="item?.link"
                target="_blank"
                class="text-white w-11 h-11 flex-center rounded-full bg-grey-100 text-5xl leading-7 relative"
              >
                <i :class="item?.icon" />
              </a>
            </template>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { useContactStore } from "~/store/contact";
import { socials } from "~/store/contact";

interface Props {
  menu: { title: string; link: string, subMenu: [] }[];
  phone?: string;
  openMenu: boolean;
}

const props = defineProps<Props>();
defineEmits();

const contact = useContactStore().contactInfo;
watch(
  () => props.openMenu,
  (val) => {
    if (val) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }
);
</script>

<style>
.menu-enter-active,
.menu-leave-active {
  transition: all 0.3s ease-in-out;
}

.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
