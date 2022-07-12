<template>
  <UnitTester
    :component="SuProgressLine"
    :excludes="['text']"
    :overwrites="computedOptions"
  >
    <template #default="{ props }">
      <su-sheet
        height="200"
        class="d-flex align-center mb-4 p-4"
        style="position: relative;"
        outlined
      >
        <su-progress-line
          v-model="progress"
          v-bind="props"
        >
          <template #default="{ value }">
            <div 
              class="d-flex align-center justify-center"
              style="height: 100%;"
            >
              {{ value !== 'indeterminate' ? `${value}%` : '∞' }}
            </div>
          </template>
        </su-progress-line>
      </su-sheet>

      <su-row
        justify="center"
      >
        <su-btn
          @click="changeInterval"
        >
          {{ isLoading ? 'Stop' : 'Start' }}
        </su-btn>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuProgressLine from '../SuProgressLine'

import SuProgress from './SuProgress.vue'

export default SuProgress.extend({
  data: () => ({
    options: {
      absolute: false,
      active: true,
      bottom: false,
      height: '30',
      reverse: false,
      top: false
    },
    SuProgressLine
  }),
  computed: {
    computedOptions(){
      return Vue.observable({
        ...SuProgress.options.computed.computedOptions.call(this),
        ...this.options
      })
    }
  }
})
</script>