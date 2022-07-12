<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
    relative
  >
    <template #default="{ props }">
      <su-container
        v-bind="props"
      >
        <su-row>
          <su-col style="border: 1px solid">
            Col
          </su-col>

          <su-col style="border: 1px solid">
            Col
          </su-col>
        </su-row>
      </su-container>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuContainer'

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