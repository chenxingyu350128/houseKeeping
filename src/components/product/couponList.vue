<template>
    <div class="couponsPage grey lighten-3">
        <iHeader @doSomething="$emit('hide')" text="选择优惠方式"></iHeader>
        <div class="mx-2">
            <div class="py-2 d-flex justify-space-between align-center subtitle-1">
                <span>可使用优惠劵 ({{active.length}}张)</span>
                <div class="d-flex align-center">
                    <v-icon>mdi-help-circle</v-icon>
                    <span>使用规则</span>
                </div>
            </div>

            <div class="py-2 d-flex justify-space-between align-center subtitle-1">
                <span>不可使用优惠劵 ({{inactive.length}}张)</span>
            </div>
        </div>
    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'couponPage',
    props: {
        price: {
            type: Number,
            required: true
        }
    },
    components: {
       iHeader
    },
    data: ()=>({

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
