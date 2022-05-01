<template>
  <!-- <v-calendar />
  <v-date-picker v-model="date" /> -->
    <v-date-picker  :rows="2" class="inline-block h-full" v-model="date" :attributes='attrs'>
    <template v-slot="{ inputValue, togglePopover }">
      <div class="flex items-center">
        <button
          @click="togglePopover()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20" style="width:30px;height:30px"
            class="w-4 h-4 fill-current"
          >
            <path
              d="M1 4c0-1.1.9-2 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4zm2 2v12h14V6H3zm2-6h2v2H5V0zm8 0h2v2h-2V0zM5 9h2v2H5V9zm0 4h2v2H5v-2zm4-4h2v2H9V9zm0 4h2v2H9v-2zm4-4h2v2h-2V9zm0 4h2v2h-2v-2z"
            ></path>
          </svg>
        </button>
        <input
          :value="inputValue"
          class="bg-white text-gray-700 w-full py-1 px-2 appearance-none border rounded-r focus:outline-none focus:border-blue-500"
          readonly
        />
      </div>
    </template>
  </v-date-picker>
</template>
<script>
export default {
  data () {
    return {
      date: new Date(),
      attrs: [
        {
          key: 'today',
          highlight: {
            color: 'purple'
          },
          dates: new Date()
        }
      ]
    }
  }
}
</script>
