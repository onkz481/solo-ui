<template>
  <UnitTester
    :component="SuTabsSlider"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-tabs-slider
        v-bind="props"
      />
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuTabsSlider from '../SuTabsSlider'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester,
    SuTabsSlider
  },
  data: () => ({
    excludes: [],
    options: {
      color: 'primary',
      width: 90 
    },
    SuTabsSlider
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>