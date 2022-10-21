<template>
  <div class="bg-light h-100 d-flex">
    <div class="card text-center m-auto" style="max-width: 500px">
      <div class="card-body">
        <img src="@/assets/icons8-google-calendar-96.png" alt="" />
        <h1>快速登入</h1>

        <div>
          <button type="button" class="btn" @click="lineAuth">
            <img alt="line login logo" src="@/assets/btn_login_base.png" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    lineAuth() {
      var URL = "https://access.line.me/oauth2/v2.1/authorize?";
      URL += "response_type=code";
      URL += "&client_id=1657109301";
      URL += "&redirect_uri=https://hahaalin.github.io/calendar/dist/";
      URL += "&state=abcde";
      URL += "&scope=openid%20profile";
      window.location.href = URL;
    },
  },
};
</script>
