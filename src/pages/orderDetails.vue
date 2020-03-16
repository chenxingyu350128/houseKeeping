<template>
    <div class="orderDetails grey lighten-3 subtitle-2">
        <iHeader @doSomething="$emit('hide')" text="订单详情"></iHeader>
        <!-- 抢单 -->
        <div v-if="orderType===2" key="qianddan">
          <div class="ma-4">
            <!-- 进度 -->
            <v-stepper class="teal white--text lighten-3" v-model="attemperStatus">
              <v-stepper-header style="height: 36px" alt-labels height="30">
                <v-stepper-step class="py-0" :complete="attemperStatus>0" step="1">aaa</v-stepper-step>
                <v-stepper-step class="py-0" :complete="attemperStatus>1" step="2">vStepperStepText</v-stepper-step>
                <v-stepper-step class="py-0" :complete="attemperStatus>2" step="3">vStepperStepText</v-stepper-step>
                <v-stepper-step class="py-0" :complete="attemperStatus>3" step="4">vStepperStepText</v-stepper-step>
              </v-stepper-header>
              <v-stepper-items>
                <v-stepper-content class="py-5" step="1">我们已收到您的订单，正在处理</v-stepper-content>
                <v-stepper-content class="py-5" step="2">订单已调度，请耐心等待</v-stepper-content>
                <v-stepper-content class="py-5" step="3">服务正在进行，请等待</v-stepper-content>
                <v-stepper-content class="py-5" step="4">服务完成，感谢您的支持</v-stepper-content>
              </v-stepper-items>
            </v-stepper>
          </div>
          <!-- 服务信息 -->
          <div class="white px-4 py-2 mb-2 text--secondary my-2">
            <div class="d-flex pb-2">
              <v-avatar
                @click="toProductDetails"
                tile
                size="65"
              >
                <v-img :src="pic"></v-img>
              </v-avatar>
              <div class="ml-2 flex-fill d-flex flex-column justify-space-between align-end">
                <div class="d-flex justify-space-between">
                  <span>{{itemName}}</span>
                  <span>{{totalMoney}}</span>
                </div>
                <span>x1</span>
              </div>
            </div> 
          </div> 
          <div class="white subtitle-2 px-4 py-2 my-2">
            <div class="my-2">
              <span class="text--secondary">
                预约时间：
              </span>
              {{serviceTime}}
            </div>
            <div class="my-2">
              <span class="text--secondary">
                联系人：
              </span>
              {{customer}}
            </div>
            <div class="my-2">
              <span class="text--secondary">
                联系电话：
              </span>
              {{phone}}
            </div>
            <div class="my-2">
              <span class="text--secondary">
                服务地址：
              </span>
              {{address}}
            </div>
            <div class="my-2">
              <span class="text--secondary">
                备注：
              </span>
              {{remark}}
            </div>
            <v-divider v-if="auntModel"></v-divider>
            <div v-if="auntModel" class="my-2 d-flex align-center">
              <span>保洁员</span>
              <span class="ml-4 flex-fill">{{auntModel.trueName}}</span>
              <v-icon color="primary" @click="toCall(auntModel.userName)">mdi-phone-in-talk</v-icon>
            </div>
          </div>        
          <div class="white px-4 py-2">
            <div class="my-2">
              <span class="text--secondary">
                订单编号：
              </span>
              {{orderNumber}}
            </div>
            <div class="my-2">
              <span class="text--secondary">
                下单时间：
              </span>
              {{createTime}}
            </div>
          </div>
          <div class="white px-4 py-2 pb-11">
            <div class="my-2 d-flex justify-space-between">
              <span>
                商品总额：
              </span>
              {{totalMoney}}
            </div>
            <div class="my-2 d-flex justify-space-between">
              <span>
                商品优惠：
              </span>
              {{discounts}}
            </div>
            <v-divider></v-divider>
            <div class="py-2 text-right">
              实付款：<span class="primary--text">￥{{actualPayment}}</span>
            </div>
          </div>
        </div>
        <!-- 非抢单 -->
        <div v-else key="normal">
          <div v-if="state!==''" :class="state==1||state==2?'white--text cyan lighten-2':'red--text' " class="px-4 py-2 text-center">{{status}}</div>
          <div class="px-4 py-2 white text--secondary mb-2">
              <div>
                <span class="mr-4">{{customer}}</span>
                <span>{{phone}}</span>
              </div>
              <div>{{address}}</div>
          </div>
          <div class="white px-4 py-2 mb-2 text--secondary">
            <div class="d-flex pb-2">
              <v-avatar
                tile
                size="65"
              >
                <v-img :src="pic"></v-img>
              </v-avatar>
              <div class="ml-2 flex-fill d-flex flex-column justify-space-between align-end">
                <div class="d-flex justify-space-between">
                  <span>{{itemName}}</span>
                  <span>{{totalMoney}}</span>
                </div>
                <span>x1</span>
              </div>
            </div>
            <v-divider></v-divider>
            <div class="py-2">
              <div class="d-flex justify-space-between">
                <span>商品总价</span>
                <span>￥{{totalMoney}}</span>
              </div>
              <div class="d-flex justify-space-between">
                <span>优惠券</span>
                <span>-￥{{discounts}}</span>
              </div>
              <div class="d-flex justify-space-between">
                <span>应付款</span>
                <span>￥{{totalMoney-discounts}}</span>
              </div>
            </div>
          </div>
          <div v-if="remark" class="white text--primary mb-2">
            <div class="px-4 py-2">备注信息</div>
            <div class="px-4 py-2">{{remark}}</div>
          </div>
          <div v-if="cancelCause" class="white text--secondary mb-2">
            <div class="px-4 py-2">订单取消原因：</div>
            <div class="px-4 py-2 caption">{{cancelCause}}</div>
          </div>
          <div class="px-4 py-2 white text--secondary caption">
            <div>订单编号：{{orderNumber}}</div>
            <div>下单时间：{{createTime}}</div>
            <div v-if="payTime">付款时间：{{payTime}}</div>
            <div v-if="completeTime">完成时间：{{completeTime}}</div>
            <div v-if="evaluateTime">评价时间：{{evaluateTime}}</div>
          </div>

        </div>
        <v-footer class="pa-0 ma-0 d-flex flex-row-reverse" fixed bottom>
          <v-row class="pa-0 ma-0">
            <v-col v-if="state==1" class="py-1" cols="6">
              <v-btn @click="showAlert=true" dark outlined color="red" block depressed>取消订单</v-btn>
            </v-col>
            <v-col v-if="state==1" class="py-1" cols="6">
              <v-btn @click="toPay(orderServices[0])" dark color="primary" block depressed>去支付</v-btn>
            </v-col>
            <v-col v-if="state==3&&!evaluateTime" class="py-1" cols="6">
              <v-btn @click="toEvaluate(orderServices[0])" dark color="primary" block depressed>去评价</v-btn>
            </v-col>
            <v-col v-if="compModel&&compModel.servicePhone" class="py-1" cols="6">
              <v-btn @click="toCall(compModel.servicePhone)" dark color="primary" block depressed>联系客服</v-btn>
            </v-col>
            <!-- <v-col class="py-1" cols="6">
              <v-btn dark color="primary" block depressed>去评价</v-btn>
            </v-col>
            <v-col class="py-1" cols="6">
              <v-btn dark color="primary" block depressed>去评价</v-btn>
            </v-col> -->
          </v-row>
        </v-footer>
        <payPage @paySuccess="init" :pOrderId="orderId" @hide="showPayPage=false" v-if="showPayPage"/>
        <evaluation @evalSuccess="showEvaluate=false;init()" :obj="postObj" :auntId="auntId" :itemId="itemId" :nannyId="nannyId" @hide="showEvaluate=false" v-if="showEvaluate"/>
        <alertBox title="确认取消该订单吗？" @certain="cancelOrder" @cancel="showAlert=false" :showIt="showAlert"/>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
