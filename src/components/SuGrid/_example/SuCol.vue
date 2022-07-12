<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
    relative
  >
    <template #default="{ props }">
      <su-container
        style="height: 100%;"
      >
        <su-row
          style="height: 100%;"
        >
          <su-col
            v-bind="props"
            style="border: 1px solid"
          >
            Col
          </su-col>
        </su-row>
      </su-container>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuCol'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    dialog: false,
    excludes: [],
    options: {},
    unit
  })
})
</script>