<template>
  <collapse-transition>
    <div
      v-if="isOpenOnInit"
      class="widget-outer animation-all relative hidden lg:block bg-white border-b border-grey-300"
    >
      <div class="container">
        <div class="!w-full widget__window">
          <div class="py-5 grid grid-cols-12 gap-5 special-box">
            <div class="col-span-8 flex items-center gap-6 h-[110px]">
              <button
                class="with-color background-image uppercase w-full h-full rounded border-[3px] hover:border-[#1385FA] transition duration-300"
                :class="
                  settings.mode === 'with-color'
                    ? 'border-[#1385FA]'
                    : 'border-transparent'
                "
                @click="settings.mode = 'with-color'"
              >
                <!--  Todo: tarjima-->
                <span
                  class="text-[32px] leading-10 px-2 bg-white rounded border-[3px] transition duration-300"
                  :class="
                    settings.mode === 'with-color'
                      ? 'border-[#1385FA]'
                      : 'border-transparent'
                  "
                >
                  {{ $t("widget.colorful") }}
                </span>
              </button>
              <button
                class="without-color background-image uppercase w-full h-full rounded border-[3px] hover:border-[#1385FA] transition duration-300 grayscale"
                :class="
                  settings.mode === 'without-color'
                    ? 'border-[#1385FA]'
                    : 'border-transparent'
                "
                @click="settings.mode = 'without-color'"
              >
                <!--  Todo: tarjima-->
                <span class="text-[32px] leading-10 px-2 bg-white rounded">
                  {{ $t("widget.without_color") }}
                </span>
              </button>
              <button
                class="invert-color background-image uppercase w-full h-full rounded border-[3px] hover:border-black transition duration-300"
                :class="
                  settings.mode === 'invert-color'
                    ? 'border-black'
                    : 'border-transparent'
                "
                @click="settings.mode = 'invert-color'"
              >
                <!--  Todo: tarjima-->
                <span
                  class="text-[32px] leading-10 px-2 bg-white text-black rounded"
                >
                  {{ $t("widget.invert") }}
                </span>
              </button>
            </div>
            <div class="col-span-4 flex items-start flex-col">
              <div class="flex items-center w-full mb-6">
                <input
                  id="noImage"
                  v-model="settings.noImage"
                  class="inp-cbx hidden"
                  type="checkbox"
                />
                <label class="cbx w-full" for="noImage">
                  <span>
                    <svg width="12px" height="9px" viewbox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                  </span>
                  <span
                    class="text-base text-[#3E4D63] font-semibold ml-2 leading-130"
                  >
                    {{ $t("widget.without_image") }}
                  </span>
                </label>
                <input
                  id="speaker"
                  v-model="settings.reader"
                  size="large"
                  class="inp-cbx hidden"
                  type="checkbox"
                />
                <label class="cbx w-full" for="speaker">
                  <span class="shrink-0">
                    <svg width="12px" height="9px" viewbox="0 0 12 9">
                      <polyline points="1 5 4 8 11 1"></polyline>
                    </svg>
                  </span>
                  <span
                    class="text-base text-[#3E4D63] font-semibold ml-2 leading-130"
                  >
                    {{ $t("widget.speaker") }}
                  </span>
                </label>
              </div>

              <h6
                class="font-semibold text-base leading-130 text-[#3E4D63] mb-2"
              >
                <!--  Todo: tarjima-->
                {{ $t("widget.font_size") }}
              </h6>
              <div class="special-box__range">
                <div class="flex items-center w-[64%] relative">
                  <div class="small">Aa</div>
                  <div class="relative w-[180px] mx-2 flex items-center">
                    <input
                      v-model="settings.fontSize"
                      type="range"
                      class="relative z-10"
                      min="8"
                      step="2"
                      max="24"
                    />
                    <div
                      class="w-full h-1 rounded bg-[#C6CFD7] absolute left-0"
                    />
                    <div
                      class="absolute flex items-center justify-between w-full z-1 range_lines px-2"
                    >
                      <span
                        v-for="i in 9"
                        :key="i"
                        class="flex w-1 h-2 rounded bg-[#C6CFD7]"
                        :class="[{ 'h-[15px]': i === 5 }]"
                      />
                    </div>
                  </div>
                  <div class="big">Aa</div>
                </div>
                <button
                  class="translate-x-4 whitespace-nowrap border-[1.6px] border-[#2E1183] py-2 bg-[#4318BE] text-white px-4 rounded font-medium text-xs leading-140 flex items-center hover:opacity-90 transition-all duration-300 group"
                  @click="backToDefault()"
                >
                  <svg
                    class="group-hover:rotate-[-360deg] transition duration-500 ease-in-out mr-1"
                    width="21"
                    height="20"
                    viewBox="0 0 21 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M17.9247 3.28003C18.1941 3.01003 18.5 2.775 18.5 2.5C18.5 2.225 18.2766 2 18.0001 2H13.0015C12.9411 2 12.5017 2 12.5017 2.5V7.5C12.5017 7.775 12.7256 8 13.0015 8C13.278 8 13.4704 7.73502 13.6834 7.52502L15.0725 6.13501C15.9572 7.18001 16.4961 8.525 16.4961 10C16.4961 13.315 13.8103 16 10.4977 16C7.18518 16 4.49944 13.315 4.49944 10C4.49944 7.03 6.66233 4.56503 9.49803 4.09003V2.07001C5.55364 2.56001 2.5 5.92 2.5 10C2.5 14.42 6.08099 18 10.4977 18C14.9145 18 18.4955 14.42 18.4955 10C18.4955 7.97 17.7377 6.12503 16.4926 4.71503L17.9247 3.28003Z"
                      fill="#F5F6F7"
                    />
                  </svg>
                  {{ $t("widget.original_view") }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </collapse-transition>
</template>
<script setup lang="ts">
import CollapseTransition from "@ivanv/vue-collapse-transition/src/CollapseTransition.vue";
import { useRoute } from "vue-router";

defineProps({
  isOpenOnInit: {
    type: Boolean,
    default: false,
  },
});

const route = useRoute();

const settings = reactive({
  mode: "with-color",
  fontSize: 16,
  noImage: false,
  reader: false,
});

const getSelectionText = () => {
  let text = "";
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type !== "Control") {
    text = document.selection.createRange().text;
  }
  return text;
};

