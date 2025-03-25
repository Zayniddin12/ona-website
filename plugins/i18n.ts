import { createI18n } from "vue-i18n";
import uz from "@/i18n/uz.json";
import ru from "@/i18n/ru.json";
import en from "@/i18n/en.json";

const messages = {
  uz,
  en,
  ru,
};
export default defineNuxtPlugin(({ vueApp }) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "ru",
    messages,
  });

  vueApp.use(i18n);
});
