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
              :props="props"
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
              v-for="option, key in props"
            >
              <su-text-field
                v-if="typeof option === 'string' || typeof option === 'number'"
                :key="key"
                v-model="props[key]"
                :label="key"
              />

              <su-checkbox
                v-else-if="typeof option === 'boolean'"
                :key="key"
                v-model="props[key]"
                :label="key"
              />
            </template>
          </div>
        </div>
      </su-col>
    </su-row>
  </su-sheet>
</template>

<script>
import { isNull } from '../util/boolHelpers'

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
    contentInnerClasses(){
      return {
        'unit-tester__content-inner': true,
        'unit-tester__content-inner-center': !this.relative,
      }
    }
  },
  watch: {
    component(component){
      this.setProps(component.options.props)
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
    setProps(component = undefined){
      const props = this.sortByTypeof( isNull(component) ? this.props : this.getComponentProps(component) )

      this.props = {...props, ...this.overwrites}

      this.$emit('update:props', this.props)
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

        if( this.overwrites[key] ){
          conversion[key] = this.overwrites[key]

          return
        }

        if( props[key].default !== undefined ) conversion[key] = props[key].default
        else conversion[key] = this.getUndefinedProp( props[key] )
      })

      return conversion
    },
    getUndefinedProp( prop ){
      if( Array.isArray(prop.type) ) return this.getArrayTypeProp(prop.type)

      switch(prop.type){
        case String:
          return ''
        case Number:
          return 0
        default:
          return undefined
      }
    },
    getArrayTypeProp(type){
      if( !Array.isArray(type) ) return undefined

      switch(true){
        case type.includes(String):
          return ''
        case type.includes(Number):
          return 0
        default:
          return undefined
      }
    },
    sortByTypeof(conversion){
      const textfields = {}, checkboxs = {}

      Object.keys(conversion).forEach(key => {
        switch( true ){
          case typeof conversion[key] === 'string':
            textfields[key] = conversion[key]
            break
          case typeof conversion[key] === 'number':
            textfields[key] = conversion[key]
            break
          case typeof conversion[key] === 'boolean':
            checkboxs[key] = conversion[key]
            break
        }
      })

      return {
        ...textfields,
        ...checkboxs
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