<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <div class="text--center">
        <su-label
          v-bind="props"
        >
          label
        </su-label>
      </div>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuLabel'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    unit
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>