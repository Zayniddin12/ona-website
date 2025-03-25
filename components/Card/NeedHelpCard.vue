<template>
  <div
    class="flex items-center gap-4 border border-solid border-grey-300 rounded-2xl p-2"
  >
    <div
      class="relative max-w-[132px] max-h-[132px] md:w-[118px] md:h-[112px] md:flex-shrink-0 overflow-hidden rounded-xl"
    >
      <img
        :src="data?.profile_photo?.file"
        alt="profile photo image"
        v-if="data?.profile_photo"
        class="w-full h-full object-cover flex-shrink-0 aspect-square md:aspect-[118/112]"
      />
      <img
        v-else
        src="/images/default-image.webp"
        alt="default image"
        class="w-full object-cover h-full"
      />
      <img
        class="w-[42px] h-7 object-cover absolute left-3 bottom-3"
        src="/images/footer-logo.svg"
        alt="Logo"
      />
    </div>
    <div>
      <p class="text-xl font-semibold line-clamp-1">{{ data?.full_name }}</p>
      <div class="border-[0.5px] border-gray-300 max-w-[90px] my-2"></div>
      <p class="text-sm text-[#606263] line-clamp-2">
        {{ data?.short_description }}
      </p>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Props {
  data: {
    profile_photo: string;
    full_name: string;
    short_description: string;
  };
}
defineProps<Props>();
defineEmits();
</script>
