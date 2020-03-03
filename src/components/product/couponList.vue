<template>
    <div class="couponsPage white pb-12">
        <iHeader @doSomething="$emit('hide')" text="选择优惠方式"></iHeader>
        <div class="mx-2">
            <div class="py-2 d-flex justify-space-between align-center subtitle-1">
                <span>可使用优惠劵 ({{active.length}}张)</span>
                <div class="d-flex align-center caption">
                    <v-icon dense>mdi-help-circle</v-icon>
                    <span>使用规则</span>
                </div>
            </div>
            <coupon 
                :scope="cp.couponName" 
                :state="cp.state"
                :endTime="cp.endTime"
                :money="cp.money"
                :pull="cp.pull"
                :checked="cp.couponId==selectedId"
                class="my-1" 
                @click.native="activedClick(i)"
                v-for="(cp,i) in model1" 
                :key="i"/>
            <div class="py-2 d-flex justify-space-between align-center subtitle-1">
                <span>不可使用优惠劵 ({{inactive.length}}张)</span>
            </div>
            <coupon 
                :scope="cp.couponName" 
                :state="cp.state"
                :endTime="cp.endTime"
                :money="cp.money"
                :pull="cp.pull"
                class="my-1" 
                v-for="(cp,j) in model2" 
                :key="'yo'+j"/>
        </div>
        <v-footer bottom fixed class="white justify-center">
            <v-btn @click="$emit('unset')" large dark depressed color="primary">不使用优惠券</v-btn>
        </v-footer>
    </div>
</template>

<script>
import iHeader from '../public/header'
import coupon from './coupon'
export default {
    name: 'couponPage',
    props: {
        price: {
            type: Number,
            required: true
        },
        selectedId: {
            type: Number,
            default: 0
        },
    },
    components: {
       iHeader,
       coupon
    },
    data: ()=>({
        checked: '',
        model1: [
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 23, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-06-01 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 15, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 1, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 14, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-05-12 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 30, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 1, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 15, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-05-12 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 30, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 1, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 13, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-05-12 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 30, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 1, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 13, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-05-12 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 30, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 1, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 13, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-05-12 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 30, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 1, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
        ],
        model2: [
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 13, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-05-12 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 30, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 0, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
            {
                "beginTime": "2020-01-12 08:20:00", //有效期开始时间
                "couponId": 13, 
                "couponName": "通用券", //名称
                "createTime": "2020-01-12 08:20:00", //创建时间
                "endTime": "2020-05-12 08:20:00", //有效期结束时间
                "goodsId": 0, //商品ID
                "money": 30, //优惠券金额
                "pull": 50, //优惠券满减条件(满50-30)
                "state": 0, //状态 0无效 1有效 2已使用
                "userId": 1 //用户ID
            },
        ],
    }),
    created() {

    },
    computed: {
        couponList() {
            return this.$store.state.app.couponList
        },     
        active() {
           return this.couponList
           .filter(res=>{
                let state1 = res.state==1
                let state2 = res.pull<this.price
                let timeFit = Date.parse(new Date())>Date.parse(res.beginTime)&&Date.parse(new Date())<Date.parse(res.endTime)
                return state1&&state2&&timeFit
            })
        },        
        inactive() {
           return this.couponList
           .filter(res=>{
                let state1 = res.state!=1
                let state2 = res.pull>this.price
                let timeFit = Date.parse(new Date())<Date.parse(res.beginTime)
                return state1||state2||timeFit
            })
        },        
    },
    mounted() {

    },
    methods: {
        activedClick(i) {
            this.$emit('couponGet',this.model1[i])
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
