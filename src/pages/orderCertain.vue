<template>
    <div class="xxx-cpnt grey lighten-3">
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
            <div class="d-flex align-center py-4">
                <v-icon class="mr-4" color="primary">mdi-map-marker</v-icon>
                <div v-if="defaultAddress||selectedAddress" class="d-flex flex-column">
                    <span>
                        {{finalConsignee}}
                        <span class="ml-4">{{finalTel}}</span>
                    </span>
                    <span>{{finalAddress}}</span>
                </div>
                <div v-else class="flex-fill text-center text--secondary">+添加服务地址</div>
            </div>
        </div>
        <div v-if="type" class="d-flex align-center px-4 py-3 mb-2 white">
            <v-icon class="mdi-rotate-225" color="primary">mdi-clock-outline</v-icon>
            <div class="flex-fill ml-3">{{dateStr}}</div>
            <v-icon  class="mr-4">mdi-chevron-right</v-icon>
        </div>
        <div v-if="discount" class="d-flex align-center px-4 py-3 mb-2 white">
            <v-icon class="mdi-rotate-225" color="primary">mdi-label</v-icon>
            <div class="flex-fill ml-3">{{discountStr}}</div>
            <v-icon  class="mr-4">mdi-chevron-right</v-icon>
        </div>
        <v-card tile flat>
            
            <v-textarea
            filled
            auto-grow
            class="pa-0 ma-0 px-2 white"
            label="备注信息"
            rows="2"
            row-height="20"
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
    </div>
</template>

<script>
import iHeader from '../components/public/header'
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
       iHeader
    },
    data: ()=>({
        selectedAddress: null,
        discount: 0.01,
        discountStr: '',
        dateStr: '',
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
                return this.defaultAddress.communityName + this.selectedAddress.address
            }            
        },
        finalPrice(){
            return this.item.price - this.discount
        }
    },
    mounted() {
        this.findCoupon()
        this.getDefaultAddress()
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
        payIt(){
            if(!this.selectedAddress&&!this.defaultAddress){
                this.$toast('请选择服务地址！')
            }
        }
    }
};
</script>

<style scoped lang="scss">

   .xxx-cpnt{
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
