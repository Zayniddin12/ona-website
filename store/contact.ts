import { defineStore } from "pinia";
import type { TContact, TSocial } from "~/types/contact";
import type { ICommonDataResponse } from "~/types/common";

export const socials = computed<TSocial[]>(() => [
  {
    icon: "icon-telegram",
    link: useContactStore().contactInfo?.telegram_username ?? "",
    social_name: "Telegram",
  },
  {
    icon: "icon-twitter",
    link: useContactStore().contactInfo?.twitter_username ?? "",
    social_name: "Twitter",
  },
  {
    icon: "icon-youtube",
    link: useContactStore().contactInfo?.youtube_username ?? "",
    social_name: "Youtube",
  },
  {
    icon: "icon-instagram",
    link: useContactStore().contactInfo?.instagram_username ?? "",
    social_name: "Instagram",
  },
]);
export const useContactStore = defineStore("contactStore", {
  state: () => ({
    contactInfo: undefined as TContact | undefined,
  }),
  actions: {
    fetchContact() {
      return new Promise((resolve, reject) => {
        if (this.contactInfo?.id) {
          resolve(this.contactInfo);
          return;
        } else {
          useApi()
            .$get<ICommonDataResponse<TContact>>("v1/contact/info/")
            .then((data) => {
              this.contactInfo = data.results[0];
              resolve(data);
            })
            .catch((error) => {
              reject(error);
            });
        }
      });
    },
  },
});
