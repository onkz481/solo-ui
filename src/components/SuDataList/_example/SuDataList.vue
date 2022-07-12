<template>
  <UnitTester
    :component="unit"
    :overwrites="options"
    :excludes="excludes"
    relative
  >
    <template #default="{ props }">
      <su-data-list
        v-bind="props"
        :items="items"
        :loading="loading"
        :to="to"
        :total="total"
        @more="getItems"
      >
        <template #default="{ item }">
          <su-list-item>
            <su-list-item-icon>
              <su-icon>{{ item.icon }}</su-icon>
            </su-list-item-icon>

            <su-list-item-content>
              <su-list-item-title>{{ item.title }}</su-list-item-title>
            </su-list-item-content>
          </su-list-item>
        </template>
      </su-data-list>
    </template>
  </UnitTester>
</template>

<script>
import Vue from 'vue'
import unit from '../SuDataList'

import UnitTester from '../../../test/UnitTester.vue'

export default Vue.extend({
  components: {
    UnitTester
  },
  data: () => ({
    dummyOptions: {
      page: 1,
      itemsPerPage: 5,
      to: 0,
      total: 15
    },
    excludes: [],
    items: [],
    loading: false,
    options: {},
    to: 0,
    total: 1,
    unit
  }),
  mounted(){
    this.getItems()
  },
  methods: {
    getItems(){
      this.loading = true

      this.dummyApi().then((res) => {
        this.items.push(...res.data.data)

        this.to = res.to
        this.total = res.total

        this.loading = false
      })
    },
    dummyApi(){
      return new Promise((resolve) => {
        window.setTimeout(() => {
          let data = []
          for( let i = this.dummyOptions.to; i < (this.dummyOptions.to + this.dummyOptions.itemsPerPage); i++ ){
              data.push({ id: i, title: 'item ' + (i + 1), icon: 'mdi-account-circle' })
          }

          this.dummyOptions.to += this.dummyOptions.itemsPerPage

          this.dummyOptions.page++

          resolve({
            data: {
                data: data
            },
            to: this.dummyOptions.to,
            total: this.dummyOptions.total
          })
        }, 1000)
      })
    },
  }
})
</script>