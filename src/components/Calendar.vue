<template>
  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
// import moment from 'moment'
// import 'moment/locale/zh-tw'
// import OrderModal from "../components/OrderModal";
export default {
  components: {
    FullCalendar,
    // OrderModal,
  },
  // props: {
  //   lineName: String,
  //   linePicture: String,
  // },
  data() {
    return {
      // selectedView: "timeGridWeek",
      // pickerDate: new Date(),
      // viewTitle: "",
      // ViewDate: "",
      // tempOrder: {},
      calendarApi: null,
      // attrs: [
      //   {
      //     key: "today",
      //     highlight: {
      //       style: {
      //         background: "#fcc",
      //       },
      //       contentStyle: {
      //         color: "white",
      //       },
      //     },
      //     dates: new Date(),
      //   },
      // ],
      calendarOptions: {
        locale: "zh-tw",
        timeZone: "UTC",
        plugins: [
          dayGridPlugin,
          interactionPlugin,
          timeGridPlugin,
          momentPlugin,
        ],
        initialView: "timeGridWeek",
        firstDay: 7,
        height: "100%",
        // allDaySlot: false,
        headerToolbar: {
          left: "",
          center: "",
          right: "",
        },
        views: {
          timeGridDay: {
            titleFormat: "YYYY/MM/DD",
            dayHeaderFormat: "ddd MM/DD",
          },
          timeGridWeek: {
            dayHeaderFormat: "ddd MM/DD",
          },
        },
        selectable: true, // 是否可點日期
        select: this.handleDateSelect, // 點了日期會跑出的視窗
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        editable: true,
        events: [],
      },
      currentEvents: [],
    };
  },
  methods: {
    handleDateSelect(selectInfo) {
      // console.log(selectInfo);
      const title = prompt("請輸入事件名稱");
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect(); // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: Math.floor(Date.now()),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        });
      }
    },
    handleEventClick(clickInfo) {
      // this.openModal(false, {
      //   id: clickInfo.event.id,
      //   title: clickInfo.event.title,
      //   start: formatDate(clickInfo.event.startStr),
      //   end: formatDate(clickInfo.event.endStr),
      //   allDay: clickInfo.event.allDay,
      //   event: clickInfo,
      // });
      console.log(clickInfo);
      this.$emit("handle-event-clock", false, {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: this.formatDate(clickInfo.event.startStr),
        end: this.formatDate(clickInfo.event.endStr),
        allDay: clickInfo.event.allDay,
        event: clickInfo,
      });

      // console.log(clickInfo.event)
      // if (confirm(`你確定要刪除 '${clickInfo.event.title}' 嗎?`)) {
      //   clickInfo.event.remove()
      // }
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    // openModal(isNew, item) {
    //   if (isNew) {
    //     this.tempOrder = {};
    //   } else {
    //     this.tempOrder = { ...item };
    //   }
    //   this.isNew = isNew;
    //   const orderDom = this.$refs.orderModal;
    //   orderDom.showModal();
    // },
    addNewEvent(item) {
      debugger;
      console.log(item);
      this.calendarApi.addEvent({
        id: item.id,
        title: item.title,
        start: item.start,
        end: item.end,
        allDay: item.allDay,
      });
      // const orderDom = this.$refs.orderModal;
      // orderDom.hideModal();
    },
    updateEvent(item) {
      const events = this.calendarApi.getEvents();
      const index = events.findIndex((_event) => _event.id === item.id);
      // console.log(index, events);
      events[index].setProp("title", item.title);
      events[index].setStart(item.start);
      events[index].setEnd(item.end);
      events[index].setAllDay(item.allDay);

      // const orderDom = this.$refs.orderModal;
      // orderDom.hideModal();
    },
    removeEvent(clickInfo) {
      clickInfo.event.remove();
      // const orderDom = this.$refs.orderModal;
      // orderDom.hideModal();
    },
    changeView(selectedView) {
      this.calendarApi.changeView(selectedView);
      // this.getViewTitle();
    },
    getViewTitle() {
      return this.calendarApi.view.title;
    },
    getViewDate() {
      // 取得目前視圖日期
      return this.calendarApi.getDate();
      // this.pickerDate = viewDate; // date-picker 也要換日期
      // return viewDate;
    },
    prevFn() {
      this.calendarApi.prev();
      // this.getViewTitle();
      // this.getViewDate();
    },
    nextFn() {
      this.calendarApi.next();
      // this.getViewTitle();
      // this.getViewDate();
    },
    gotoDate(pickerDate) {
      debugger;
      this.calendarApi.gotoDate(pickerDate);
      // this.getViewTitle();
    },
    formatDate(date) {
      if (date.indexOf("Z") > 0) {
        return date.slice(0, date.indexOf("Z"));
      } else {
        return date;
      }
    },
  },
  mounted() {
    this.calendarApi = this.$refs.fullCalendar.getApi();
    this.getViewTitle();
  },
};
</script>
<style lang="scss">
.fc {
  flex: 1;
  table {
    font-size: 10px;
    color: #70757a;
    .fc-col-header-cell-cushion {
      color: #70757a;
    }
  }
}
.fc .fc-toolbar.fc-header-toolbar {
  margin-bottom: 0;
}
.fc-timeGridDay-view .fc-scrollgrid,
.fc-timeGridWeek-view .fc-scrollgrid {
  border: none;
}
.fc .fc-timegrid-slot-minor {
  border: none;
  height: 2.5em;
}
.fc .fc-timegrid-slot-label {
  border: none;
}
.fc .fc-daygrid-day-top {
  justify-content: center;
}
</style>
