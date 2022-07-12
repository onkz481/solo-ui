<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <div
        class="d-flex align-center justify-center"
      >
        {{ radios }}
      </div>

      <su-row
        justify="center"
      >
        <su-radio-group
          v-model="radios"
          v-bind="props"
        >
          <su-radio
            v-for="n in 3"
            :key="n"
            :label="`Radio ${n}`"
            :value="`Radio ${n}`"
          />
        </su-radio-group>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuRadioGroup'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {
      mandatory: true
    },
    radios: ['Radio 1', 'Radio 2'],
    unit
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>