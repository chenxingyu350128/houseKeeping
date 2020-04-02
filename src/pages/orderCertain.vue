<template>
  <div class="orderCertain grey lighten-3">
    <iHeader
      text="订单确认"
      @doSomething="$emit('hide')"
    />
    <div class="px-4 white mb-2">
      <div class="py-2 d-flex">
        <v-avatar
          size="70"
          tile
        >
          <img :src="pic">
        </v-avatar>
        <div class="ml-2 d-flex flex-column justify-space-around">
          <span>{{ item.type }}</span>
          <span class="text--secondary">数量:1</span>
        </div>
        <div class="red--text flex-fill d-flex justify-end">
          {{ item.price }}元
        </div>
      </div>
      <v-divider />
      <div class="d-flex align-center justify-space-between py-4 subtitle-2">
        <v-icon
          class="mr-4"
          color="primary"
        >
          mdi-map-marker
        </v-icon>
        <div
          v-if="finalAddressItem"
          class="d-flex flex-column text--secondary"
          @click="showAddress=true"
        >
          <span>
            {{ finalAddressItem.receiver }}
            <span class="ml-4">{{ finalAddressItem.phone }}</span>
          </span>
          <span>{{ finalAddressItem.address }}</span>
        </div>
        <div
          v-else
          class="flex-fill text-right text--secondary pr-6"
          @click="showAddress=true"
        >
          +添加服务地址
        </div>
      </div>
    </div>
    <div
      v-if="type"
      class="d-flex align-center px-4 py-3 mb-2 white subtitle-2"
      @click="toTimePage"
    >
      <v-icon
        class="mdi-rotate-225"
        color="primary"
      >
        mdi-clock-outline
      </v-icon>
      <div class="flex-fill ml-3 text--secondary text-right">
        {{ dateStr||'请选择服务时间' }}
      </div>
      <v-icon class="mr-4">
        mdi-chevron-right
      </v-icon>
    </div>
    <div
      class="d-flex align-center px-4 py-3 mb-2 white"
      @click="showCouponPage=true"
    >
      <v-icon
        class="mdi-rotate-225"
        color="primary"
      >
        mdi-tag
      </v-icon>
      <div class="flex-fill ml-3 text-right subtitle-2 text--secondary">
        {{ discountStr||'请选择优惠方式' }}
      </div>
      <v-icon class="mr-4">
        mdi-chevron-right
      </v-icon>
    </div>
    <v-card
      tile
      flat
    >
      <div class="pa-4">
        备注信息
      </div>
      <v-textarea
        outlined
        auto-grow
        class="pa-0 ma-0 px-2 white"
      />  
      <div class="caption px-4 pb-2 text--secondary">
        服务人员由系统自动分配
      </div>      
    </v-card>
    <v-footer
      fixed
      bottom
      class="pa-0 ma-0 d-flex flex-row-reverse white"
    >
      <v-btn
        depressed
        tile
        large
        color="primary"
        @click="payIt"
      >
        立即支付
      </v-btn>
      <div class="d-flex flex-column justify-space-around subtitle-2 mr-2">
        <span>
          待支付
          <span class="ml-2 red--text">￥{{ finalPrice }}</span>
        </span>
        <span class="caption text--secondary">已优惠：￥{{ discount }}</span>
      </div>
    </v-footer>
    <couponsPage 
      v-if="showCouponPage" 
      :selected-id="selectedCouponId" 
      :price="item.price"
      @unset="showCouponPage=false;couponUnset=true"
      @couponGet="selectCoupon" 
      @hide="showCouponPage=false"
    />
    <timePage
      v-if="showTimePage"
      :id="finalAddressItem.communityId"
      :type="type"
      @timeSelect="timeSelect"
      @hide="showTimePage=false"
    />
    <addressList
      v-if="showAddress"
      :type="type"
      @addressSelect="addressSelect"
      @hide="showAddress=false"
    />
    <payPage
      v-if="showPayPage"
      :p-order-id="orderId"
      @hide="showPayPage=false"
    />
  </div>
</template>

