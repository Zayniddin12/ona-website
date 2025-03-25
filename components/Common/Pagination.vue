<template>
  <VueAwesomePaginate
    v-if="total > perPage"
    v-model="currentPage"
    active-page-class="btn-active"
    disabled-back-button-class="dd"
    :total-items="total"
    :items-per-page="perPage"
    :max-pages-shown="maxPageShow"
    :back-button-class="`${currentPage === 1 ? 'disable' : ''} back-button`"
    :next-button-class="`${
      currentPage === Math.ceil(total / perPage) ? 'disable' : ''
    } next-button`"
    @click="onClickHandler"
  >
    <template #prev-button>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12.5752 16.6L7.14186 11.1667C6.50019 10.525 6.50019 9.47503 7.14186 8.83336L12.5752 3.40002"
          stroke="#A2ABBE"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </template>
    <template #next-button>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7.4248 16.6L12.8581 11.1667C13.4998 10.525 13.4998 9.47503 12.8581 8.83336L7.4248 3.40002"
          stroke="#A2ABBE"
          stroke-width="1.5"
          stroke-miterlimit="10"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </template>
  </VueAwesomePaginate>
</template>
<script setup lang="ts">
// import 'vue-awesome-paginate/dist/style.css'
import "vue-awesome-paginate/dist/style.css";
import { ref, watch } from "vue";
import { VueAwesomePaginate } from "vue-awesome-paginate";
import { useRoute, useRouter } from "vue-router";

import useUpdateRouteQuery from "~/composables/useUpdateQuery";

interface Props {
  total?: number;
  perPage?: number;
  maxPageShow?: number;
}
const route = useRoute();

withDefaults(defineProps<Props>(), {
  total: 24,
  perPage: 12,
  maxPageShow: 3,
});
const emit = defineEmits(["handle-page"]);

function onClickHandler(page: number) {
  useUpdateRouteQuery("page", page);
  setTimeout(() => {
    emit("handle-page", page);
  }, 0);
}
const currentPage = ref(+route.query?.page || 1);
</script>
<style>
.pagination-container {
  display: flex;
  column-gap: 8px;
}

.paginate-buttons {
  height: 32px;
  width: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #f4f5f7;
  color: #606263;
  font-size: 16px;
  line-height: 125%;
  transition: all 0.3s ease-in-out;
}

.paginate-buttons:hover {
  background-color: #d8d8d8;
}

.btn-active {
  background-color: #30a1db;
  border: 1px solid #30a1db;
  color: white;
}

.btn-active:hover {
  background-color: #30a1db;
}

.back-button.disable,
.next-button.disable {
  opacity: 0.5;
  pointer-events: none;
}

.back-button,
.next-button {
  background-color: #f8f9fa;
}
</style>
