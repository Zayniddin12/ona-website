<template>
  <div>
    <div
      class="container flex items-center justify-between space-x-2 mb-4 md:mb-7"
      :class="[bodyClass]"
    >
      <div class="flex items-center gap-4">
        <p
          class="section-title max-w-[426px] font-bold text-dark !leading-130 text-xl sm:text-2xl md:text-[32px]"
          v-if="title"
        >
          <slot name="title">
            {{ $t(title) }}
          </slot>
        </p>
        <slot name="icon"></slot>
      </div>
      <slot name="after-title">
        <div
          v-if="sectionLink"
          data-aos="fade-up"
          class="flex items-center group cursor-pointer max-md:hidden"
        >
          <NuxtLink
            :to="sectionLink"
            class="text-dark-light font-450 text-base leading-115 duration-300 group-hover:text-blue"
          >
            {{ $t(sectionTitle) }}
          </NuxtLink>
          <span
            class="icon-chevron-right w-6 h-6 flex items-center justify-center text-dark-light duration-300 group-hover:text-blue group-hover:translate-x-[3px]"
          ></span>
        </div>
      </slot>
    </div>
    <slot />
    <div v-if="sectionLink" data-aos="fade-up" class="container mt-4 md:hidden">
      <NuxtLink :to="sectionLink">
        <Button
          class="w-full"
          text-class="!text-base"
          :text="$t(sectionTitle)"
          variant="primary-light"
        >
          <template #post-icon>
            <span class="icon-chevron-right text-xs leading-3 text-blue ml-3" />
          </template>
        </Button>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  title?: string;
  sectionLink?: string;
  sectionTitle?: string;
  bodyClass?: string;
}
withDefaults(defineProps<Props>(), {
  sectionLink: "",
});
</script>
