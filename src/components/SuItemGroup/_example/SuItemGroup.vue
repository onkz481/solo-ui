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
        v-model: {{ items }}
      </div>

      <su-item-group
        v-if="props"
        v-model="items"
        v-bind="props"
      >
        <su-row>
          <su-col
            v-for="n in 3"
            :key="n"
            class="text--center"
          >
            <su-item
              v-slot="{ active, toggle }"
              active-class="primary"
              :value="`Item ${n}`"
            >
              <su-card
                height="200"
                class="mx-auto"
                @click="toggle"
              >
                <su-transition
                  transition="slide-y"
                >
                  <div
                    v-show="active"
                    style="height: 100%;"
                    class="text-h4 d-flex align-center justify-center"
                  >
                    {{ `Active ${n}` }}
                  </div>
                </su-transition>
              </su-card>
            </su-item>
          </su-col>
        </su-row>
      </su-item-group>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuItemGroup'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: ['theme', 'id'],
    options: {
      mandatory: true,
      multiple: true
    },
    items: [],
    unit
  }),
  computed: {
    computedOptions(){
      return Vue.observable(this.options)
    }
  }
})
</script>