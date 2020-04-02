<template>
  <v-bottom-navigation
    v-if="active"
    fixed
    height="48"
    grow
    color="#04c0af"
  >
    <v-btn to="/index">
      <span>首页</span>
      <v-icon>mdi-home-outline</v-icon>
    </v-btn>

    <v-btn to="/category">
      <span>分类</span>
      <v-icon>mdi-store</v-icon>
    </v-btn>

    <v-btn to="/order">
      <span>订单</span>
      <v-icon>mdi-account-circle</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
    export default {
        data:() => ({
            active: true
        })
    }
</script>

<style lang="scss" scoped>

</style>
