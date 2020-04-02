<template>
  <div class="orderPage grey lighten-2">
    <!-- <iHeader @doSomething="$emit('hide')" text="我的订单"></iHeader> -->
    <div class="center-header primary white--text">
      我的订单
    </div>
    <v-tabs
      v-model="tab"
      color="primary"
      height="35"
      slider-color="primary"
      grow
      @change="tabChange"
    >
      <v-tab 
        v-for="(tab,i) in tabs" 
        :key="i" 
        style="min-width: unset!important" 
        class="px-0 caption transparent"
      >
        <v-divider
          v-if="i"
          inset
          vertical
        />       
        <v-spacer />
        <!-- eslint-disable-next-line vue/no-v-html -->
        <span v-html="tab.text" />
        <v-spacer />  
      </v-tab>
    </v-tabs> 
    <v-tabs-items v-model="tab">
      <van-list 
        v-if="tab!==4"
        ref="loadmore"
        class="grey lighten-2 pb-12"
        :immediate-check="false" 
        :finished="allLoaded" 
        loading-text="加载中..." 
        finished-text="已全部加载完"  
        @load="loadBottom"
      > 
        <div 
          v-for="(item,i) in list" 
          :key="i" 
          class="mt-2 white subtitle-2 text--secondary"
          @click="toDetails(item.orderId,item.orderType)"
        >
          <div class="d-flex justify-space-between px-6 py-2">
            <span>{{ item.createTime }}</span>
            <span :class="item.state==1?'primary--text':'red--text'">{{ item.status }}</span>
          </div>
          <v-divider />
          <div class="px-6 py-4 d-flex flex-column">
            <div class="font-weight-bold">
              {{ item.itemName }}
            </div>
            <div
              v-if="item.serviceTime"
              class="d-flex"
            >
              <span
                style="min-width: 6em"
                class="font-weight-bold"
              >预约时间：</span>
              {{ item.serviceTime }}
            </div>
            <div class="d-flex">
              <span
                style="min-width: 6em"
                class="font-weight-bold"
              >服务地址：</span>
              {{ item.address }}
            </div>
          </div>
          <v-divider />
          <div
            v-if="item.state&&item.state<=3"
            class="px-4 py-2 d-flex flex-row-reverse"
          >
            <v-btn
              v-if="item.state==3&&!item.evaluateTime"
              depressed
              class="ml-4"
              dark
              color="primary"
              @click.stop="toEvaluate(item)"
            >
              评价
            </v-btn>
            <v-btn
              v-if="item.state==1"
              depressed
              class="ml-4"
              dark
              color="primary"
              @click.stop="toPay(item.orderId)"
            >
              支付
            </v-btn>
            <v-btn
              v-if="item.state&&item.state<3"
              depressed
              class="ml-4"
              dark
              color="red"
              outlined
              @click.stop="beforeCancel(item.orderId)"
            >
              取消
            </v-btn>
          </div>
        </div>
      </van-list> 
      <!-- 保姆预约 -->
      <van-list
        v-else
        ref="loadmore"
        class="grey lighten-2 pb-12"
        :immediate-check="false" 
        :finished="allLoaded" 
        loading-text="加载中..." 
        finished-text="已全部加载完"  
        @load="loadBottom"
      > 
        <div 
          v-for="(item,i) in list" 
          :key="i" 
          class="mt-2 white subtitle-2 text--secondary"
        >
          <div class="d-flex justify-space-between px-6 py-2">
            <span>创建时间：</span>
            <span>{{ item.ctime }}</span>
          </div>
          <v-divider />
          <div class="px-6 py-4 d-flex flex-column">
            <div class="font-weight-bold">
              {{ item.itemName }}
            </div>
            <div class="d-flex">
              <span
                style="min-width: 6em"
                class="font-weight-bold"
              >预约时间：</span>
              {{ item.rtime }}
            </div>
            <div class="d-flex">
              <span
                style="min-width: 6em"
                class="font-weight-bold"
              >备注：</span>
              {{ item.remark }}
            </div>
          </div>
          <!-- <v-divider></v-divider>
                    <div v-if="item.state==1||(item.state==3&&!item.evaluateTime)" class="px-4 py-2 d-flex flex-row-reverse">
                        <v-btn @click.stop="toEvaluate(item)" v-if="item.state==3" depressed class="ml-4" dark color="primary">评价</v-btn>
                        <v-btn @click.stop="toPay(item)" v-if="item.state==1" depressed class="ml-4" dark color="primary">支付</v-btn>
                        <v-btn @click.stop="beforeCancel(item.orderId)" v-if="item.state==1" depressed class="ml-4" dark color="red" outlined>取消</v-btn>
                    </div> -->
        </div>
      </van-list> 
      <div
        v-if="!list.length"
        class="d-flex flex-column align-center py-12 grey lighten-2"
      >
        <v-img
          max-height="30vw"
          max-width="30vw"
          :src="emptyContent"
        />    
        <span class="mt-2 text--secondary">暂无订单</span>
      </div>          
    </v-tabs-items>  
    <orderDetails
      v-if="showDetails"
      :order-type="orderType"
      :p-order-id="orderId"
      @update="showDetails=false;tabChange()"
      @hide="showDetails=false"
    />     
    <payPage
      v-if="showPayPage"
      :p-order-id="orderId"
      @paySuccess="tabChange"
      @hide="showPayPage=false"
    />
    <alertBox
      title="确认取消该订单吗？"
      :show-it="showAlert"
      @certain="cancelCertain"
      @cancel="showAlert=false"
    />
    <evaluation
      v-if="showEvaluate"
      :p-order-id="orderId"
      @evalSuccess="showEvaluate=false;tabChange()"
      @hide="showEvaluate=false"
    />
  </div>
