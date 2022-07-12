<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-img
        v-bind="props"
      />
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuImg'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {
      src: 'https://cdn.pixabay.com/photo/2022/06/22/16/00/cap-7278216_960_720.jpg',
      gradient: '90deg, rgba(145, 175, 175, 0.3), rgba(188, 146, 166, 0.3)',
      aspectRatio: '16/9'
    },
    unit
  })
})
</script>