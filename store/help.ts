import { defineStore } from "pinia";
import type { ICommonDataResponse, TAdvertisements, TParams } from "~/types/common";
import type { TFaq, THelp, THelpType } from "~/types/help";

export const useHelpStore = defineStore("help", {
  state: () => ({
    homeFaq: [] as TFaq[],
    help: {} as THelp,
    faq: [] as TFaq[],
    faqCount: 0,
    helpTypes: [] as THelpType[],
    advertisement: {} as TAdvertisements,
  }),
  actions: {
    fetchHomeFaq() {
      return new Promise((resolve, reject) => {
        if (this.homeFaq?.length) {
          resolve(this.homeFaq);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TFaq>>("v1/help/faq/", {
              params: { limit: 8 },
            })
            .then((data) => {
              this.homeFaq = data.results;
              resolve(data.results);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
    fetchFaq(params: TParams, merge = false) {
      return new Promise((resolve, reject) => {
        useApi()
          .$get<ICommonDataResponse<TFaq>>("v1/help/faq/", {
            params,
          })
          .then((data) => {
            this.faqCount = data.count;
            if (merge) {
              this.faq = [...this.faq, ...data.results];
            } else {
              this.faq = data.results;
            }
            resolve(data.results);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchHelpPage() {
      return new Promise((resolve, reject) => {
        if (this.help?.id) {
          resolve(this.help);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<THelp>>("v1/help/page/")
            .then((data) => {
              this.help = data.results[0];
              resolve(data.results[0]);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
    fetchHelpTypes() {
      return new Promise((resolve, reject) => {
        if (this.helpTypes?.length) {
          resolve(this.helpTypes);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<THelpType>>("v1/help/type")
            .then((data) => {
              this.helpTypes = data.results;
              resolve(data.results);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
    fetchAdvertisement() {
      return new Promise((resolve, reject) => {
        if (this.advertisement?.id) {
          resolve(this.advertisement);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TAdvertisements>>(
              "v1/common/advertisements/"
            )
            .then((data) => {
              this.advertisement = data.results[0];
              resolve(data.results[0]);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
  },
});
