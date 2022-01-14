<script>
import Vue from 'vue';
import SuHeader from '../src/lib-components/SuHeader/SuHeader.vue';
import SuNav from '../src/lib-components/SuNav/SuNav.vue';
// Uncomment import and local "components" registration if library is not registered globally.
// import { SoloUiSample } from '@/entry.esm';

export default Vue.extend({
  components: { SuHeader, SuNav },
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

      <su-nav></su-nav>
    </su-app>
  </div>
</template>
