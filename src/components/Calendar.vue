<template>
  <header class="d-flex flex-wrap justify-content-between">
    <h1>預約行事曆</h1>
    <div class="d-flex flex-wrap align-items-center">
      <select v-model="selectedView" @change="changeView" class="border-0  secondary-bg-color p-2 rounded-pill primary-color">
        <option value="timeGridWeek">周檢視</option>
        <option value="timeGridDay">日檢視</option>
      </select>
      <p class="secondary-bg-color rounded-pill p-2 ms-2 primary-color">{{lineName}}<img :src="linePicture" style="width: 20px;"></p>
    </div>
  </header>

  <div class="d-flex align-items-center">
    <button type="button" class="btn" @click="prevFn" ><i class="fa-solid fa-circle-chevron-left"></i></button>
    <v-date-picker :rows="2" class="" v-model="pickerDate" :attributes='attrs' color="green" @dayclick="onDayClick">
      <template v-slot="{ togglePopover }">
        <div class="d-flex items-center">
          <button type="button" class="secondary-bg-color rounded-circle"
            @click="togglePopover()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20" style="width:20px;height:20px;margin: 5px;"
            >
              <path
                d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
              ></path>
            </svg>
          </button>
        </div>
      </template>

        <!-- <template v-slot:footer>
      <div class="bg-gray-100 text-center p-2 border-t rounded-b-lg">
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToToday"
        >
          Today
        </button>
      </div>
    </template> -->
    </v-date-picker>

    <p>{{viewTitle}}</p>
    <button type="button" class="btn" @click="nextFn"><i class="fa-solid fa-circle-chevron-right"></i></button>
  </div>

  <FullCalendar ref="fullCalendar"
        :options='calendarOptions'
      />

  <OrderModal ref="orderModal" @add-event="addNewEvent"/>
  <footer class="p-3 text-center">
      <button class="btn primary-bg-color text-white" @click="openModal">+ 新增預約</button>
  </footer>

</template>
<script>
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import momentPlugin from '@fullcalendar/moment'
// import moment from 'moment'
// import 'moment/locale/zh-tw'
import OrderModal from '../components/OrderModal'

export default {
  components: {
    FullCalendar, OrderModal
  },
  props: {
    lineName: String,
    linePicture: String
  },
  data () {
    return {
      selectedView: 'timeGridWeek',
      pickerDate: new Date(),
      viewTitle: '',
      ViewDate: '',
      attrs: [
        {
          key: 'today',
          highlight: {
            style: { // Circle styles
              background: '#7F74B4'
            },
            contentStyle: { // Text styles
              color: 'white'
            }
          },
          dates: new Date()
        }
      ],
      calendarOptions: {
        locale: 'zh-tw',
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, momentPlugin],
        initialView: 'timeGridWeek',
        firstDay: 1, // 周一開始
        height: '100%',
        allDaySlot: false,
        headerToolbar: {
          left: '',
          center: '',
          right: ''
        },
        // buttonText: {
        //   today: '今日'
        //   month: '月顯示',
        //   week: '周顯示',
        //   day: '日顯示'
        // },
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
        viewDidMount: function (view) {
          console.log(view)
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
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.addEvent({
        id: item.id,
        title: item.title,
        start: item.start,
        end: item.end
      })
      const orderComponent = this.$refs.orderModal
      orderComponent.hideModal()
    },
    changeView () { // 改變視圖 周或日
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.changeView(this.selectedView)
      this.getViewTitle()
    },
    getViewTitle () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      this.viewTitle = calendarApi.view.title
    },
    getViewDate () { // 取得目前視圖日期
      const calendarApi = this.$refs.fullCalendar.getApi()
      const viewDate = calendarApi.getDate()
      this.pickerDate = viewDate // date-picker 也要換日期
    },
    prevFn () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.prev()
      this.getViewTitle()
      this.getViewDate()
    },
    nextFn () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.next()
      this.getViewTitle()
      this.getViewDate()
    },
    onDayClick () {
      const calendarApi = this.$refs.fullCalendar.getApi()
      calendarApi.gotoDate(this.pickerDate)
      this.getViewTitle()
    }

  },
  mounted () {
    this.getViewTitle()
  }
}
</script>
<style lang='scss'>
.fc {
flex:1;
}
.fc .fc-toolbar.fc-header-toolbar {
    margin-bottom: 0;
}
</style>
