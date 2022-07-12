<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-tabs
        v-model="tab"
        v-bind="props"
        class="mx-auto"
      >
        <su-tab
          v-for="n in 10"
          :key="n"
        >
          {{ `Item ${n}` }}
        </su-tab>
      </su-tabs>

      <su-tabs-items
        v-model="tab"
      >
        <su-tab-item
          v-for="n in 10"
          :key="n"
        >
          {{ `Item ${n}` }}
        </su-tab-item>
      </su-tabs-items>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuTabs'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    tab: 0,
    unit
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>