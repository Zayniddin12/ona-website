import { defineStore } from "pinia";
import type { ICommonDataResponse } from "~/types/common";
import type { TNews } from "~/types/news";

export const useNewsStore = defineStore("newsStore", {
  state: () => ({
    news: [] as TNews[],
    newsCount: null,
    homeNews: [] as TNews[],
    newsLoading: true as boolean,
  }),
  actions: {
    fetchNews(limit: number, offset: number) {
      return new Promise((resolve, reject) => {
        if (this.news.length) {
          resolve(this.news);
          return;
        }
        useApi()
          .$get<ICommonDataResponse<TNews>>(
            `v1/catalog/News/?limit=${limit}&offset=${offset}`
          )
          .then((data) => {
            this.news = data.results;
            this.newsCount = data.count;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchHomeNews() {
      return new Promise((resolve, reject) => {
        if (this.homeNews.length) {
          resolve(this.homeNews);
          return;
        }

        this.newsLoading = true;

        useApi()
          .$get<ICommonDataResponse<TNews>>(`v1/catalog/News/`, {
            params: { limit: 4 },
          })
          .then((data) => {
            this.homeNews = data.results;
            resolve(data.results);
          })
          .catch((error) => {
            reject(error);
          })
          .finally(() => (this.newsLoading = false));
      });
    },
  },
});
