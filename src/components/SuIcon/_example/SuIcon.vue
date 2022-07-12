<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-row
        justify="center"
      >
        <su-icon
          v-bind="props"
        >
          mdi-home
        </su-icon>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuIcon from '../SuIcon'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    unit: SuIcon
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>