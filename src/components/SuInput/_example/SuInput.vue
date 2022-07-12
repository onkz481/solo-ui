<template>
  <UnitTester
    :component="SuInput"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-input
        v-bind="props"
      >
        <div
          class="d-flex align-center"
          style="width: 100%; border: 1px dashed #fff;"
        >
          Default Slot
        </div>
      </su-input>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import SuInput from '../SuInput'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: ['theme', 'id'],
    options: {},
    SuInput
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>