<template>
  <UnitTester
    :component="SuProgressCircle"
    :overwrites="computedOptions"
  >
    <template #default="{ props }">
      <div 
        class="p-4 d-flex align-center"
        style="width: 100%; flex-direction: column;"
      >
        <div
          class="p-4 d-flex justify-center"
          style="width: 100%;"
        >
          <su-progress-circle
            v-model="progress"
            v-bind="props"
          >
            <template #default="{ value }">
              {{ value !== 'indeterminate' ? `${value}%` : '∞' }}
            </template>
          </su-progress-circle>
        </div>

        <div
          v-if="!props.indeterminate"
          class="p-4 d-flex justify-center"
          style="width: 100%;"
        >
          <su-btn
            @click="changeInterval"
          >
            {{ isLoading ? 'Stop' : 'Start' }}
          </su-btn>
        </div>
      </div>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuProgressCircle from '../SuProgressCircle'

import SuProgress from './SuProgress.vue'

export default SuProgress.extend({
  data: () => ({
    options: {
      size: '100',
      width: '10',
    },
    SuProgressCircle
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