<template>
  <FullCalendar ref="fullCalendar" :options="calendarOptions" />
</template>
<script>
import FullCalendar from "@fullcalendar/vue3";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import momentPlugin from "@fullcalendar/moment";
export default {
  components: {
    FullCalendar,
  },
  data() {
    return {
      calendarApi: null,
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
      const title = prompt("請輸入事件名稱");
      const calendarApi = selectInfo.view.calendar;
      calendarApi.unselect();
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
      this.$emit("handle-event-clock", false, {
        id: clickInfo.event.id,
        title: clickInfo.event.title,
        start: this.formatDate(clickInfo.event.startStr),
        end: this.formatDate(clickInfo.event.endStr),
        allDay: clickInfo.event.allDay,
        event: clickInfo,
      });
    },
    handleEvents(events) {
      this.currentEvents = events;
    },
    addNewEvent(item) {
      this.calendarApi.addEvent({
        id: item.id,
        title: item.title,
        start: item.start,
        end: item.end,
        allDay: item.allDay,
      });
    },
    updateEvent(item) {
      const events = this.calendarApi.getEvents();
      const index = events.findIndex((_event) => _event.id === item.id);
      events[index].setProp("title", item.title);
      events[index].setStart(item.start);
      events[index].setEnd(item.end);
      events[index].setAllDay(item.allDay);
    },
    removeEvent(clickInfo) {
      if (confirm(`你確定要刪除 '${clickInfo.event.title}' 嗎?`)) {
        clickInfo.event.remove();
      }
    },
    changeView(selectedView) {
      this.calendarApi.changeView(selectedView);
    },
    getViewTitle() {
      return this.calendarApi.view.title;
    },
    getViewDate() {
      return this.calendarApi.getDate();
    },
    prevFn() {
      this.calendarApi.prev();
    },
    nextFn() {
      this.calendarApi.next();
    },
    gotoDate(pickerDate) {
      this.calendarApi.gotoDate(pickerDate);
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
