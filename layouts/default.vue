<template>
  <div>
    <LayoutHeader :dark="false" />
    <div class="min-h-[calc(100vh-78px-280px)]">
      <slot></slot>
    </div>
    <LayoutFooter />
    <LayoutBewareScammers />
    <LayoutLoader />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
</script>
