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

*{
    -moz-user-select: -moz-none;
    -moz-user-select: none;
    -o-user-select:none;
    -khtml-user-select:none;
    -webkit-user-select:none;
    -ms-user-select:none;
    user-select:none;
}
.no-wrap{
  white-space: nowrap;
}
.v-collips{
    border-radius: 3px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    max-width: 7em;
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
  .pb50{
    padding-bottom: 50px;
  }
  .center-header{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 5;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
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