const speech = () => {
  setTimeout(() => {
    if (window.responsiveVoice) {
      window.responsiveVoice.cancel();
      window.responsiveVoice.speak(getSelectionText(), "Russian Female");
    }
  }, 1);
};

const backToDefault = () => {
  settings.mode = "with-color";
  settings.fontSize = 16;
  settings.reader = false;
  settings.noImage = false;
};

watch(
  settings,
  () => {
    localStorage.setItem("specialSettings", JSON.stringify(settings));
    const app = document.querySelector("body");
    if (app) {
      app.classList.remove("blackAndWhite", "blackAndWhiteInvert", "kontrast");
      document
        .querySelectorAll("img")
        .forEach((imageItem) => (imageItem.style.display = ""));
      document.querySelector("html").style.fontSize = "";

      if (settings.mode === "without-color") {
        app.classList.add("blackAndWhite");
      } else if (settings.mode === "invert-color") {
        app.classList.add("blackAndWhiteInvert");
      } else if (settings.mode === "kontrast") {
        app.classList.add("kontrast");
      }

      if (settings.noImage) {
        document
          .querySelectorAll("img")
          .forEach((imageItem) => (imageItem.style.display = "none"));
      }

      document.querySelector("html").style.fontSize = `${settings.fontSize}px`;

      if (settings.reader) {
        document.addEventListener("mouseup", speech);
      } else {
        document.removeEventListener("mouseup", speech);
      }
    }
  },
  { deep: true }
);

onMounted(() => {
  settings.value = JSON.parse(localStorage.getItem("specialSettings")) || {
    mode: "with-color",
    fontSize: 16,
    noImage: false,
    reader: false,
  };

  const app = document.getElementById("app");
  const topRating = document.getElementById("top-rating");
  if (app) {
    if (settings.value.mode === "without-color") {
      app.classList.add("blackAndWhite");
      topRating.classList.add("blackAndWhite");
    } else if (settings.value.mode === "invert-color") {
      app.classList.add("blackAndWhiteInvert");
      topRating.classList.add("blackAndWhiteInvert");
    }

    document
      .querySelectorAll("img")
      .forEach(
        (imageItem) =>
          (imageItem.style.display = settings.value.noImage ? "none" : "")
      );

    document
      .querySelector("html")
      .style.setProperty(
        "font-size",
        `${settings.value.fontSize}px`,
        "important"
      );
  }

  if (settings.value.reader) {
    document.addEventListener("mouseup", speech);
  }
});
watch(
  settings,
  () => {
    localStorage.setItem("specialSettings", JSON.stringify(settings));
    const app = document.querySelector("body");
    if (app) {
      if (settings.noImage) {
        app.classList.add("noImages");
      } else {
        app.classList.remove("noImages");
      }
    }
  },
  { deep: true }
);
</script>
<style>
.noImages img {
  display: none !important;
}
.blackAndWhiteInvert,
.blackAndWhiteInvert img,
.blackAndWhiteInvert embed,
.blackAndWhiteInvert video,
.blackAndWhiteInvert iframe,
.blackAndWhiteInvert background-image,
.blackAndWhiteInvert .about,
.blackAndWhiteInvert .background-image,
.blackAndWhiteInvert .feedback,
.blackAndWhiteInvert .background-image,
.blackAndWhiteInvert svg {
  filter: grayscale(100%) invert(100%) !important;
}
.blackAndWhite {
  filter: grayscale(100%);
}

