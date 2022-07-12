<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-appbar
        v-bind="props"
        class="mx-auto"
      >
        <su-icon>
          mdi-menu
        </su-icon>

        <su-appbar-title>
          title
        </su-appbar-title>
      </su-appbar>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuAppbar'

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