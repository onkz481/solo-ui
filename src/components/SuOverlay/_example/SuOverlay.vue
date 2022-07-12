<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
    relative
  >
    <template #default="{ props }">
      <su-row
        style="height: 100%;"
        align="center"
        justify="center"
      >
        <su-btn @click="overlay = !overlay">
          Show Overlay
        </su-btn>
      </su-row>

      <su-overlay
        :value="overlay"
        v-bind="props"
      >
        <su-btn @click="overlay = !overlay">
          hide overlay
        </su-btn>
      </su-overlay>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuOverlay'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    overlay: false,
    unit
  })
})
</script>