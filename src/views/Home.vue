<template>
<div class="container-fluid h-100 d-flex flex-column">
  <!-- <Vcalendar/> -->
<Calendar :lineName="displayName" :linePicture="pictureUrl" />
</div>

</template>

<script>
import 'v-calendar/dist/style.css'
import '@fortawesome/fontawesome-free/css/all.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/scss/main.scss'
import Calendar from '@/components/Calendar.vue'
import qs from 'query-string'
// import Vcalendar from '@/components/Vcalendar.vue'
export default {
  name: 'Home',
  components: {
    Calendar
  },
  data () {
    return {
      code: '',
      displayName: '',
      pictureUrl: ''
    }
  },
  methods: {
    getUrl () {
      var getUrlString = location.href
      var url = new URL(getUrlString)
      // console.log(url.searchParams.get('code'))
      if (url.searchParams.has('state')) {
        this.code = url.searchParams.get('code')

        this.$http.post('https://api.line.me/oauth2/v2.1/token', qs.stringify({
          grant_type: 'authorization_code',
          code: this.code,
          redirect_uri: 'https://hahaalin.github.io/calendar/dist/',
          client_id: '1657109301',
          client_secret: '6bdf74180a27a5fb330806ae2c65e6c3'
        })).then((response) => {
          console.log(response)
          const token = response.data.access_token
          this.$http.get('https://api.line.me/v2/profile',
            {
              headers: {
                Authorization: `Bearer ${token}`
              }
            }
          ).then((response) => {
            console.log(response.data)
            this.displayName = response.data.displayName
            this.pictureUrl = response.data.pictureUrl
          })
        })
      } else {
        // this.$router.push('/login')
      }
    }
  },
  created () {
    this.getUrl()
  }
}
</script>
<style lang="scss">

</style>
