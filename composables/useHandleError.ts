import * as pkg from "vue-toastification";

import { useI18n } from "vue-i18n";
const { useToast } = pkg;

export const useHandleError = () => {
  const { t } = useI18n();

  function handleError(error: any) {
    if (error?.data) {
      try {
        if (!error?.data?.errors?.length) {
          useToast().error(error?.data[0]?.error?.message);
        } else {
          useToast().error(error?.data?.errors[0]?.message);
        }
      } catch {
        useToast().error(t("error"));
      }
    } else if (error?.response?.data) {
      try {
        if (!error?.response?.data?.errors?.length) {
          useToast().error(error?.response?.data[0]?.error?.message);
        } else {
          useToast().error(error?.response?.data?.errors[0]?.message);
        }
      } catch {
        useToast().error(t("error"));
      }
    } else {
      useToast().error(t("error"));
    }
  }

  return { handleError };
};
