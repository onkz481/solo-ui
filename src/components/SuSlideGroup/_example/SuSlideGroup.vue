<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-slide-group
        v-bind="props"
      >
        <su-row>
          <su-col
            v-for="n in 10"
            :key="n"
          >
            <su-slide-item
              v-slot="{ active, toggle }"
            >
              <su-card
                width="150"
                height="200"
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
            </su-slide-item>
          </su-col>
        </su-row>
      </su-slide-group>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuSlideGroup'

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