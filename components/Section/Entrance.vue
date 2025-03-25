<template>
  <div class="home-bg">
    <div
      class="container py-5 md:py-32 flex flex-col-reverse lg:flex-row items-center justify-between max-w-[1016px] gap-5"
    >
      <div class="col-span-3 md:col-span-2 max-md:order-2 max-w-[582px]">
        <CommonBlockPreloader
          width="582px"
          height="112px"
          border-radius="4px"
          :loading="loading"
        />
        <div v-if="!loading" class="relative">
          <span
            class="absolute hidden lg:flex leading-130 font-450 shadow-hashtag border border-white/[0.12] lef-0 lg:left-[-55px] top-[-25px] lg:top-[-18px] rotate-[-10deg] py-1 px-3 bg-green text-white rounded-[28px]"
            >{{ $t("our_goal_caring") }}
          </span>
          <h1
            class="text-lg sm:text-3lg lg:text-5xl leading-130 text-dark font-bold"
          >
            <span class="bg-blue rounded-lg inline-block mb-1 p-1.5 text-white"
              >{{ highlightsWord.split(" ").slice(0, 2).join(" ") }}
            </span>
            <span>
              {{ highlightsWord.indexOf("-") > 0 ? "" : " -" }}
              {{ highlightsWord.split(" ").slice(2).join(" ") }}</span
            >
          </h1>
        </div>
        <div class="flex items-stretch gap-3 mt-3 md:mt-8 mb-2 md:mb-5">
          <div
            v-if="data?.description"
            id="static-content"
            v-html="data?.description"
            class="text-sm !leading-140 flex flex-col gap-2 text-dark font-normal"
          />
          <div
            v-else
            id="static-content"
            class="text-sm !leading-140 flex flex-col gap-2 text-dark font-normal"
          >
            {{ $t("entrance_description") }}
          </div>
        </div>

        <div
          class="max-w-[332px] hover:cursor-pointer hover:bg-white/[.70] py-3 px-5 bg-white/[0.48] rounded-xl border border-white hover:border-blue group transition-colors"
        >
          <a
            class="flex gap-3 items-center"
            href="https://www.youtube.com/@onafoundationuzbekistan1508"
            target="_blank"
          >
            <p class="font-450 block leading-130 text-sm text-dark">
              {{ $t("follow_from_youtube") }}
            </p>
            <img
              class="aspect-[110/32] w-[110px] h-8"
              src="/images/youtube.svg"
              alt="youtube"
            />
            <div class="w-5 h-5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                class="stroke-grey-100 group-hover:stroke-blue transition-colors"
              >
                  <path
                    d="M10.833 9.1665L18.333 1.6665M18.333 1.6665H13.8799M18.333 1.6665V6.11963"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3337 9.99984C18.3337 13.9282 18.3337 15.8924 17.1133 17.1128C15.8929 18.3332 13.9287 18.3332 10.0003 18.3332C6.07195 18.3332 4.10777 18.3332 2.88738 17.1128C1.66699 15.8924 1.66699 13.9282 1.66699 9.99984C1.66699 6.07147 1.66699 4.10728 2.88738 2.88689C4.10777 1.6665 6.07195 1.6665 10.0003 1.6665"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  />
                <defs>
                  <clipPath id="clip0_2498_26548">
                    <rect width="20" height="20" rx="5" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </a>
        </div>
      </div>
      <div class="max-md:col-span-3 max-md:order-1 max-md:px-16">
        <Transition name="fade" mode="out-in">
          <div
            :key="loading"
            class="flex !w-full gap-1 items-center justify-center"
          >
            <div class="flex flex-col gap-1 py-5 items-center">
              <div v-if="loading" class="max-lg:hidden">
                <CommonBlockPreloader
                  width="350px"
                  height="400px"
                  v-bind="{ loading }"
                  border-radius="10px"
                />
              </div>
              <div class="relative" v-if="!loading">
                <CommonImage
                  src="/images/main-banner.webp"
                  image-class="w-full shrink-0 max-w-[281px]"
                  alt="Banner"
                />
                <div
                  class="absolute left-[30%] w-10 h-10 rounded-full shadow-inset bg-red"
                ></div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TEntrance } from "~/types/common";
import { useI18n } from "vue-i18n";

interface Props {
  data?: TEntrance;
  loading?: boolean;
}
const props = defineProps<Props>();
const { t } = useI18n();

const highlightsWord = computed(() => String(props.data?.tag));

onMounted(() => {
  window.addEventListener("mousemove", parallax);
});

function parallax(e: any) {
  let x = e.clientX;
  let y = e.clientY;
  const windowHeight = window.innerHeight;
  const windowWidth = window.innerWidth;
  x = (x / windowWidth) * 2 - 1;
  y = (y / windowHeight) * 2 - 1;
  const elements = document.querySelectorAll("[data-parallax]");
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement;
    const elementX: any = element.getAttribute("data-parallax-x") || 20;
    const elementY: any = element.getAttribute("data-parallax-y") || 20;
    element.style.transform = `translateX(${x * elementX + "px"}) translateY(${
      y * elementY + "px"
    })`;
  }
}

if (process.client) {
  window.addEventListener("resize", () => {
    const screenWidth = window.innerWidth;

    const parentContainer = document.getElementById("static-content");

    if (parentContainer) {
      const elementsWithFontSize18px = parentContainer.querySelectorAll(
        '[style="font-size:18px"]'
      );
      const spansWithFontFamily = parentContainer.querySelectorAll("span");

      elementsWithFontSize18px.forEach((element) => {
        if (screenWidth < 600) {
          element.style.fontSize = "16px";
        } else {
          element.style.fontSize = "32px";
        }
      });

      spansWithFontFamily.forEach((span) => {});
    }
  });

  window.dispatchEvent(new Event("resize"));
}
</script>

<style scoped>
.main-quote-border:before {
  content: url("@/assets/svg/trapetsia.svg");
  position: absolute;
  top: -17.3px;
  left: -2.5px;
  width: 5px;
  height: 10px;
}

.main-quote-border:after {
  content: url("@/assets/svg/trapetsia.svg");
  transform: rotate(180deg);
  position: absolute;
  bottom: -16.7px;
  right: -2.5px;
  width: 5px;
  height: 10px;
}
</style>
