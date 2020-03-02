<template>
    <div class="orderCertain grey lighten-3">
        <iHeader @doSomething="$emit('hide')" text="订单确认"></iHeader>
        <div class="px-4 white mb-2">

            <div class="py-2 d-flex">
                <v-avatar
                    size="70"
                    tile
                >
                    <img :src="item.attrPic" alt="alt">
                </v-avatar>
                <div class="ml-2 d-flex flex-column justify-space-around">
                    <span>{{item.type}}</span>
                    <span class="text--secondary">数量:1</span>
                </div>
                <div class="red--text flex-fill d-flex justify-end">{{item.price}}元</div>
            </div>
            <v-divider></v-divider>
            <div class="d-flex align-center py-4 subtitle-2">
                <v-icon class="mr-4" color="primary">mdi-map-marker</v-icon>
                <div @click="showAddress=true" v-if="defaultAddress||selectedAddress" class="d-flex flex-column">
                    <span>
                        {{finalConsignee}}
                        <span class="ml-4">{{finalTel}}</span>
                    </span>
                    <span>{{finalAddress}}</span>
                </div>
                <div @click="showAddress=true" v-else class="flex-fill text-center text--secondary">+添加服务地址</div>
            </div>
        </div>
        <div v-if="type" @click="toTimePage" class="d-flex align-center px-4 py-3 mb-2 white subtitle-2">
            <v-icon class="mdi-rotate-225" color="primary">mdi-clock-outline</v-icon>
            <div class="flex-fill ml-3 text--secondary text-right">{{dateStr||'请选择服务时间'}}</div>
            <v-icon  class="mr-4">mdi-chevron-right</v-icon>
        </div>
        <div v-if="discount" @click="showCouponPage=true" class="d-flex align-center px-4 py-3 mb-2 white">
            <v-icon class="mdi-rotate-225" color="primary">mdi-label</v-icon>
            <div class="flex-fill ml-3">{{discountStr}}</div>
            <v-icon  class="mr-4">mdi-chevron-right</v-icon>
        </div>
        <v-card tile flat>
            <div class="pa-4">备注信息</div>
            <v-textarea
            outlined
            auto-grow
            class="pa-0 ma-0 px-2 white"
            ></v-textarea>  
            <div class="caption px-4 pb-2 text--secondary">服务人员由系统自动分配</div>      
        </v-card>
        <v-footer fixed bottom class="pa-0 ma-0 d-flex flex-row-reverse">
            <v-btn @click="payIt" depressed tile large color="primary">立即支付</v-btn>
            <div class="d-flex flex-column justify-space-around subtitle-2 mr-2">
                <span>
                    待支付
                    <span class="ml-2 red--text">￥{{finalPrice}}</span>
                </span>
                <span class="caption text--secondary">已优惠：￥{{discount}}</span>
            </div>
        </v-footer>
        <couponsPage :price="price" @select="selectCoupon" @hide="showCouponPage=false" v-if="showCouponPage"/>
        <timePage @timeSelect="timeSelect" :id="finalCommunityId" @hide="showTimePage=false" v-if="showTimePage"/>
        <addressList @addressSelect="addressSelect"  @hide="showAddress=false" v-if="showAddress"/>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
import couponsPage from '../components/product/couponList'
import timePage from '../components/product/timePage'
import addressList from '../components/product/addressList'
export default {
    name: 'orderCertain',
    props: {
        item: {
            type: Object,
            required: true
        },
        type: {
            type: Number,
            required: true
        }
    },
    components: {
       iHeader,
       couponsPage,
       timePage,
       addressList
    },
    data: ()=>({
        selectedAddress: null,
        discount: 0,
        discountStr: '',
        dateStr: '',
        showCouponPage: false,
        showAddress: false,
        showTimePage: false
    }),
    created() {

    },
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
        availabelCoupons() {
           return this.couponList
           .filter(res=>{
                let state1 = res.state==1
                let state2 = res.pull<this.price
                let timeFit = Date.parse(new Date())>Date.parse(res.beginTime)&&Date.parse(new Date())<Date.parse(res.endTime)
                return state1&&state2&&timeFit
            })
            .sort((a,b)=>{
                return a.pull - b.pull
            })
            
        },
        finalConsignee() {
            if(this.selectedAddress){

                return this.selectedAddress.receiver
            }
            if(this.defaultAddress&&!this.selectedAddress){
                return this.defaultAddress.receiver
            }
        },
        finalTel() {
            if(this.selectedAddress){

                return this.selectedAddress.phone
            }
            if(this.defaultAddress&&!this.selectedAddress){
                return this.defaultAddress.phone
            }            
        },
        finalAddress() {
            if(this.selectedAddress){

                return this.selectedAddress.communityName + this.selectedAddress.address
            }
            if(this.defaultAddress&&!this.selectedAddress){
                console.log(this.defaultAddress)
                return this.defaultAddress.communityName + this.defaultAddress.address
            }            
        },
        finalCommunityId() {
            if(this.selectedAddress){

                return this.selectedAddress.communityId
            }
            if(this.defaultAddress&&!this.selectedAddress){
                console.log(this.defaultAddress)
                return this.defaultAddress.communityId 
            }            
        },
        finalPrice(){
            return this.item.price - this.discount
        }
    },
    mounted() {
        this.findCoupon()
        // this.getDefaultAddress()
    },
    methods: {
        getDefaultAddress() {
            this.$http.get('/user/findDefaultAddrByUserId',{params: {userId: this.userId}})
            .then(res=>{
                if(res.data.success){
                    this.$store.commit('SET_SINGLE_STATE', ['defaultAddress', res.data.obj])
                }
            })
        },
        findCoupon() {
            const params = {
                userId: this.userId,
                goodsId: this.item.detailId
            }
            this.$http.get('/user/findCoupon',{params})
            .then(res=>{
                if(res.data.success){
                    this.$store.commit('SET_SINGLE_STATE', ['couponList', res.data.obj])
                }
            })
        },
        selectCoupon(e) {
            console.log(e)
        },
        payIt(){
            if(!this.selectedAddress&&!this.defaultAddress){
                this.$toast('请选择服务地址！')
            }
        },
        toTimePage() {
            if(!this.selectedAddress&&!this.defaultAddress) {
                this.$toast('请先选择服务地址')
                return
            }
            this.showTimePage=true
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
