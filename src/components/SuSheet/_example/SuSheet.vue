<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-sheet
        v-bind="props"
        class="mx-auto"
      >
        <div
          class="d-flex align-center justify-center"
          style="height: 100%;"
        >
          Sheet 1
        </div>
      </su-sheet>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuSheet'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {
      color: 'primary',
      width: 100,
      height: 100
    },
    unit
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>