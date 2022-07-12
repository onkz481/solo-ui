<template>
  <su-sheet
    rounded="normal"
  >
    <UnitTester
      :component="unit"
      :overwrites="options"
      :excludes="excludes"
      :props.sync="propsOptions"
      relative
    >
      <template #default="{ props }">
        <su-card>
          <su-table
            v-bind="props"
            :page.sync="props.page"
            :options.sync="tableOptions"
          />
        </su-card>
      </template>

      <template #bottom>
        <su-btn
          @click="addItem"
        >
          add item
        </su-btn>
      </template>
    </UnitTester>

    <su-divider />
    
    <su-card>
      <su-appbar
        elevation="0"
      >
        <su-appbar-title>Pre Options</su-appbar-title>

        <su-spacer />

        <su-btn
          icon
          text
          @click="preOptions = !preOptions"
        >
          <su-icon>{{ `mdi-chevron-${preOptions ? 'up' : 'down'}` }}</su-icon>
        </su-btn>
      </su-appbar>

      <su-expand-transition>
        <div
          v-show="preOptions"
        >
          <su-divider />

          <pre
            v-text="propsOptions"
          />
        </div>
      </su-expand-transition>
    </su-card>
  </su-sheet>
</template>

<script>
import Vue from 'vue'
import unit from '../SuTable'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    excludes: [],
    options: {
      headers: [
        {
          text: 'header name',
          value: 'name'
        },
        {
          text: 'header value',
          value: 'value'
        }
      ],
      items: [
        {
          name: 'item name 1 <code>code</code>',
          value: 'item value 1'
        },
        {
          name: 'item name 2',
          value: 'item value 2'
        }
      ]
    },
    tableOptions: {},
    propsOptions: {},
    preOptions: false,
    unit
  }),
  methods: {
    addItem(){
      this.options.items.push({
        name: `item name ${this.options.items.length + 1}`,
        value: `item value ${this.options.items.length + 1}`,
      })
    },
    genItems( j = 5 ){
      const items = []

      for(let i = 0; i < j; i++){
        items.push({
          name: `Name ${i + 1}`,
          value: `Value ${i + 1}`
        })
      }
    }
  }
})
</script>