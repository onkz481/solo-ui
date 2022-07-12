<template>
  <UnitTester
    :component="SuWindow"
    :overwrites="options"
  >
    <template #default="{ props }">
      <su-window
        v-model="window"
        v-bind="props"
        class="mb-4"
      >
        <su-window-item>
          <su-sheet
            height="200"
            color="primary"
            class="d-flex align-center justify-center"
          >
            window 1
          </su-sheet>
        </su-window-item>

        <su-window-item>
          <su-sheet
            height="200"
            color="secondary"
            class="d-flex align-center justify-center"
          >
            window 2
          </su-sheet>
        </su-window-item>

        <su-window-item>
          <su-sheet
            height="200"
            color="primary"
            class="d-flex align-center justify-center"
          >
            window 3
          </su-sheet>
        </su-window-item>

        <template 
          v-if="attached"
          #prev="{ on, attrs }"
        >
          <su-btn
            v-bind="attrs"
            v-on="on"
          >
            Prev
          </su-btn>
        </template>

        <template 
          v-if="attached"
          #next="{ on, attrs }"
        >
          <su-btn
            v-bind="attrs"
            v-on="on"
          >
            Next
          </su-btn>
        </template>
      </su-window>

      <su-btn
        @click="attached = !attached"
      >
        Change Icon
      </su-btn>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuWindow from '../SuWindow'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    value: 0,
    options: {},
    window: 0,
    attached: false,
    SuWindow
  })
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