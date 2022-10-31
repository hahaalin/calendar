<template>
  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-light bg-gradient">
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 grid">
            <label for="" class="g-col-1 col-form-label"></label>
            <div class="g-col-11">
              <input
                type="text"
                class="form-control-plaintext border-bottom"
                v-model="tempOrder.title"
                placeholder="新增標題"
              />
            </div>
          </div>

          <div class="mb-3 grid" v-if="tempOrder.allDay">
            <label for="" class="g-col-1">
              <i class="fa-regular fa-clock"></i
            ></label>
            <div class="g-col-11">
              <input
                type="date"
                class="border-0"
                v-model="tempOrder.start"
                style="max-width: 45%"
                required
              />
              -
              <input
                type="date"
                class="border-0"
                v-model="tempOrder.end"
                style="max-width: 45%"
                required
              />
            </div>
          </div>

          <div class="mb-3 grid" v-else>
            <label for="" class="g-col-1">
              <i class="fa-regular fa-clock"></i
            ></label>
            <div class="g-col-11">
              <input
                type="datetime-local"
                class="border-0"
                v-model="tempOrder.start"
                style="max-width: 45%"
              />
              -
              <input
                type="datetime-local"
                class="border-0"
                v-model="tempOrder.end"
                style="max-width: 45%"
              />
            </div>
          </div>

          <div class="mb-3 grid">
            <label for="" class="g-col-1"></label>
            <div class="form-check g-col-11">
              <input
                type="checkbox"
                name=""
                id="allDayCheck"
                class="form-check-input"
                v-model="tempOrder.allDay"
              />
              <label for="allDayCheck" class="form-check-label">全天</label>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            v-if="isNew"
            class="btn btn-primary"
            @click="addEvent"
          >
            新增
          </button>

          <button
            type="button"
            v-if="!isNew"
            class="btn btn-primary"
            @click="updateEvent"
          >
            更新
          </button>
          <button
            type="button"
            v-if="!isNew"
            class="btn btn-danger"
            @click="removeEvent"
          >
            刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modalMixin from "@/mixins/modalMixin";
export default {
  props: {
    order: {
      type: Object,
    },
    isNew: {
      type: Boolean,
    },
  },
  data() {
    return {
      modal: {},
      tempOrder: {},
    };
  },
  methods: {
    addEvent() {
      this.$emit("add-event", {
        id: Math.floor(Date.now()),
        title: this.tempOrder.title,
        start: this.tempOrder.start,
        end: this.tempOrder.end,
        allDay: this.tempOrder.allDay,
      });
    },
    updateEvent() {
      this.$emit("update-event", this.tempOrder);
    },
    removeEvent() {
      this.$emit("remove-event", this.tempOrder.event);
    },
  },
  watch: {
    order() {
      this.tempOrder = this.order;
      console.log("tempOrder", this.tempOrder);
    },
  },
  mixins: [modalMixin],
};
</script>
<style lang="scss">
input:focus-visible {
  background-color: rgb(248, 249, 250);
  border-bottom: 1px solid#0d6efd !important;
  outline: none;
}
</style>
