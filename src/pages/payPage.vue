<template>
    <div class="payPage grey lighten-2">
        <iHeader @doSomething="$emit('hide')" text="订单支付"></iHeader>
        <div class="px-4 py-2 d-flex white">
          <v-avatar
            size="70"
            tile
            color="grey lighten-3"
          >
            <v-img :src="pic"></v-img>
          </v-avatar>
          <div class="d-flex flex-fill ml-2 flex-column justify-space-between">
            <div>{{name}}</div>
            <div class="d-flex justify-space-between">
              <span class="pink--text text--accent-2">￥{{totalMoney}}</span>
              <span>x1</span>
            </div>
          </div>
        </div>
        <v-divider></v-divider>
        <div class="px-4 py-2 d-flex justify-space-between white">
          <span>商品总额</span>
          <span>￥{{totalMoney}}</span>
        </div>
        <div class="px-4 py-2 d-flex justify-space-between white">
          <span>商品优惠</span>
          <span>￥{{discounts}}</span>
        </div>
        <v-divider></v-divider>
        <div class="px-4 py-2 text-right mb-2 white">实付款：<span class="pink--text text--accent-2">￥{{actualPayment}}</span></div>
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
      pOrderId: {
        type: Number,
        required: true
      }
    },
    components: {
       iHeader
    },
    data: ()=>({
      payWay: 0,
      payInfo: null,
      auntId: 0,
      itemId: 0,
      nannyId: 0,
      obj: null, 
      totalMoney: 0,     
      discounts: 0,     
      actualPayment: 0,
      pic: '',
      name: ''   
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
      if(this.pOrderId){
        this.init()
      }
    },
    methods: {
      async init(){
        const params = {
          orderId: this.pOrderId
        }
        let res = await this.$http.get('/order/findOrderById',{params})
        if(res.data&&res.data.success){
          let obj = res.data.obj
          for(let x in obj) {
            this[x] = obj[x]
          }
          this.pic = obj.orderServices[0].pic
          this.name = obj.orderServices[0].name

        }        
      },
      async commit() {
        const data = {
          orderId: this.pOrderId,
          payWay: this.payWay+1
        }
        let res = await this.$http.post('/order/payAttestation',data)
        if(res.data.success){
          console.log(res.data.obj)
          this.payInfo = {
            obj: res.data.obj,
            payway: this.payWay+1
          };
          if(this.payWay){//微信支付，检测微信安装
            const msg = {wxInstalled: 'Yo!'}
            webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(msg));
            return
          }
          //支付宝
          //这里发送数据到给app处理
          window.webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(this.payInfo));
        }
      },
      setItemEvent(e){
        if(e.key=='wxInstalled'){
          if(e.newVal){
            window.webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(this.payInfo));
          }else{
            this.toast('请先安装微信')
          }
          // that.wxInstalled = true
        }
        if(e.key=='paySucceed'){
          if(e.newVal){
            this.$toast('支付成功,可在订单列表中查看详情')
            this.$router.push({
              path: '/order',
              query: {type: 2}
            })
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