</template>

<script>
// import iHeader from '../components/public/header'
import alertBox from '../components/public/alertBox'
import orderDetails from './orderDetails'
import payPage from './payPage'
import evaluation from './evaluation'
export default {
    name: 'OrderPage',
    components: {
    //    iHeader,
       orderDetails,
       payPage,
       alertBox,
       evaluation
    },
    data: () => ({
        tab: 0,
        tabs: [
            { text: '待支付', value: 1 },
            { text: '进行中', value: 2 },
            { text: '已完成', value: 3 },
            { text: '全&emsp;部', value: -1 },
            { text: '预&emsp;约', value: 4 }
        ],
        // list: [],
        page: 1,
        rows: 10,
        allLoaded: false,
        showDetails: false,
        showPayPage: false,
        showEvaluate: false,
        showAlert: false,
        orderId: 0,
        nannyId: 0,
        auntId: 0,
        itemId: 0,
        orderType: 0,
        discount: 0,
        deleteId: 0,
        price: 0,
        finalPrice: 0,
        obj: null,
        emptyContent: require('../assets/img/emptyContent.png')
    }),
    computed: {
        userId() {
            return this.$store.state.app.userId
        },
        list() {
            return this.$store.state.app.orderList
        }
    },
    created() {
        this.loadBottom = this._.debounce(this.loadmore, 200)
    },
    mounted() {
        if (this.$route.query.type) {
            this.tab = parseInt(this.$route.query.type)
        }
        // console.log(this.$route.query.type)
        console.log('tab:', this.tab)
        this.tabChange()
    },
    methods: {
        async init(i) {
            const params = {
                userId: this.userId,
                page: this.page,
                rows: this.rows
            }
            if (this.tab !== 4) {
                params.state = this.tabs[this.tab].value
            }
            const url = this.tab !== 4 ? '/order/findOrderByState' : '/nanny/findNannySubscribes'
            const res = await this.$http.get(url, { params })
            const rows = res.data.rows
            const pager = res.data.pager
            this.allLoaded = pager.currentPage === pager.totalPages
            if (this.tab !== 4) {
                rows.forEach(res => {
                    switch (res.state) {
                        case 0: 
                            this.$set(res, 'status', '交易关闭')
                            break;
                        case 1: 
                            this.$set(res, 'status', '待支付')
                            break;
                        case 2: 
                            this.$set(res, 'status', '进行中')
                            break;
                        case 3: 
                            this.$set(res, 'status', '已完成')
                            break;
                        case 4: 
                            this.$set(res, 'status', '已取消')
                            break;
                    }
                })
            } else {
                rows.forEach(res => {
                    const ctime = this.$dateStr(new Date(res.createTime.time)) 
                    const time = this.$dateStr(new Date(res.time.time)) 
                    this.$set(res, 'ctime', ctime)
                    this.$set(res, 'rtime', time)
                })
            }
            const list = i ? this.list.concat(rows) : rows
            this.$store.commit('SET_SINGLE_STATE', ['orderList', list])
        },
        tabChange() {
            this.page = 1
            this.$store.commit('SET_SINGLE_STATE', ['orderList', []])
            this.init()
            // if(this.tab!=4){
            //     return
            // }
            // this.getReserve(e)
        },
        async getReserve(i) { // 预约
            const params = {
                userId: this.userId,
                rows: this.rows,
                page: this.page
            }
            const res = await this.$http.get('/nanny/findNannySubscribes', { params })
            const rows = res.data.rows
            const pager = res.data.pager
            this.allLoaded = pager.currentPage === pager.totalPages
            rows.forEach(res => {
                switch (res.state) {
                    case 0: 
                        this.$set(res, 'status', '交易关闭')
                        break;
                    case 1: 
                        this.$set(res, 'status', '待支付')
                        break;
                    case 2: 
                        this.$set(res, 'status', '进行中')
                        break;
                    case 3: 
                        this.$set(res, 'status', '已完成')
                        break;
                    case 4: 
                        this.$set(res, 'status', '已取消')
                        break;
                }
            })
            const list = i ? this.list.concat(rows) : rows
            this.$store.commit('SET_SINGLE_STATE', ['orderList', list])
        },
        loadmore() {
            this.page++
            this.init('Yo')
        },
        toDetails(id, type) {
            this.orderId = id
            this.orderType = type
            this.showDetails = true
        },
        toEvaluate(item) {
            this.nannyId = item.nannyId
            this.auntId = item.auntId
            this.itemId = item.itemId
            this.orderId = item.orderId
            this.showEvaluate = true
        },
        beforeCancel(id) {
            this.deleteId = id
            this.showAlert = true
        },
        async cancelCertain() {
            this.showAlert = false
            const data = {
                orderId: this.deleteId,
                cause: '不需要了'
            }
            const res = await this.$http.post('/order/cancelOrder', data)
            if (res.data.success) {
                this.$toast.success('订单取消成功')
                this.page = 1
                this.init()
            }
        },
        toPay(e) {
            this.orderId = e
            this.showPayPage = true
        }
    }
};
</script>

<style scoped lang="scss">

   .orderPage{
       padding-top: 45px;
       height: 100vh;
       overflow: auto
   } 
    [role=tablist]{
        position: fixed;
        left: 0;
        right: 0;
        top: 45px;
        z-index: 99
    }
</style>
