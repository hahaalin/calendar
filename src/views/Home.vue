<template>
  <div class="container-fluid p-0 h-100 bd-layout">
    <Header
      @gotoToday="gotoToday"
      @prevFn="prevFn"
      @nextFn="nextFn"
      @changeView="changeView"
      :viewTitle="viewTitle"
      :lineName="lineName"
      :linePicture="linePictureUrl"
    />
    <!-- <header class="d-flex border-bottom p-2 align-items-center bd-header">
      <div class="d-flex align-items-center" style="width: 260px">
        <img
          src="@/assets/icons8-google-calendar-96.png"
          alt="mainlogo"
          width="40"
        />
        <h1 class="fs-4 mb-0">日曆</h1>
      </div>
      <div class="d-flex flex-wrap align-items-center flex-grow-1">
        <button
          type="button"
          class="btn btn-outline-secondary me-3"
          @click="gotoToday"
        >
          今日
        </button>
        <div class="d-flex align-items-center">
          <button type="button" class="btn" @click="prevFn">
            <i class="fa-solid fa-angle-left text-secondary"></i>
          </button>
          <button type="button" class="btn" @click="nextFn">
            <i class="fa-solid fa-angle-right text-secondary"></i>
          </button>
          <h2 class="fs-4 mb-0 ms-3">{{ viewTitle }}</h2>
        </div>
        <select
          v-model="selectedView"
          @change="changeView"
          class="btn btn-outline-secondary ms-auto"
        >
          <option value="dayGridMonth">月</option>
          <option value="timeGridWeek" selected>周</option>
          <option value="timeGridDay">日</option>
        </select>

        <p class="rounded-pill p-2 ms-3 border">
          {{ lineName ? lineName : "登入"
          }}<img :src="linePicture" width="20" />
        </p>
      </div>
    </header> -->
    <aside class="bd-sidebar">
      <div class="px-2 py-3">
        <button
          type="button"
          class="btn btn-outline-secondary d-block rounded-pill p-3"
          @click="openModal(true)"
        >
          <i class="fa-solid fa-plus me-3 fa-2x align-middle"></i>
          <span class="align-middle">建立</span>
        </button>
      </div>

      <v-date-picker
        title-position="left"
        v-model="pickerDate"
        color="green"
        :attributes="attrs"
        @dayclick="gotoDate"
      />
    </aside>
    <main class="bd-main p-2">
      <Calendar @handle-event-clock="openModal" ref="calendar" />
      <OrderModal
        ref="orderModal"
        @add-event="addNewEvent"
        @update-event="updateEvent"
        @remove-event="removeEvent"
        :order="tempOrder"
        :isNew="isNew"
      />
    </main>
  </div>
</template>

<script>
import "v-calendar/dist/style.css";
import "@fortawesome/fontawesome-free/css/all.css";
// import 'bootstrap/dist/css/bootstrap.min.css'
import "@/assets/scss/main.scss";
import Header from "@/components/Header.vue";
import Calendar from "@/components/Calendar.vue";
import OrderModal from "@/components/OrderModal";
import qs from "query-string";
// import Vcalendar from '@/components/Vcalendar.vue'
export default {
  name: "Home",
  components: {
    Header,
    Calendar,
    OrderModal,
  },
  data() {
    return {
      pickerDate: new Date(),
      code: "",
      lineName: "",
      linePictureUrl: "",
      // selectedView: "timeGridWeek",
      viewTitle: "",
      calendarDom: "",
      orderDom: "",
      tempOrder: {},
      isNew: "",
      attrs: [
        {
          key: "today",
          highlight: {
            style: {
              background: "#1B73E8",
            },
            contentStyle: {
              color: "white",
            },
          },
          dates: new Date(),
        },
      ],
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
            const token = response.data.access_token;
            this.$http
              .get("https://api.line.me/v2/profile", {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              })
              .then((response) => {
                this.lineName = response.data?.displayName;
                this.linePictureUrl = response.data?.pictureUrl;
              });
          });
      } else {
        // this.$router.push('/login')
      }
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempOrder = {};
      } else {
        this.tempOrder = { ...item };
      }
      this.isNew = isNew;

      this.orderDom.showModal();
    },
    getViewTitle() {
      this.viewTitle = this.calendarDom.getViewTitle();
    },
    getViewDate() {
      this.pickerDate = this.calendarDom.getViewDate();
    },
    changeView(selectedView) {
      this.calendarDom.changeView(selectedView);
      this.getViewTitle();
    },
    prevFn() {
      this.calendarDom.prevFn();
      this.getViewTitle();
      this.getViewDate();
    },
    nextFn() {
      this.calendarDom.nextFn();
      this.getViewTitle();
      this.getViewDate();
    },
    gotoDate() {
      this.calendarDom.gotoDate(this.pickerDate);
      this.getViewTitle();
    },
    gotoToday() {
      debugger;
      this.calendarDom.gotoDate(new Date());
      this.getViewTitle();
      this.pickerDate = new Date();
    },
    addNewEvent(item) {
      this.calendarDom.addNewEvent(item);
      this.orderDom.hideModal();
    },
    updateEvent(item) {
      this.calendarDom.updateEvent(item);
      this.orderDom.hideModal();
    },
    removeEvent(clickInfo) {
      this.calendarDom.removeEvent(clickInfo);
      this.orderDom.hideModal();
    },
  },
  mounted() {
    this.calendarDom = this.$refs.calendar;
    this.orderDom = this.$refs.orderModal;
    this.getViewTitle();
  },
  created() {
    this.getUrl();
  },
};
</script>
<style lang="scss">
.bd-layout {
  display: grid;
  grid-template-columns: 260px auto;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header header"
    "sidebar main";
}
.bd-header {
  grid-area: header;
}
.bd-sidebar {
  grid-area: sidebar;
}
.bd-main {
  grid-area: main;
}
.vc-container {
  border: none;
}

.vc-weekday,
.vc-day-content {
  font-size: var(--text-xs);
}
.vc-title {
  font-size: var(--text-sm);
}
</style>
