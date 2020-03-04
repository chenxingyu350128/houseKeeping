<template>
    <div class="payPage grey lighten-2">
        <iHeader @doSomething="$emit('hide')" text="订单支付"></iHeader>
        <div class="px-4 py-2 d-flex white">
          <v-avatar
            size="70"
            tile
            color="pink lighten-3"
          >
            <v-img :src="obj.pic"></v-img>
          </v-avatar>
          <div class="d-flex flex-fill ml-2 flex-column justify-space-between">
            <div>{{obj.name}}</div>
            <div class="d-flex justify-space-between">
              <span class="pink--text text--accent-2">￥{{price}}</span>
              <span>x1</span>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="px-4 py-2 d-flex justify-space-between white">
          <span>商品总额</span>
          <span>￥{{price}}</span>
        </div>
        <div class="px-4 py-2 d-flex justify-space-between white">
          <span>商品优惠</span>
          <span>￥{{discount}}</span>
        </div>
        <v-divider></v-divider>
        <div class="px-4 py-2 text-right mb-2 white">实付款：<span class="pink--text text--accent-2">￥{{finalPrice}}</span></div>
        <div class="px-4 py-2 white">支付方式</div>
        <div @click="payWay=0" class="px-4 py-2 d-flex align-center justify-space-between white">
          <div class="d-flex align-center">
            <v-avatar
              class="mr-2"
              size="25"
            >
              <v-img src="../assets/img/WeChat.png"></v-img>
            </v-avatar>
            微信支付
          </div>
          <v-icon color="primary">{{payWay==0?'mdi-check-circle':'mdi-circle-outline'}}</v-icon>
        </div>
        <div @click="payWay=1" class="px-4 py-2 d-flex align-center justify-space-between white">
          <div class="d-flex align-center">
            <v-avatar
              class="mr-2"
              size="25"
            >
              <v-img src="../assets/img/alipay.png"></v-img>
            </v-avatar>            
            支付宝支付
          </div>
          <v-icon color="primary">{{payWay==1?'mdi-check-circle':'mdi-circle-outline'}}</v-icon>
        </div>
        <div class="px-4 py-2 d-flex align-center justify-end caption text--secondary">
          <v-icon dense>mdi-help-circle-outline</v-icon>取消扣款规则
        </div>
        <v-footer fixed bottom class="white pa-0 ma-0">
          <v-btn @click="commit" block large depressed dark color="primary" tile>确认支付</v-btn>
        </v-footer>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
export default {
    name: 'payPage',
    props: {
      obj: {
        type: Object,
        required: true
      },
      fromAdd: {
        type: Boolean,
        required: false
      },
      price: {
        type: Number,
        required: true
      },
      discount: {
        type: Number,
        required: true
      },
      finalPrice: {
        type: Number,
        required: true
      },
    },
    components: {
       iHeader
    },
    data: ()=>({
      payWay: 0,
    }),
    created(){
      let that = this
      document.addEventListener('setItemEvent',this.setItemEvent)
    },
    beforeDestroy(){
      document.removeEventListener('setItemEvent',this.setItemEvent)
    },
    computed: {

    },
    mounted() {

    },
    methods: {
      async commit() {
        const data = {
          orderId: this.obj.orderId,
          payWay: this.payWay+1
        }
        let res = await this.$http.post('/order/payAttestation',data)
        if(res.data.success){
          console.log(res.data.obj)
          const payInfo = {
            obj: res.data.obj,
            payway: this.payWay+1
          };
          //这里发送数据到给app处理
          webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(payInfo));
        }
      },
      setItemEvent(e){
        if(e.key=='wxInstalled'){
          if(e.newVal){
            this.submit(this.propPrice)
          }
          // that.wxInstalled = true
        }
        if(e.key=='paySucceed'){
          if(e.newVal){
            if(this.fromAdd){
              this.$router.push('/order')
              this.$toast('支付成功,请在订单页查看详情')
              return
            }
            this.$emit('paySuccess')
          }else{
            this.$toast('支付失败，请重试')
          }
        }
      }      
    }
};
</script>

<style scoped lang="scss">

   .payPage{
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
