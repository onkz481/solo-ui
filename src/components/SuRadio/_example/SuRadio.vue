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
        <su-radio
          v-bind="props"
        />
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuRadio'

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