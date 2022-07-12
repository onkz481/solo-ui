<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
    relative
  >
    <template #default="{ props }">
      <su-list
        v-bind="props"
      >
        <su-list-item
          link
        >
          <su-list-item-content>
            <su-list-item-title>メニュー</su-list-item-title>
          </su-list-item-content>
        </su-list-item>

        <su-list-item
          link
        >
          <su-list-item-content>
            <su-list-item-title>メニュー</su-list-item-title>
          </su-list-item-content>
        </su-list-item>

        <su-list-group>
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
      </su-list>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuList'

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