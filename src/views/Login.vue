<template>
  <div>
    <button type="button" @click="lineAuth"><img alt="line login logo" src="@/assets/btn_login_base.png" /></button>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    lineAuth () {
      var URL = 'https://access.line.me/oauth2/v2.1/authorize?'
      URL += 'response_type=code'
      URL += '&client_id=1657109301'
      URL += '&redirect_uri=https://hahaalin.github.io/calendar/dist/'
      URL += '&state=abcde'
      URL += '&scope=openid%20profile'
      window.location.href = URL
    }
  }
}
</script>
