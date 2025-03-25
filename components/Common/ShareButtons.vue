<template>
  <div class="flex items-center gap-x-2">
    <span
      class="w-[36px] h-[36px] rounded-full bg-grey-100/10 flex items-center justify-center hover:bg-blue transition-300 cursor-pointer relative group"
      @click="share('telegram', title, short_description)"
    >
      <svg
        width="16"
        height="13"
        viewBox="0 0 16 13"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.08273 5.70241C5.31058 3.95602 8.12981 2.8047 9.54041 2.24843C13.568 0.66019 14.4049 0.384296 14.9504 0.375088C15.0703 0.373182 15.3386 0.401371 15.5123 0.535046C15.6591 0.647919 15.6994 0.800395 15.7187 0.907411C15.7381 1.01443 15.7621 1.25821 15.743 1.4487C15.5247 3.62288 14.5804 8.89906 14.0999 11.3342C13.8966 12.3646 13.4963 12.7101 13.1088 12.7439C12.2666 12.8173 11.627 12.2162 10.8113 11.7092C9.53489 10.9159 8.81379 10.4221 7.57479 9.64802C6.14292 8.75342 7.07114 8.26173 7.88717 7.45817C8.10072 7.24788 11.8115 4.04787 11.8833 3.75757C11.8923 3.72127 11.9006 3.58594 11.8158 3.51448C11.731 3.44302 11.6059 3.46745 11.5156 3.48689C11.3875 3.51444 9.34842 4.79225 5.3982 7.32033C4.81941 7.69715 4.29515 7.88074 3.82544 7.87112C3.30761 7.86052 2.31153 7.59354 1.57104 7.36533C0.662807 7.08542 -0.0590412 6.93744 0.00381558 6.46207C0.0365553 6.21447 0.396194 5.96125 1.08273 5.70241Z"
          fill="#A2ABBE"
          class="group-hover:fill-white transition-200"
        />
      </svg>
      <CommonTooltip> Telegram </CommonTooltip>
    </span>
    <span
      class="w-[36px] h-[36px] rounded-full bg-grey-100/10 flex items-center justify-center hover:bg-blue transition-300 cursor-pointer relative group"
      @click="share('twitter', title)"
    >
      <svg
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.875 1.80769C15.2844 2.11923 14.6938 2.22308 14.0047 2.32692C14.6938 1.91154 15.1859 1.28846 15.3828 0.457692C14.7922 0.873077 14.1031 1.08077 13.3156 1.28846C12.725 0.665385 11.8391 0.25 10.9531 0.25C8.88594 0.25 7.31094 2.32692 7.80313 4.40385C5.14531 4.3 2.78281 2.95 1.10938 0.873077C0.223438 2.43077 0.715625 4.40385 2.09375 5.44231C1.60156 5.44231 1.10938 5.23462 0.617188 5.02692C0.617188 6.58462 1.7 8.03846 3.17656 8.45385C2.68438 8.55769 2.19219 8.66154 1.7 8.55769C2.09375 9.90769 3.275 10.9462 4.75156 10.9462C3.57031 11.8808 1.79844 12.4 0.125 12.1923C1.60156 13.1269 3.275 13.75 5.04688 13.75C11.0516 13.75 14.3984 8.45385 14.2016 3.57308C14.8906 3.15769 15.4812 2.53462 15.875 1.80769Z"
          fill="#A2ABBE"
          class="group-hover:fill-white transition-200"
        />
      </svg>
      <CommonTooltip> Twitter </CommonTooltip>
    </span>
    <span
      class="w-[36px] h-[36px] rounded-full bg-grey-100/10 flex items-center justify-center hover:bg-blue transition-300 cursor-pointer relative group"
      @click="share('facebook', title)"
    >
      <svg
        width="36"
        height="20"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.2875 13.5H21V10.5C21 8.95197 21.126 7.97697 23.3445 7.97697H26.1465V3.20697C24.783 3.06597 23.412 2.99697 22.0395 2.99997C17.97 2.99997 15 5.48547 15 10.0485V13.5H10.5V19.5L15 19.4985V33H21V19.4955L25.599 19.494L26.2875 13.5Z"
          fill="#A2ABBE"
          class="group-hover:fill-white transition-200"
        />
      </svg>

      <CommonTooltip> Facebook </CommonTooltip>
    </span>
  </div>
</template>

<script setup lang="ts">
import { share } from "~/utils";

interface Props {
  viewCount?: string | number;
  title?: string;
  short_description?: string;
  date?: string;
  loading?: boolean;
  isStatic?: boolean;
}
defineProps<Props>();
</script>
