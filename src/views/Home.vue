<template>
  <div class="container-fluid p-0 h-100 d-flex flex-column">
    <header class="d-flex border-bottom p-2 align-items-center">
      <div class="d-flex align-items-center">
        <img src="@/assets/icons8-google-calendar-96.png" alt="" width="40" />
        <h1 class="fs-4 mb-0">日曆</h1>
      </div>
      <div class="d-flex flex-wrap align-items-center">
        <button type="button" class="btn btn-outline-secondary">今日</button>

        <p class="secondary-bg-color rounded-pill p-2 ms-2 primary-color">
          {{ lineName }}<img :src="linePicture" style="width: 20px" />
        </p>
        <select
          v-model="selectedView"
          @change="changeView"
          class="border-0 secondary-bg-color p-2 rounded-pill primary-color"
        >
          <option value="dayGridMonth">月</option>
          <option value="timeGridWeek">周</option>
          <option value="timeGridDay">日</option>
        </select>
      </div>
    </header>
    <div class="grid">
      <div class="g-col-3">
        <button type="button" class="btn btn-outline-secondary d-block">
          建立
        </button>
        <v-date-picker v-model="date" />
      </div>
      <div class="g-col-8">
        <!-- <Vcalendar/> -->
        <Calendar :lineName="displayName" :linePicture="pictureUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import "v-calendar/dist/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "@/assets/scss/main.scss";
import Calendar from "@/components/Calendar.vue";
import qs from "query-string";
// import Vcalendar from '@/components/Vcalendar.vue'
export default {
  name: "Home",
  components: {
    Calendar,
  },
  data() {
    return {
      date: new Date(),
      code: "",
      displayName: "",
      pictureUrl: "",
    };
  },
  methods: {
    getUrl() {
      var getUrlString = location.href;
      var url = new URL(getUrlString);
      // console.log(url.searchParams.get('code'))
      if (url.searchParams.has("state")) {
        this.code = url.searchParams.get("code");

        this.$http
          .post(
            "https://api.line.me/oauth2/v2.1/token",
            qs.stringify({
              grant_type: "authorization_code",
              code: this.code,
              redirect_uri: "https://hahaalin.github.io/calendar/dist/",
              client_id: "1657109301",
              client_secret: "6bdf74180a27a5fb330806ae2c65e6c3",
            })
          )
          .then((response) => {
            console.log(response);
            const token = response.data.access_token;
            this.$http
              .get("https://api.line.me/v2/profile", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                console.log(response.data);
                this.displayName = response.data.displayName;
                this.pictureUrl = response.data.pictureUrl;
              });
          });
      } else {
        // this.$router.push('/login')
      }
    },
  },
  created() {
    this.getUrl();
  },
};
</script>
<style lang="scss"></style>
