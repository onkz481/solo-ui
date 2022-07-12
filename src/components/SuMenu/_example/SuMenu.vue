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
        <su-menu
          v-bind="props"
        >
          <template #activator="{ on }">
            <su-btn
              v-on="on"
            >
              menu
            </su-btn>
          </template>

          <su-card
            elevation="0"
          >
            <su-list>
              <su-list-item
                link
              >
                <su-list-item-content>
                  <su-list-item-title>
                    List 1
                  </su-list-item-title>
                </su-list-item-content>
              </su-list-item>

              <su-list-item
                link
              >
                <su-list-item-content>
                  <su-list-item-title>
                    List 1
                  </su-list-item-title>
                </su-list-item-content>
              </su-list-item>
            </su-list>
          </su-card>
        </su-menu>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuMenu'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    unit
  })
})
</script>