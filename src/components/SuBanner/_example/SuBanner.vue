<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-banner
        v-model="banner"
        v-bind="props"
      >
        {{ dummyText }}

        <template #actions="{ close }">
          <su-btn
            text
          >
            action
          </su-btn>
          
          <su-btn
            text
            @click="close"
          >
            close
          </su-btn>
        </template>
      </su-banner>
    </template>

    <template #bottom>
      <div
        class="tool-box"
      >
        <su-checkbox
          v-model="banner"
          :label="`v-model: ${banner}`"
        />
      </div>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuBanner'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {},
    unit,
    dummyText: 'This sentence is a dummy. It is included to check the size, amount, character spacing, line spacing, etc. of characters.',
    banner: true
  })
})
</script>