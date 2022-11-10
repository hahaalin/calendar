import { createApp } from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App.vue";
import router from "./router";
import VCalendar from "v-calendar";
import "@/assets/scss/custom.scss";

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.use(VCalendar, {});
app.mount("#app");
