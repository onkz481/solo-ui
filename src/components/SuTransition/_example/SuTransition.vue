<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-transition
        v-bind="props"
      >
        <su-card
          v-show="transition"
          class="mx-auto"
          color="secondary"
          width="100"
          height="100"
        />
      </su-transition>
    </template>

    <template #bottom>
      <su-row
        justify="center"
      >
        <su-btn
          @click="transition = !transition"
        >
          {{ transition ? 'hide' : 'view' }}
        </su-btn>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuTransition'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    transition: true,
    unit
  })
})
</script>