<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
    relative
  >
    <template #default="{ props }">
      <div
        class="d-flex align-center justify-center"
        style="height: 100%;"
      >
        <su-divider
          v-bind="props"
        />
      </div>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuDivider'

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