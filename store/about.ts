import { defineStore } from "pinia";
import type { TAbout, TLicense, TMember, TMission } from "~/types/about";
import type { ICommonDataResponse } from "~/types/common";

export const useAboutStore = defineStore("aboutStore", {
  state: () => ({
    missions: [] as TMission[],
    members: [] as TMember[],
    licenses: [] as TLicense[],
    about: {} as TAbout,
  }),
  actions: {
    fetchAbout() {
      return new Promise((resolve, reject) => {
        if (this.about?.id) {
          resolve(this.about);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TAbout>>("v1/about-us/FoundAbout/")
            .then((data) => {
              this.about = data.results[0];
              resolve(data.results[0]);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
    fetchContact() {
      return new Promise((resolve, reject) => {
        if (this.missions?.length) {
          resolve(this.missions);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TMission>>("v1/about-us/Missions/")
            .then((data) => {
              this.missions = data.results;
              resolve(data.results);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
    fetchMembers(limit?: number, offset?: number) {
      return new Promise((resolve, reject) => {
        if (this.members?.length) {
          resolve(this.members);
          return;
        }

        useApi()
          .$get<ICommonDataResponse<TMember>>("v1/about-us/TeamMembers/", {
            params: { limit: limit, offset: offset },
          })
          .then((data) => {
            this.members = data.results;
            resolve(data.results);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchLicenses() {
      return new Promise((resolve, reject) => {
        if (this.licenses?.length) {
          resolve(this.licenses);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TLicense>>("v1/about-us/Licenses/")
            .then((data) => {
              this.licenses = data.results;
              resolve(data.results);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
  },
});
