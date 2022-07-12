<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-list-item
        v-bind="props"
      >
        <su-list-item-content>
          <su-list-item-title>メニュー</su-list-item-title>
        </su-list-item-content>
      </su-list-item>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuListItem'

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