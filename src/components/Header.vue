<template lang="">
  <header class="d-flex border-bottom p-2 align-items-center bd-header">
    <div class="d-flex align-items-center">
      <img src="@/assets/icons8-google-calendar-96.png" alt="" width="40" />
      <h1 class="fs-4 mb-0">日曆</h1>
    </div>
    <div class="d-flex flex-wrap align-items-center">
      <button type="button" class="btn btn-outline-secondary">今日</button>

      <p class="secondary-bg-color rounded-pill p-2 ms-2 primary-color">
        {{ lineName }}<img :src="linePicture" style="width: 20px" />
      </p>
      <select v-model="selectedView" @change="changeView" class="">
        <option value="dayGridMonth">月</option>
        <option value="timeGridWeek">周</option>
        <option value="timeGridDay">日</option>
      </select>
    </div>
  </header>
</template>
<script>
export default {};
</script>
<style lang=""></style>
