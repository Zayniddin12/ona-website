<template>
  <div class="sticky top-0 z-30">
    <LayoutHeaderWidget :is-open-on-init="widget" />
    <div
      class="border-b relative lg:py-2 z-11 transition-300"
      :class="[
        { 'header-sticky': y > 20 },
        dark && !fullMenu
          ? 'bg-transparent border-white/10'
          : 'bg-white border-grey-300',
      ]"
    >
      <div class="container py-2 md:py-0 flex-between items-sticky">
        <button
          @click="openFullMenu"
          type="button"
          class="lg:hidden flex-center w-6"
        >
          <Transition name="fade" mode="out-in">
            <i v-if="fullMenu" class="icon-close-mark text-lg" />
            <i
              v-else
              class="icon-menu text-2xl leading-6"
              :class="dark && y < 20 ? 'text-white' : 'text-dark'"
            />
          </Transition>
        </button>
        <NuxtLink
          @click="toTop"
          to="/"
          class="flex-center max-w-[62px] transition-300"
        >
          <CommonImage
            :src="`/images/${
              dark && !fullMenu && y < 20 ? 'footer' : 'header'
            }-logo.svg`"
            alt="logo"
            class="w-auto h-auto"
          />
        </NuxtLink>
        <nav class="flex-y-center gap-5 max-lg:hidden">
          <div
            v-for="(item, index) in menu"
            :key="index"
            class="relative flex items-center h-12 group"
          >
            <NuxtLink
              :to="item?.link"
              class="text-sm menu-hover hover:cursor-pointer leading-5 font-450 hover:text-blue transition-300"
              :class="
                dark ? (y < 20 ? 'text-white' : 'text-dark') : 'text-dark'
              "
              active-class="!text-blue pointer-events-none"
            >
              {{ $t(item?.title) }}
            </NuxtLink>
            <div
              v-if="item?.subMenu"
              class="flex flex-col invisible w-[170px] max-w-[178px] border border-gray-200 shadow-dropDown transition-300 group-hover:visible group-hover:opacity-100 opacity-0 absolute translate-y-[50px] group-hover:translate-y-0 top-full left-0 bg-white rounded-lg z-50"
            >
              <NuxtLink
                v-for="(subItem, subIndex) in item?.subMenu"
                :key="subIndex"
                :to="subItem.link"
                class="block py-1.5 px-[14px] font-medium text-sm w-full leading-5 text-dark hover:bg-gray-100 transition-300"
              >
                {{ $t(subItem.title) }}
              </NuxtLink>
            </div>
          </div>
        </nav>
        <div class="py-3 flex-center gap-4">
          <CommonLangSwitcher :dark="dark && !fullMenu && y < 20" />
          <button
            type="button"
            @click="openWidget"
            aria-label="widget"
            class="w-9 h-9 max-sm:hidden flex-center text-3xl text-white cursor-pointer transition-300"
          >
            <Transition name="fade" mode="out-in">
              <i
                v-if="widget"
                class="icon-close-mark text-lg leading-[18px] text-blue"
              />
              <i v-else class="icon-widget text-blue" />
            </Transition>
          </button>
          <!--          <NuxtLink-->
          <!--            v-if="route.path !== '/'"-->
          <!--            to="/help"-->
          <!--            :id="route.path === '/' ? 'help' : ''"-->
          <!--            class="h-10 max-md:hidden font-medium text-sm leading-115 px-4 flex-center transition-300 text-white rounded-lg"-->
          <!--            :class="-->
          <!--              dark && y < 20-->
          <!--                ? 'bg-white/[0.16] hover:bg-white/30'-->
          <!--                : 'bg-red-100 hover:bg-red'-->
          <!--            "-->
          <!--          >-->
          <!--            <i class="icon-heart text-base mr-2"></i>-->
          <!--            {{ $t("donations") }}-->
          <!--          </NuxtLink>-->
          <a
            href="/#help"
            class="h-10 max-md:hidden font-medium text-sm leading-115 px-4 flex-center transition-300 text-white rounded-lg"
            :class="
              dark && y < 20
                ? 'bg-white/[0.16] hover:bg-white/30'
                : 'bg-red-100 hover:bg-red'
            "
          >
            <i class="icon-heart text-base mr-2"></i>
            {{ $t("donations") }}
          </a>
        </div>
      </div>
    </div>
    <LayoutHeaderFullMenu
      :open-menu="fullMenu"
      v-bind="{ menu, phone }"
      @close="fullMenu = false"
    />
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from "@vueuse/core";
import { useRoute } from "vue-router";
interface Props {
  dark?: boolean;
}
defineProps<Props>();
const emit = defineEmits<{
  (e: "open-widget"): void;
}>();

const { y } = useWindowScroll();
const route = useRoute();

const fullMenu = ref(false);
const openFullMenu = () => {
  fullMenu.value = !fullMenu.value;
};

const widget = ref(false);
const openWidget = () => {
  widget.value = !widget.value;
  emit("open-widget");
};

const toTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

const phone = "+998909605530";
const menu = [
  {
    title: "about_us",
    link: "/about",
    subMenu: [
      {
        title: "about_fond",
        link: "/about",
      },
      {
        title: "management",
        link: "/management",
      },
      {
        title: "report_audit",
        link: "/report-audit",
      },
    ],
  },
  {
    title: "our_programs",
    link: "/programs",
  },
  {
    title: "how_can_help",
    link: "/partners",
  },
  {
    title: "get_help",
    link: "/help",
  },
  {
    title: "contact",
    link: "/contact",
  },
  {
    title: "news",
    link: "/news",
  },
];
</script>

<style scoped>
.header-sticky {
  background: rgba(255, 255, 255, 0.8);
  box-shadow: 0 4px 25px rgba(28, 31, 32, 0.1);
  backdrop-filter: blur(35px);
}
</style>
