<template>
  <v-app ref="app" id="App">
    <v-content>
      <keep-alive v-if="keepAlive">
        <router-view/>
      </keep-alive>
      <router-view v-if="!keepAlive"/>
      <bottomNav/> 
      <loading/> 
    </v-content>
  </v-app>
</template>
<style lang="scss">
  #App{
   background: transparent;
   ul{
     padding-left: 0;
   }
  }
  .v-text-field__slot{
    >input{
      text-align: center!important;
    }
  }
  .v-textarea textarea{
    text-indent: 2em!important;
  }
  .el-vue-search-box-container{

    .search-tips{
        left: 0!important;
        right: 0!important;
    }
    }
</style>
<script>

import bottomNav from './components/public/bottomNav';
import loading from './components/public/RequestLoading'
// import { Promise } from 'q';
export default {
  name: 'App',
  components: {
      bottomNav,
      loading
  },
  data(){
    return{
      exitState: 0
    }
  },
  computed: {
    keepAlive(){
      return this.$route.meta.keepAlive
    }
  }
};
</script>
