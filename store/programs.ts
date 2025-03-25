import { defineStore } from "pinia";
import type { ICommonDataResponse } from "~/types/common";

import type { TPrograms } from "~/types/programs";

export const useProgramsStore = defineStore("programStore", {
  state: () => ({
    programs: [] as TPrograms[],
    homePrograms: [] as TPrograms[],
    programLoading: true as boolean,
  }),
  actions: {
    fetchPrograms() {
      return new Promise((resolve, reject) => {
        if (this.programs.length) {
          resolve(this.programs);
          return;
        }
        useApi()
          .$get<ICommonDataResponse<TPrograms>>(`v1/catalog/OurPrograms/`)
          .then((data) => {
            this.programs = data.results;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchHomePrograms(limit?: number, offset?: number) {
      return new Promise((resolve, reject) => {
        if (this.homePrograms.length) {
          resolve(this.homePrograms);
          return;
        }
        this.programLoading = true;
        useApi()
          .$get<ICommonDataResponse<TPrograms>>("v1/catalog/OurPrograms/", {
            params: { limit: limit },
          })
          .then((data) => {
            this.homePrograms = data.results;
            resolve(data.results);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => (this.programLoading = false));
      });
    },
  },
});
