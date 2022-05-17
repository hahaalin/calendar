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
   <!-- 請同學自行新增 v-model -->
<div class="modal-dialog modal-xl" role="document">
  <div class="modal-content border-0">
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">
        <span>新增預約</span>
      </h5>
      <button type="button" class="btn-close"
              data-bs-dismiss="modal" aria-label="Close"></button>
    </div>
    <div class="modal-body">
        <div>
          <label for="">標題</label>
          <input type="text" v-model="tempOrder.title">
        </div>
        <div>
          <label for="">開始時間</label>
          <input type="datetime-local" v-model="tempOrder.start" >
        </div>
        <div>
          <label for="">結束時間</label>
          <input type="datetime-local" v-model="tempOrder.end" >
        </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-outline-secondary"
              data-bs-dismiss="modal">取消
      </button>
      <button type="button"  v-if="isNew" class="btn btn-primary" @click="addEvent"
>新增</button>

     <button type="button" v-if="!isNew" class="btn btn-primary" @click="updateEvent"
>編輯</button>
   <button type="button" v-if="!isNew" class="btn btn-danger" @click="removeEvent"
>刪除</button>

    </div>
  </div>
</div>
  </div>
</template>

<script>
import modalMixin from '@/mixins/modalMixin'
export default {
  props: {
    order: {
      type: Object
    },
    isNew: {
      type: Boolean
    }
  },
  data () {
    return {
      modal: {},
      tempOrder: {}
    }
  },
  methods: {
    addEvent () {
      this.$emit('add-event', {
        id: Math.floor(Date.now()),
        title: this.tempOrder.title,
        start: this.tempOrder.start,
        end: this.tempOrder.end
      })
    },
    updateEvent () {
      this.$emit('update-event', this.tempOrder)
    },
    removeEvent () {
      this.$emit('remove-event', this.tempOrder.event)
    }
  },
  watch: {
    order () {
      this.tempOrder = this.order
      console.log('tempOrder', this.tempOrder)
    }
  },
  mixins: [modalMixin]
}

</script>