.kontrast {
  filter: contrast(1.5);
}
.special-box .without-color {
  background-image: url("/images/rangsiz.webp");
  background-color: #5b5b5b;
}

.special-box .with-color {
  background-image: url("/images/rangli.webp");
  background-color: #5b5b5b;
}

.special-box .invert-color {
  background-image: url("/images/invert.webp");
  background-color: #080808;
}

.invert-color span {
  background: black !important;
  color: white !important;
}
.special-box .special-box__checkboxes {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}
.special-box .special-box__checkboxes label {
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  color: #5c6670;
}
.special-box .special-box__checkboxes label:last-child {
  margin-right: 0;
}
.special-box .heading {
  line-height: 1.2;
  margin-bottom: 10px;
}
.special-box .special-box__range {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.special-box .special-box__range .range {
  margin: 0 10px;
}
.special-box .small {
  font-weight: 600;
  font-size: 12px;
  line-height: 130%;
  color: #5c6670;
}
.special-box .big {
  font-weight: 600;
  font-size: 23px;
  line-height: 130%;
  color: #5c6670;
}
.special-box__range {
  position: relative;
}
@media (max-width: 1100px) {
  .special-box__range .range_lines {
    width: 140px;
    left: 8px;
  }
}
@media (max-width: 1050px) {
  .special-box__range .range_lines {
    width: 135px;
    left: 8px;
  }
}
.special-box input[type="range"] {
  -webkit-appearance: none;
  margin: 10px 6px;
  width: 100%;
}
.special-box input[type="range"]:focus {
  outline: none;
}
.special-box input[type="range"]::-webkit-slider-runnable-track {
  width: 100%;
  height: 4px;
  cursor: pointer;
  background: #c6cfd7;
  border: 0 solid #e9eef2;
}
.special-box input[type="range"]::-webkit-slider-thumb {
  border: 2px solid #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.16);
  height: 18px;
  width: 18px;
  border-radius: 50%;
  background: #3e4d63;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -8px;
}
.special-box .range {
  position: relative;
  z-index: 2;
}
.cbx span {
  display: inline-block;
  vertical-align: middle;
  transform: translate3d(0, 0, 0);
}
.cbx span:first-child {
  position: relative;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  transform: scale(1);
  vertical-align: middle;
  border: 2px solid #1385fa;
  transition: all 0.2s ease;
}
.cbx span:first-child svg {
  position: absolute;
  z-index: 1;
  top: 6px;
  left: 5px;
  fill: none;
  stroke: white;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-dasharray: 16px;
  stroke-dashoffset: 16px;
  transition: all 0.3s ease;
  transition-delay: 0.1s;
  transform: translate3d(0, 0, 0);
  border-color: #1385fa;
}
.cbx span:first-child::before {
  content: "";
  width: 100%;
  height: 100%;
  background: #1385fa;
  display: block;
  transform: scale(0);
  opacity: 1;
  border-radius: 50%;
  transition-delay: 0.2s;
}

.cbx:hover span:first-child {
  border-color: #1385fa;
}

.inp-cbx:checked + .cbx span:first-child {
  border-color: #1385fa;
  background: #1385fa;
}
.inp-cbx:checked + .cbx span:first-child svg {
  stroke-dashoffset: 0;
}
.inp-cbx:checked + .cbx span:first-child::before {
  transform: scale(2.2);
  opacity: 0;
  transition: all 0.6s ease;
}
.inp-cbx:checked + .cbx span:last-child {
  color: #626469;
  transition: all 0.3s ease;
}
.inp-cbx:checked + .cbx span:last-child::after {
  transform: scaleX(1);
  transition: all 0.3s ease;
}
</style>
