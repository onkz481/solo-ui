<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-textarea
        v-bind="props"
      />
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuTextarea'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    unit
  })
})
</script>