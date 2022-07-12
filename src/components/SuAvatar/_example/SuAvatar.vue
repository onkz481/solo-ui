<template>
  <UnitTester
    :component="SuAvatar"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-row
        justify="center"
      >
        <su-avatar
          v-bind="props"
        >
          <img src="https://joeschmoe.io/api/v1/random">
        </su-avatar>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuAvatar from '../SuAvatar'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    SuAvatar
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>