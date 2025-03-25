import { defineStore } from "pinia";
export const useNeedHelpStore = defineStore("helpStore", {
  state: () => ({
    singleStatistic: [],
    statistic: [],
    single: {},
    needLoading: true as boolean,
  }),
  actions: {
    fetchStatistics(limit?: number, offset?: number) {
      this.needLoading = true;
      return new Promise((resolve, reject) => {
        if (this.statistic?.id) {
          resolve(this.statistic);
          this.needLoading = false;
          return;
        } else {
          useApi(import.meta.env.VITE_BACK_API_BASE_URL)
            .$get("v2/web/participants/?additional_info=true", {
              params: { limit: limit, offset: offset },
            })
            .then((data) => {
              this.statistic = data;
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            })
            .finally(() => (this.needLoading = false));
        }
      });
    },

    fetchSingleStatistic(id: number) {
      return new Promise((resolve, reject) => {
        useApi(import.meta.env.VITE_BACK_API_BASE_URL)
          .$get(`v2/web/participants/${id}/?additional_info=true/${id}`)
          .then((data) => {
            this.single = data;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});

// useHelpStoree
