<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-row
        justify="center"
      >
        <su-btn
          v-bind="props"
        >
          <template
            v-if="props.icon"
          >
            <su-icon>
              mdi-home
            </su-icon>
          </template>

          <template v-else>
            button
          </template>
        </su-btn>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuBtn'

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