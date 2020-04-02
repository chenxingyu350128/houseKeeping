<template>
  <div class="couponsPage white pb-12">
    <iHeader
      text="选择优惠方式"
      @doSomething="$emit('hide')"
    />
    <div class="mx-2">
      <div class="py-2 d-flex justify-space-between align-center subtitle-1">
        <span>可使用优惠劵 ({{ active.length }}张)</span>
        <div class="d-flex align-center caption">
          <v-icon dense>
            mdi-help-circle
          </v-icon>
          <span>使用规则</span>
        </div>
      </div>
      <coupon 
        v-for="(cp,i) in active" 
        :key="i"
        :scope="cp.couponName"
        :state="cp.state"
        :end-time="cp.endTime"
        :money="cp.money"
        :pull="cp.pull" 
        :checked="cp.couponId==selectedId"
        class="my-1" 
        @click.native="activedClick(i)"
      />
      <div class="py-2 d-flex justify-space-between align-center subtitle-1">
        <span>不可使用优惠劵 ({{ inactive.length }}张)</span>
      </div>
      <coupon 
        v-for="(cp,j) in inactive" 
        :key="'yo'+j"
        :scope="cp.couponName"
        :state="cp.state"
        :end-time="cp.endTime"
        :money="cp.money" 
        :pull="cp.pull" 
        class="my-1"
      />
    </div>
    <v-footer
      bottom
      fixed
      class="white justify-center"
    >
      <v-btn
        large
        dark
        depressed
        color="primary"
        @click="$emit('unset')"
      >
        不使用优惠券
      </v-btn>
    </v-footer>
  </div>
</template>

<script>
import iHeader from '../public/header'
import coupon from './coupon'
export default {
    name: 'CouponPage',
    components: {
       iHeader,
       coupon
    },
    props: {
        price: {
            type: Number,
            required: true
        },
        selectedId: {
            type: Number,
            default: 0
        }
    },
    data: () => ({
    }),
    computed: {
        couponList() {
            return this.$store.state.app.couponList
        },     
        active() {
           return this.couponList
           .filter(res => {
                const state1 = res.state == 1
                const state2 = res.pull < this.price
                const timeFit = Date.parse(new Date()) > Date.parse(res.beginTime) && Date.parse(new Date()) < Date.parse(res.endTime)
                return state1 && state2 && timeFit
            })
        },        
        inactive() {
           return this.couponList
           .filter(res => {
                const state1 = res.state != 1
                const state2 = res.pull > this.price
                const timeFit = Date.parse(new Date()) < Date.parse(res.beginTime)
                return state1 || state2 || timeFit
            })
        }        
    },
    created() {

    },
    mounted() {

    },
    methods: {
        activedClick(i) {
            this.$emit('couponGet', this.model1[i])
            console.log(i)
        }
    }
};
</script>

<style scoped lang="scss">

   .couponsPage{
       position: fixed;
       left: 0;
       right: 0;
       top: 0;
       bottom: 0;
       height: 100vh;
       padding-top: 45px;
       overflow-y: auto;
       z-index: 99; 
   } 
</style>