import alertBox from '../components/public/alertBox'
import payPage from './payPage'
import evaluation from './evaluation'
export default {
    name: 'orderDetails',
    props: {
      pOrderId: {
        type: Number,
        required: true
      },
      orderType: {
        type: Number,
        default: 1
      }
    },
    components: {
       iHeader,
       payPage,
       evaluation,
       alertBox
    },
    data: () => ({
      "actualPayment": 0,
      "address": "",
      "attemperStatus": 0,
      "auntId": 0,
      "auntModel": null,
      "beginTime": "",
      "cancelCause": "",
      "nannyId": 0,//保姆ID
      // "orderType": 1, //类型 0单次收费 1定金商品 2抢单
      "compModel": null,
      "completeTime": "", //完成时间
      "createTime": "",
      "customer": "",
      "discounts": 0,
      "endTime": "",
      "evaluateTime": "",
      "itemId": 0,
      "itemName": "",
      "orderId": 0,
      "orderNumber": "",
      "orderServices": [],
      "origin": 0,
      "payNum": "",
      "payStatus": false,
      "payTime": "",
      "payType": 0,
      "payWay": false,
      "phone": "",
      "region": "",
      "remark": "",
      "serviceTime": "",
      "state": '', //订单状态(0关闭 1待支付 2进行中 3已完成 4取消)
      "totalMoney": 0,
      "updateTime": "",
      pic:'',
      "postObj": null,
      "showPayPage": false,
      "showEvaluate": false,
      "showAlert": false,
    }),
    created() {

    },
    computed: {
      status() {
        switch(this.state) {
          case 0:
            return '已关闭'
            break;
          case 1:
            return '待支付'
            break;
          case 2:
            return '进行中'
            break;
          case 3:
            return '已完成'
            break;
          case 4:
            return '已取消'
            break;
        }
      }
    },
    mounted() {
      this.init()
    },
    methods: {
      async init() {
        const params = {
          orderId: this.pOrderId
        }
        let res = await this.$http.get('/order/findOrderById',{params})
        let obj = res.data.obj
        for(let x in obj) {
          this[x] = obj[x]
        }
        this.pic = this.orderServices[0].pic
        this.attemperStatus++
      },
      toProductDetails() {
        let id = this.itemId||this.auntId||this.nannyId
        this.$router.push({
          path: '/productDetails',
          query: {
            id
          }
        })
      },
      toPay(e) {
        this.postObj = e
        this.showPayPage = true
      },
      toEvaluate(e) {
        this.postObj = e
        this.showEvaluate = true
      },
      async cancelOrder() {
        this.showAlert = false
        const data = {
          orderId: this.pOrderId,
          cause: '不需要了'
        }
        let res = await this.$http.post('/order/cancelOrder',data)
        if(res.data.success){
          this.$toast('订单取消成功')
          this.$emit('update')
        }
      },
      toCall(e) {
        location.href='tel:' + e
      }
    }
}
</script>

<style scoped lang="scss">

   .orderDetails{
       position: fixed;
       left: 0;
       right: 0;
       top: 0;
       bottom: 0;
       height: 100vh;
       padding-top: 45px;
       overflow-y: auto;
       z-index: 5; 
   } 
</style>
