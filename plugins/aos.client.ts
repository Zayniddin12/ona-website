import AOS from "aos";
import "aos/dist/aos.css"; // You can also use <link> for styles

export default defineNuxtPlugin(({ vueApp }) => {
  vueApp.use(
    AOS.init({
      once: true,
    })
  );
});
