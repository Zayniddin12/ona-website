import { nextTick, onMounted, ref } from "vue";

export function useMounted() {
  const mounted = ref(false);
  onMounted(() => {
    nextTick(() => {
      mounted.value = true;
    });
  });

  return { mounted };
}
