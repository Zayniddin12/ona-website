import { defineStore } from "pinia";
import type { ICommonDataResponse } from "~/types/common";
import type { TEvent,  TEventsSingle } from "~/types/events";
import type { TReportAudit } from "~/types/common";


export const useEventsStore = defineStore("eventsStore", {
  state: () => ({
    events: [] as TEvent[],
    count: 0,
    homeEvents: [] as TEvent[],
    data: [] as TReportAudit[],
  }),
  actions: {
    fetchEvents(limit: number, offset: number) {
      return new Promise((resolve, reject) => {
        if (this.events.length) {
          resolve(this.events);
          return;
        }
        useApi()
          .$get<ICommonDataResponse<TEvent>>(
            `v1/catalog/Events/?limit=${limit}&offset=${offset}`
          )
          .then((data) => {
            this.events = data.results;
            this.count = data.count;
            resolve(data);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchHomeEvents() {
      return new Promise((resolve, reject) => {
        if (this.homeEvents.length === 3) {
          resolve(this.homeEvents);
          return;
        }
        useApi()
          .$get<ICommonDataResponse<TEvent>>("v1/catalog/Events/", {
            params: { limit: 3 },
          })
          .then((data) => {
            this.homeEvents = data.results;
            resolve(data.results);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    fetchEventsSingle(id: string) {
      return new Promise<TEventsSingle>((resolve, reject) => {
        useApi()
          .$get<TEventsSingle>(`v1/catalog/Events/${id}/`)
          .then((res) => {
            resolve(res);
          })
          .catch((err) => {
            if (err.status === 404) {
              showError({
                statusCode: 404,
              });
            }
            reject(err);
          });
      });
    },
    fetchReportAudit(limit?: number, offset?: number) {
      return new Promise((resolve, reject) => {
        if (this.data?.length) {
          resolve(this.data);
          return;
        }
        // common/report-and-audit/   we need use this instead {about-us/TeamMembers/}

        useApi()
          .$get<ICommonDataResponse<TReportAudit>>("v1/common/report-and-audit/", {
            params: { limit: limit, offset: offset },
          })
          .then((data) => {
            this.data = data.results;
            resolve(data.results);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
});
