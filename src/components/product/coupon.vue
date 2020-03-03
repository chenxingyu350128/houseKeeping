<template>
  <div class="wrap">
    <div v-if="state==1" class="base-coupons white--text py-2 d-flex">
      <div class="left-side d-flex flex-column align-center">
        <span class="headline font-weight-bold">￥{{money}}</span>
        <span class="caption mt-2">满{{pull}}可用</span>
      </div>
      <div class="right-side flex-fill ml-1 pa-2 d-flex flex-column">
        <div class="d-flex align-center justify-space-between">
          <span>{{scope}}</span>
          <v-icon  v-if="!!checked" color="pink lighten-2">mdi-check-circle</v-icon>
        </div>
        <div class="caption mt-2">有效期至：{{endTime}}</div>
      </div>
    </div>
    <div v-else class="disable-coupons white--text py-2 d-flex">
      <div class="left-side d-flex flex-column align-center">
        <span class="headline font-weight-bold">￥{{money}}</span>
        <span class="caption mt-2">满{{pull}}可用</span>
      </div>
      <div class="right-side flex-fill ml-1 pa-2 d-flex flex-column">
        <div class="d-flex align-center justify-space-between">
          <span>{{scope}}</span>
          <v-icon v-if="!!checked" color="pink lighten-2">mdi-check-circle</v-icon>
        </div>
        <div class="caption mt-2">有效期至：{{endTime}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'coupon-cpnt',
    props: {
      checked: {
        type: Boolean,
        default: false
      },
      scope: {
        type: String,
        required: true
      },
      endTime: {
        type: String,
        required: true
      },
      state: {
        type: Number,
        required: true
      },
      money: {
        type: Number,
        required: true
      },
      pull: {
        type: Number,
        required: true
      },
    },
    components: {
       iHeader
    },
    data: ()=>({
      haha: '啊是的请问'
    }),
    created() {

    },
    computed: {

    },
    mounted() {

    },
    methods: {

    }
};
</script>

<style scoped lang="scss">

  .base-coupons {
    width: calc(100vw - 16px);
    height: 25vw;
    position: relative;
    background: radial-gradient(circle at right top, transparent 2.5vw,  #04c0af 0) top left / calc((100vw - 16px)/4) 51% no-repeat,
      radial-gradient(circle at right bottom, transparent 2.5vw,  #04c0af 0) bottom left /calc((100vw - 16px)/4) 51% no-repeat,
      radial-gradient(circle at left top, transparent 2.5vw, #999999 0) top right /calc((100vw - 16px)/4*3) 51% no-repeat,
      radial-gradient(circle at left bottom, transparent 2.5vw, #999999 0) bottom right /calc((100vw - 16px)/4*3) 51% no-repeat;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,.3));
    .left-side{
      width: calc((100vw - 16px)/4);
    }
  }
  .disable-coupons {
    width: calc(100vw - 16px);
    height: 25vw;
    position: relative;
    background: radial-gradient(circle at right top, transparent 2.5vw,  #999999 0) top left / calc((100vw - 16px)/4) 51% no-repeat,
      radial-gradient(circle at right bottom, transparent 2.5vw,  #999999 0) bottom left /calc((100vw - 16px)/4) 51% no-repeat,
      radial-gradient(circle at left top, transparent 2.5vw, #999999 0) top right /calc((100vw - 16px)/4*3) 51% no-repeat,
      radial-gradient(circle at left bottom, transparent 2.5vw, #999999 0) bottom right /calc((100vw - 16px)/4*3) 51% no-repeat;
    filter: drop-shadow(3px 3px 3px rgba(0,0,0,.3));
    .left-side{
      width: calc((100vw - 16px)/4);
    }
  }
  .base-coupons::before,
  .disable-coupons::before {
    content: '';
    height: calc(100% - 5vw);
    border: 1px dashed #fff;
    position: absolute;
    left: calc((100vw - 16px)/4);
    top: 0;
    bottom: 0;
    margin: auto;
  }
  .base-coupons::after,
  .disable-coupons::after {
    content: '';
    position: absolute;
    height: 100%;
    width:5px;
    top: 0;
    right: -5px;
    background-image: linear-gradient(to bottom, #999999 5px, transparent 5px, transparent),
    radial-gradient(2.5vw circle at 5px 2.5vw, transparent 5px, #999999 5px);
    background-size: 5px 15px;
  }
</style>

