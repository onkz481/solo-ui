<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-list-group
        v-bind="props"
      >
        <template #activator>
          <su-list-item-content>
            <su-list-item-title>メニュー1</su-list-item-title>
          </su-list-item-content>
        </template>

        <su-list-item
          v-for="n in 3"
          :key="n"
          link
        >
          <su-list-item-content>
            <su-list-item-title>サブメニュー</su-list-item-title>
          </su-list-item-content>
        </su-list-item>
      </su-list-group>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuListGroup'

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