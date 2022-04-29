<template>
  <header class="d-flex">
    <h1>預約行事曆</h1>
        <button @click="openModal" class="btn btn-primary">新增預約</button>
  </header>
  <div>
       <!-- <button @click="getDate">目前日期</button>
   <button @click="changeview">日</button>
          <button @click="openModal">新增預約</button> -->
  <FullCalendar ref="fullCalendar"
        :options='calendarOptions'
      />
<OrderModal ref="orderModal" @add-event="addNewEvent"/>
  </div>

</template>
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import listPlugin from '@fullcalendar/list'
import momentPlugin from '@fullcalendar/moment'
import moment from 'moment'
import 'moment/locale/zh-tw'
import OrderModal from '../components/OrderModal'

export default {
  components: {
    FullCalendar, OrderModal
  },
  data () {
    return {
      calendarOptions: {
        locale: 'zh-tw',
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin, momentPlugin],
        initialView: 'timeGridWeek',
        firstDay: 1, // 周一開始
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        },
        buttonText: {
          today: '今日',
          month: '月顯示',
          week: '周顯示',
          day: '日顯示'
        },
        views: {
          timeGridDay: {
            titleFormat: 'YYYY/MM/D'
          }
        },
        selectable: true, // 是否可點日期
        select: this.handleDateSelect, // 點了日期會跑出的視窗
        eventClick: this.handleEventClick,
        eventsSet: this.handleEvents,
        editable: true,
        events: [],
        customButtons: {
          addEventButton: {
            text: 'add event...',
            click: function () {
              const calendarApi = this.$refs.fullCalendar.getApi()
              var dateStr = prompt('Enter a date in YYYY-MM-DD format')
              var date = new Date(dateStr + 'T00:00:00') // will be in local time

              if (!isNaN(date.valueOf())) { // valid?
                calendarApi.addEvent({
                  title: 'dynamic event',
                  start: date,
                  allDay: true
                })
                alert('Great. Now, update your database...')
              } else {
                alert('Invalid date.')
              }
            }
          }
        }
      },
      currentEvents: []
    }
  },
  methods: {
    handleDateSelect (selectInfo) {
      // console.log(selectInfo)
      const title = prompt('請輸入事件名稱')
      const calendarApi = selectInfo.view.calendar
      calendarApi.unselect() // clear date selection
      if (title) {
        calendarApi.addEvent({
          id: Math.floor(Date.now()),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay
        })
      }
    },
    handleEventClick (clickInfo) {
      if (confirm(`你確定要刪除 '${clickInfo.event.title}' 嗎?`)) {
        clickInfo.event.remove()
      }
    },
    handleEvents (events) {
      this.currentEvents = events
    },
    openModal () {
      const orderComponent = this.$refs.orderModal
      orderComponent.showModal()
    },
    addNewEvent (item) {
      // const calendarApi = this.$refs.fullCalendar.getApi()
      console.log(item)
      // var dateStr = prompt('Enter a date in YYYY-MM-DD format')
      // var date = new Date(dateStr + 'T00:00:00') // will be in local time

      // if (!isNaN(date.valueOf())) { // valid?
      //   calendarApi.addEvent({
      //     title: 'dynamic event',
      //     start: date,
      //     allDay: true
      //   })
      //   alert('Great. Now, update your database...')
      // } else {
      //   alert('Invalid date.')
      // }

      this.calendarOptions.events = [
        ...this.calendarOptions.events, item
      ]
      const orderComponent = this.$refs.orderModal
      orderComponent.hideModal()
    },
    changeview () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.changeView('timeGridDay')
    },
    getDate () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      var date = calendarApi.getDate()
      alert('The current date of the calendar is ' + date)
    }
  },
  mounted () {
    moment.locale('zh-tw')
  }
}
</script>
<style lang='scss'>
header{
  height: 48px;
}
.fc {
height: calc(100vh - 48px);
}
</style>