<script>
import iHeader from '../components/public/header'
import couponsPage from '../components/product/couponList'
import timePage from '../components/product/timePage'
import addressList from '../components/product/addressList'
import payPage from './payPage'
export default {
    name: 'OrderCertain',
    components: {
       iHeader,
       couponsPage,
       timePage,
       addressList,
       payPage
    },
    props: {
        item: {
            type: Object,
            required: true
        },
        pic: {
            type: String,
            required: true
        },
        type: {
            type: Number,
            required: true
        },
        compId: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        selectedAddress: null,
        selectedCoupon: null,
        selectedCouponId: 15,
        orderId: 0,
        // discount: 0.01,
        // discountStr: '',
        dateStr: '',
        showCouponPage: false,
        showAddress: false,
        showTimePage: false,
        showPayPage: false,
        couponUnset: false,
        isTrue: true,
        postObj: null
    }),
    computed: {
        defaultAddress() {
            return this.$store.state.app.defaultAddress
        },
        userId() {
            return this.$store.state.app.userId
        },
        couponList() {
            return this.$store.state.app.couponList
        },
        finalCoupon() {
            if (this.couponUnset) {
                return null
            }
            return this.selectedCoupon || this.availabelCoupons[0]
        },
        // eslint-disable-next-line vue/return-in-computed-property
        discountStr() {
            if (this.finalCoupon) {
                return this.finalCoupon.couponName + '满' + this.finalCoupon.pull + '减' + this.finalCoupon.money
            }
        },
        discount() {
            if (this.finalCoupon) {
                return this.finalCoupon.money
            }
            return 0
        },
        availabelCoupons() {
            // return [
            // {
            //     "beginTime": "2020-01-12 08:20:00", //有效期开始时间
            //     "couponId": 14, 
            //     "couponName": "通用券", //名称
            //     "createTime": "2020-01-12 08:20:00", //创建时间
            //     "endTime": "2020-05-12 08:20:00", //有效期结束时间
            //     "goodsId": 0, //商品ID
            //     "money": 30, //优惠券金额
            //     "pull": 50, //优惠券满减条件(满50-30)
            //     "state": 1, //状态 0无效 1有效 2已使用
            //     "userId": 1 //用户ID
            // },                
            // ]
           return this.couponList
           .filter(res => {
                const state1 = res.state === 1
                const state2 = res.pull <= this.price
                const timeFit = Date.parse(new Date()) > Date.parse(res.beginTime) && Date.parse(new Date()) < Date.parse(res.endTime)
                return state1 && state2 && timeFit
            })
            .sort((a, b) => {
                return a.pull - b.pull
            })
        },
        finalAddressItem() {
            return this.selectedAddress || this.defaultAddress
        },
        // finalConsignee() {
        //     if(this.selectedAddress){

        //         return this.selectedAddress.receiver
        //     }
        //     if(this.defaultAddress&&!this.selectedAddress){
        //         return this.defaultAddress.receiver
        //     }
        // },
        // finalTel() {
        //     if(this.selectedAddress){

        //         return this.selectedAddress.phone
        //     }
        //     if(this.defaultAddress&&!this.selectedAddress){
        //         return this.defaultAddress.phone
        //     }            
        // },
        // finalAddress() {
        //     if(this.selectedAddress){

        //         return this.selectedAddress.communityName + this.selectedAddress.address
        //     }
        //     if(this.defaultAddress&&!this.selectedAddress){
        //         console.log(this.defaultAddress)
        //         return this.defaultAddress.communityName + this.defaultAddress.address
        //     }            
        // },
        // finalCommunityId() {
        //     if(this.selectedAddress){

        //         return this.selectedAddress.communityId
        //     }
        //     if(this.defaultAddress&&!this.selectedAddress){
        //         console.log(this.defaultAddress)
        //         return this.defaultAddress.communityId 
        //     }            
        // },
        finalPrice() {
            return this.item.price - this.discount
        }
    },
    created() {

    },
    mounted() {
        this.findCoupon()
        this.getDefaultAddress()
    },
    methods: {
        getDefaultAddress() {
            this.$http.get('/user/findDefaultAddrByUserId', { params: { userId: this.userId } })
            .then(res => {
                if (res.data.success) {
                    this.$store.commit('SET_SINGLE_STATE', ['defaultAddress', res.data.obj])
                }
            })
        },
        findCoupon() {
            const params = {
                userId: this.userId,
                goodsId: this.item.detailId
            }
            this.$http.get('/user/findCoupon', { params })
            .then(res => {
                if (res.data.success) {
                    this.$store.commit('SET_SINGLE_STATE', ['couponList', res.data.obj])
                    // computed结果availabelCoupons的第一项为最大的优惠券
                    // 将其作为页面的显示参数
                    // this.selectedCouponId = this.availabelCoupons[0].couponId
                }
            })
        },
        selectCoupon(e) {
            this.showCouponPage = false
            console.log(e)
            this.selectedCoupon = e
            this.selectedCouponId = e.couponId
        },
        payIt() {
            if (!this.finalAddressItem) {
                this.$toast.error('请选择服务地址！')
                return
            }
            if (this.type && !this.dateStr) {
                this.$toast('请选择服务时间！')
                return
            }
            const data = {
                userId: this.userId,
                totalMoney: this.item.price,
                prices: this.item.price,
                pics: this.pic,
                nums: 1,
                origin: 1,
                compId: this.compId,
                orderType: this.type,
                actualPayment: this.finalPrice,
                dtIds: this.item.detailId,
                itemId: this.item.itemId,
                itemName: this.item.type,
                names: this.item.type,
                discounts: this.discount,
                customer: this.finalAddressItem.receiver,
                phone: this.finalAddressItem.phone,
                region: this.finalAddressItem.region,
                address: this.finalAddressItem.address

            }
            if (this.type) {
                data.serviceTime = this.dateStr
            }
            if (this.remark) {
                data.remark = this.remark
            }
            this.$http.post('/order/addOrder', data)
            .then(res => {
                if (res.data.success) {
                   this.orderId = res.data.obj.orderId
                   this.showPayPage = true
                   this.updateOrderList()// keep-alive配合vuex，需要更新订单列表。
                }
            })
        },
        async updateOrderList() {
            const params = {
                userId: this.userId,
                state: -1,
                page: 1,
                rows: 10
            }
            const res = await this.$http.get('/order/findOrderByState', { params })
            const rows = res.data.rows
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
            this.$store.commit('SET_SINGLE_STATE', ['orderList', rows])            
        },
        toTimePage() {
            if (!this.selectedAddress && !this.defaultAddress) {
                this.$toast('请先选择服务地址')
                return
            }
            this.showTimePage = true
        },
        timeSelect(e) {
            this.showTimePage = false
            console.log(e)
            this.dateStr = e
        },
        addressSelect(e) {
            this.showAddress = false
            console.log(e)
            this.selectedAddress = e
        }
    }
};
</script>

<style scoped lang="scss">

   .orderCertain{
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
