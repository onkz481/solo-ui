<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
  >
    <template #default="{ props }">
      <su-slide-switch-transition
        v-for="(n, index) in slideMax"
        :key="n"
        v-bind="props"
      >
        <su-container
          v-show="index === slide"
        >
          <div
            class="d-flex align-center justify-center secondary"
            style="width: 100%; height: 200px;"
          >
            {{ `Item ${n}` }}
          </div>
        </su-container>
      </su-slide-switch-transition>
    </template>

    <template #bottom>
      <su-row
        justify="space-between"
      >
        <su-btn
          @click="slidePrev"
        >
          Prev
        </su-btn>

        <su-btn
          @click="slideNext"
        >
          Next
        </su-btn>
      </su-row>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuSlideSwitchTransition'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {
      reverse: false
    },
    slide: 0,
    slideMax: 3,
    slideReverse: false,
    unit
  }),
  methods: {
    slideNext(){
      this.options.reverse = false
      const slide = this.slide + 1

      this.slide = slide > (this.slideMax - 1) ? 0 : slide
    },
    slidePrev(){
      this.options.reverse = true
      const slide = this.slide - 1

      this.slide = slide < 0 ? this.slideMax - 1 : slide
    }
  }
})
</script>