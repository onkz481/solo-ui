<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-card
        v-bind="props"
      >
        <su-card-title>Title</su-card-title>

        <su-card-subtitle>Title</su-card-subtitle>

        <su-card-content>Content</su-card-content>

        <su-card-actions>
          <su-spacer />

          <su-btn
            text
          >
            button
          </su-btn>
        </su-card-actions>
      </su-card>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuCard'

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