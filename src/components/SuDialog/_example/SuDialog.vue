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
        <su-dialog
          v-model="dialog"
          v-bind="props"
        >
          <template #activator="{ on }">
            <su-btn
              v-on="on"
            >
              show dialog
            </su-btn>
          </template>

          <su-card>
            <su-card-title>
              Dialog
            </su-card-title>

            <su-divider />

            <su-card-content>
              Dialog Content
            </su-card-content>

            <su-divider />

            <su-card-actions>
              <su-spacer />

              <su-btn
                @click="dialog = !dialog"
              >
                close
              </su-btn>
            </su-card-actions>
          </su-card>
        </su-dialog>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuDialog'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    dialog: false,
    excludes: [],
    options: {
      maxWidth: 400
    },
    unit
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>