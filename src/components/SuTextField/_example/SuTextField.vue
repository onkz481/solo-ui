<template>
  <UnitTester
    :component="SuTextField"
    :overwrites="computedOptions"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-text-field
        v-bind="props"
      />
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'

import { SuInput } from '../../SuInput/_example'
import SuTextField from '../SuTextField'

import UnitTester from '../../../test/UnitTester.vue'

export default SuInput.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: ['theme', 'id'],
    options: {},
    SuTextField
  }),
  computed: {
    computedOptions(){
      return Vue.observable({
        ...SuInput.options.computed.computedOptions.call(this),
        ...this.options
      })
    }
  }
})
</script>