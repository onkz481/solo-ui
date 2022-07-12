<template>
  <UnitTester
    :component="SuProgress"
    :overwrites="options"
  >
    <template #default="{ props }">
      <su-progress
        v-model="progress"
        v-bind="props"
      >
        <template #default="{ value, color }">
          <div
            v-if="value !== 'indeterminate'"
            class="d-flex align-center justify-center"
            style="height: 100px;"
          >
            <div
              :class="`progress-sample ${color}`"
              :style="{ height: `${value}px`, backgroundColor: `${color}`}"
            />

            <su-btn
              @click="changeInterval"
            >
              {{ value }}%
            </su-btn>
          </div>

          <div
            v-else
            class="d-flex align-center justify-center"
            style="height: 100px;"
          >
            {{ value }}
          </div>
        </template>
      </su-progress>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuProgress from '../SuProgress'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    interval: null,
    options: {
      backgroundColor: '#5d78bf',
      backgroundOpacity: '0.3',
      indeterminate: false
    },
    progress: 0,
    SuProgress
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    },
    isLoading(){
      const { interval } = this

      return interval !== null
    }
  },
  methods: {
    changeInterval(){
      if( this.interval ){
        window.clearInterval(this.interval)

        this.interval = null

        return
      }

      this.interval = window.setInterval(() => {
        let value = this.progress + 1

        this.progress = value > 100 ? 0 : value
      }, 100)
    }
  }
})
</script>

<style scoped>
  .progress-sample {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    transition: 0.3s cubic-bezier(0.25, 0.8, 0.5, 1);
  }
</style>