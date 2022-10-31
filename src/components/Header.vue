<template lang="">
  <header class="d-flex border-bottom p-2 align-items-center bd-header">
    <div class="d-flex align-items-center" style="width: 260px">
      <img src="@/assets/icons8-google-calendar-96.png" alt="" width="40" />
      <h1 class="fs-4 mb-0">日曆</h1>
    </div>
    <div class="d-flex flex-wrap align-items-center flex-grow-1">
      <button type="button" class="btn btn-outline-secondary me-3">今日</button>
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
        {{ lineName }}<img :src="linePicture" width="20" />
      </p>
    </div>
  </header>
</template>
<script>
export default {};
</script>
<style lang=""></style>
