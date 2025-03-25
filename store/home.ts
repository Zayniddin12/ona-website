import { defineStore } from "pinia";
import type {
  ICommonDataResponse,
  TCommonHelpTypes,
  TGallery,
  THelp,
  TStatistics,
  TEntrance,
} from "~/types/common";

export const useHomeStore = defineStore("homeStore", {
  state: () => ({
    statistic: {} as TStatistics,
    gallery: [] as TGallery[],
    helpList: {} as THelp,
    commonHelpTypes: [] as TCommonHelpTypes[],
    entrance: {} as TEntrance,
    galleryLoading: false as boolean,
    entranceLoading: false as boolean,
  }),
  actions: {
    fetchStatistics() {
      return new Promise((resolve, reject) => {
        if (this.statistic?.id) {
          resolve(this.statistic);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TStatistics>>(
              "v1/common/donation-statistics/"
            )
            .then((data) => {
              this.statistic = data.results[0];
              resolve(data.results[0]);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
    fetchGallery(limit?: number, offset?: number) {
      return new Promise((resolve, reject) => {
        if (this.gallery?.length > 0) {
          resolve(this.gallery);
          return;
        }

        this.galleryLoading = true;

        useApi()
          .$get<ICommonDataResponse<TGallery>>("v1/about-us/InstaAccounts/", {
            params: { limit: limit, offset: offset },
          })
          .then((data) => {
            this.gallery = data.results;
            resolve(data.results);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => (this.galleryLoading = false));
      });
    },
    fetchHelpList() {
      return new Promise((resolve, reject) => {
        if (this.helpList?.id) {
          resolve(this.helpList);
          return;
        }
        useApi()
          .$get<THelp[]>("v1/about-us/NeedHelp/")
          .then((data) => {
            this.helpList = data[0];
            resolve(data[0]);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    fetchCommonHelpTypes() {
      return new Promise((resolve, reject) => {
        if (this.commonHelpTypes?.length) {
          resolve(this.commonHelpTypes);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TCommonHelpTypes>>(
              "v1/common/common-help-types/"
            )
            .then((data) => {
              this.commonHelpTypes = data.results;
              resolve(data.results);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },

    fetchEntrance() {
      return new Promise((resolve, reject) => {
        if (this.entrance?.id) {
          resolve(this.entrance);
          return;
        }

        this.entranceLoading = true;

        useApi()
          .$get<TEntrance[]>("v1/about-us/About/")
          .then((data) => {
            this.entrance = data[0];
            resolve(data[0]);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => (this.entranceLoading = false));
      });
    },
  },
});
