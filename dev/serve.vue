<script>
import Vue from 'vue';
import SuHeader from '../src/lib-components/SuHeader/SuHeader.vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { SoloUiSample } from '@/entry.esm';

export default Vue.extend({
  components: { SuHeader },
  name: 'ServeDev',
  // components: {
  //  SoloUiSample,
  // }
});
</script>

<template>
  <div id="app">
    <su-app>
      <su-header></su-header>
    </su-app>
  </div>
</template>
