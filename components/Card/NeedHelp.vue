<script setup lang="ts">
import { useRouter } from "vue-router";

interface IHelp {
  id: number;
  full_name: string;
  short_description: string;
  profile_photo: { file: string };
  hashtag: string;
}

interface Props {
  loading?: boolean;
  data: {
    results: IHelp[];
  };
}
const props = defineProps<Props>();
const router = useRouter();

const pass = (id: number) => {
  router.push({ path: "they-need-help", query: { id: id.toString() } });
};
</script>

<template>
  <SectionHead
    title="they_need_your_help"
    section-title="all_wards"
    section-link="/they-need-help"
    class="py-4 md:py-8"
  >
    <div class="grid container md:grid-cols-4 gap-5">
      <nuxt-link
        :to="`/they-need-help?id=${element.id}`"
        class="bg-white/50 pb-3 border-2 rounded-2xl border-white flex flex-col justify-between duration-200 hover:shadow-lg"
        v-for="(element, key) in data?.results"
        :key="key"
      >
        <div
          class="flex px-1.5 pt-1.5 items-center relative justify-center flex-col"
        >
          <span
            v-if="element?.hashtag"
            class="bg-blue px-[10px] rounded-md absolute left-[18px] top-[-10px] py-[5px] text-white text-sm font-450 leading-130"
            >{{ element?.hashtag }}</span
          >
          <div v-if="loading">
            <CommonBlockPreloader
              v-bind="{ loading }"
              width="281px"
              height="291px"
              border-radius="10px"
            />
          </div>
          <div v-if="!loading">
            <CommonImage
              v-if="element?.profile_photo?.file"
              :src="element?.profile_photo?.file"
              image-class="block w-full h-full rounded-xl object-cover aspect-[269/252]"
              alt="image"
            />
            <img
              v-else
              class="block w-full h-full rounded-xl object-cover"
              src="/images/default-image.webp"
              alt="default image"
            />
          </div>
        </div>
        <div class="flex flex-col justify-between px-6 py-5">
          <h4
            class="text-2xl text-dark font-semibold leading-130 mb-2 line-clamp-1"
          >
            {{ String(element?.full_name)?.split(" ").slice(0, 2).join(" ") }}
          </h4>
          <span
            class="text-dark-light text-sm text-left font-450 leading-130 line-clamp-2"
            >{{ element?.short_description }}</span
          >
        </div>
        <div class="px-3 flex flex-col items-start">
          <Button
            variant="transparent"
            class="backdrop-blur group transition-300 hover:!bg-grey-400 w-full !text-sm !bg-grey-300 gap-1"
            text-class="!font-semibold !text-dark !text-sm"
            @click="pass(element.id)"
          >
            {{ $t("more") }}
            <i
              class="icon-chevron-right text-red-100 flex items-center transition-300 justify-center w-5 h-5 group-hover:translate-x-[3px]"
            ></i>
          </Button>
        </div>
      </nuxt-link>
    </div>
  </SectionHead>
</template>

<style scoped></style>
