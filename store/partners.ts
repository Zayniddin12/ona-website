import { defineStore } from "pinia";
import type { ICommonDataResponse, TParams } from "~/types/common";
import type { TPartner } from "~/types/partner";

export const usePartnersStore = defineStore("partnersStore", {
  state: () => ({
    partner: [] as TPartner[],
    fullPartners: [] as TPartner[],
    fullPartnersCount: 0,
    partnersLoading: true as boolean,
  }),
  actions: {
    fetchPartners(limit?: number, offset?: number) {
      return new Promise((resolve, reject) => {
        if (this.partner.length) {
          resolve(this.partner);
          return;
        }
        this.partnersLoading = true;
        useApi()
          .$get<ICommonDataResponse<TPartner>>("v1/common/partners/", {
            params: { limit: limit, offset: offset },
          })
          .then((data) => {
            this.partner = data.results;
            resolve(this.partner);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => (this.partnersLoading = false));
      });
    },
    fetchFullPartners(options: TParams, merge = false) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<ICommonDataResponse<TPartner>>("v1/common/partners/", {
            params: options,
          })
          .then((data) => {
            this.fullPartnersCount = data.count;
            if (merge) {
              this.fullPartners.push(...data.results);
            } else {
              this.fullPartners = data.results;
            }
            resolve(this.partner);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
