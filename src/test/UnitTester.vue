<template>
  <su-sheet
    rounded="normal"
  >
    <su-row
      no-gutters
    >
      <su-col
        cols="8"
      >
        <div
          class="d-flex align-center px-4 text-h6"
          style="height: 56px;"
        >
          <slot
            v-if="$slots.title"
            name="title"
          />

          <template
            v-else
          >
            {{ component.options.name }}
          </template>
        </div>

        <su-divider />
        
        <div
          ref="content"
          class="unit-tester__content p-4"
          :style="contentStyles"
        >
          <div
            v-if="isProps"
            ref="contentInner"
            :class="contentInnerClasses"
          >
            <slot
              :props="computedProps"
              :value="internalValue"
            />
          </div>
        </div>
          
        <div
          v-if="$slots.bottom"
          ref="bottom"
          class="unit-tester__content-bottom p-4"
        >
          <slot name="bottom" />
        </div>
      </su-col>

      <su-col
        cols="4"
      >
        <div
          class="d-flex align-center"
          style="height: 56px;"
        >
          <su-divider vertical />

          <div class="pl-4 text-h6">
            Options
          </div>
        </div>

        <su-divider />

        <div
          class="d-flex"
        >
          <su-divider vertical />

          <div
            class="p-4 overflow-auto"
            style="height: 400px;"
          >
            <template
              v-for="prop, key in props"
            >
              <su-text-field
                v-if="prop.type === String || prop.type === Number"
                :key="key"
                v-model="props[key].value"
                :label="key"
              />

              <su-text-field
                v-else-if="Array.isArray(prop.type) && ( prop.type.includes(String) || prop.type.includes(Number) )"
                :key="key"
                v-model="props[key].value"
                :label="key"
              />

              <su-checkbox
                v-else-if="prop.type === Boolean"
                :key="key"
                v-model="props[key].value"
                :label="key"
              />

              <su-menu
                v-else-if="prop.type === 'theme'"
                :key="key"
                offset-y
              >
                <template #activator="{ on }">
                  <su-btn
                    class="mb-4"
                    style="width: 100%;"
                    text
                    outlined
                    v-on="on"
                  >
                    {{ props[key].value }}
                  </su-btn>
                </template>

                <su-card>
                  <su-list>
                    <su-list-item
                      v-for="theme in $soloui.theme.themes"
                      :key="theme"
                      link
                      @click="props[key].value = theme"
                    >
                      <su-list-item-content>
                        <su-list-item-title>
                          {{ theme }}
                        </su-list-item-title>
                      </su-list-item-content>
                    </su-list-item>
                  </su-list>
                </su-card>
              </su-menu>
            </template>
          </div>
        </div>
      </su-col>
    </su-row>
  </su-sheet>
</template>

<script>
import { isNull } from '../util/helpers'

export default {
  name: 'UnitTester',
  props: {
    component: {
      type: Function,
      default: () => ({})
    },
    excludes: {
      type: Array,
      default: () => ([])
    },
    model: {
      type: String,
      default: 'value'
    },
    overwrites: {
      type: Object,
      default: () => ({})
    },
    relative: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    contentStyles: {},
    props: {},
    internalValue: undefined
  }),
  computed: {
    isProps(){
      return Object.keys(this.props).length > 0
    },
    computedProps(){
      const result = {}

      Object.keys(this.props).forEach(key => {
        result[key] = this.props[key].value
      })

      return result
    },
    contentInnerClasses(){
      return {
        'unit-tester__content-inner': true,
        'unit-tester__content-inner-center': !this.relative,
      }
    }
  },
  watch: {
    component(component){
      this.setProps(component)
    },
    overwrites: {
      handler(){
        this.setProps()
      },
      deep: true
    }
  },
  created(){
    this.setProps(this.component)
  },
  mounted(){
    this.$nextTick(() => {
      this.setContentStyles()
    })
  },
  methods: {
    setContentStyles(){
      const styles = {}

      if( this.$refs.bottom ) styles.height = `${400 - this.$refs.bottom.clientHeight}px`
      
      this.contentStyles = styles
    },
    setProp(props, key, overwrite){
      const result = {}

      result.type = props[key].type

      result.value = typeof props[key].default === 'function' ? props[key].default() : props[key].default

      if( overwrite ) result.value = overwrite

      // is Themeable
      if( key === 'theme' ){
        result.type = 'theme'
        result.value = this.$soloui.theme.current
      }

      return result
    },
    setProps(component = undefined){
      const props = this.sortByTypeof( isNull(component) ? this.props : this.getComponentProps(component) )

      let result = {}

      Object.keys(props).forEach((key) => {
        result[key] = props[key]

        if( this.overwrites[key] ) result[key].value = this.overwrites[key]
      })

      this.props = result

      this.$emit('update:props', this.computedProps)
    },
    getComponentProps(component){
      const props = component.options.props

      if( !props ) return {}

      let conversion = {}
      Object.keys(props).forEach(key => {
        if( !props[key] || this.excludes.includes(key) ) return

        if( key === this.model ){
          this.internalValue = props[key].default

          return
        }

        conversion[key] = this.setProp(props, key, this.overwrites[key])
      })

      return conversion
    },
    sortByTypeof(conversion){
      const prepend = {}, textfields = {}, append = {}

      let type
      Object.keys(conversion).forEach(key => {
        type = conversion[key].type

        switch( true ){
          case type === 'theme':
            prepend[key] = conversion[key]
            break
          case type === String || ( Array.isArray(type) && type.includes(String) ):
            textfields[key] = conversion[key]
            break
          case type === Number || ( Array.isArray(type) && type.includes(Number) ):
            textfields[key] = conversion[key]
            break
          case type === Boolean:
            append[key] = conversion[key]
            break
        }
      })

      return {
        ...prepend,
        ...textfields,
        ...append
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .unit-tester__content {
    position: relative;
    height: 400px;
    overflow: auto;
  }

  .unit-tester__content-inner {
    position: relative;
    height: 100%;

    &.unit-tester__content-inner-center {
      height: auto;
      top: 50%;
      transform:translateY(-50%);
    }
  }

  .default-bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>