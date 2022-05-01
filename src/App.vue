<template>
<div class="container-fluid h-100 d-flex flex-column">
  <!-- <Vcalendar/> -->
<Calendar />
</div>

</template>
<script>
import 'v-calendar/dist/style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/scss/main.scss'
import Calendar from '@/components/Calendar.vue'
// import Vcalendar from '@/components/Vcalendar.vue'
export default {
  name: 'Home',
  components: {
    Calendar
  }
}
</script>
<style lang="scss">
// @import 'bootstrap';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  height: 100%;
}

</style>
