<template>
    <div class="goodsDetail grey lighten-3">
        <iHeader @doSomething="$emit('hide')" text="商品详情">
            <template v-slot:right>
                <v-icon>mdi-share</v-icon>
            </template>
        </iHeader>
        <v-carousel 
        class="green lighten-3"
        hide-delimiters
        hide-delimiter-background
        height="200">
            
            <v-carousel-item
                v-for="(item,i) in details"
                :key="i"
                :src="item"
            ></v-carousel-item>
        </v-carousel>
        <div class="pa-4 mb-2 white">
            <div class="red--text caption pb-4">
                ￥
                <span class="headline">{{currentPrice}}</span>
                <span style="text-decoration: line-through" class="text--secondary ml-6">{{originalPrice}}</span>
            </div>
            <div class="title font-weight-bold pb-2">{{itemName}}</div>
            <div class="caption text--secondary">{{intro}}</div>
        </div>
        <div class="px-4 py-2 d-flex align-center justify-space-between subtitle-2 white mb-2">
            <div class="d-flex align-center">
                选择<span v-if="choice" class="ml-2 font-weight-bold">已选{{choice}}</span>
            </div>
            <v-icon>mdi-chevron-right</v-icon>
        </div>
        <div class="px-4 py-2 d-flex align-center justify-space-between subtitle-2 white">
            <div>全部评价({{goodsSales}})</div>
            <v-icon>mdi-chevron-right</v-icon>
        </div>
        <div class="pa-4">
            <div class="px-12 d-flex align-center justify-center subtitle-1">
                <v-divider color="grey" width="35%"></v-divider>
                <span class="mx-4">商品详情</span>
                <v-divider color="grey" width="100"></v-divider>
            </div>
            <v-card flat class="pa-2 subtitle-2">
                <div class="my-2">
                    <span class="font-weight-bold mr-4">服务项目:</span>
                    <span>{{intro}}</span>
                </div>
                <div class="my-2">
                    <span class="font-weight-bold mr-4">服务项目:</span>
                    <span>{{intro}}</span>
                </div>
                <div class="my-2">
                    <span class="font-weight-bold mr-4">服务项目:</span>
                    <span>{{intro}}</span>
                </div>
                <div class="my-2">
                    <span class="font-weight-bold mr-4">服务项目:</span>
                    <span>{{intro}}</span>
                </div>
                <div class="my-2">
                    <span class="font-weight-bold mr-4">服务项目:</span>
                    <span>{{intro}}</span>
                </div>
                <div class="my-2">
                    <span class="font-weight-bold mr-4">服务项目:</span>
                    <span>{{intro}}</span>
                </div>
                <div class="my-2">
                    <span class="font-weight-bold mr-4">服务项目:</span>
                    <span>{{intro}}</span>
                </div>
            </v-card>
        </div>
    </div>
</template>

<script>
import iHeader from '../components/public/header'

export default {
    name: 'goodsDetail',
    props: {
        id: {
            type: Number,
            required: true
        }
    },
    components: {
       iHeader
    },
    data: ()=>({
        details: [],
        currentPrice: 199,
        goodsSales: 13,
        goodsType: '',
        indexType: '',
        intro: '简介',
        itemName: '商品名称',
        originalPrice: 699,
        pic: '',
        process: '',
        scope: '',
        shortIntro: '',
        type: '',
        choice: ''


    }),
    created() {

    },
    computed: {

    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const params = {
                itemId: this.id
            }
            this.$http.get('/service/findDetailByItemId',{params})
            .then(res=>{
                if(res.data.success){
                    console.log(res.data.obj)
                    let obj = res.data.obj
                    for(let x in obj){
                        this[x] = obj[x]
                    }
                    this.details = this.pic.split(',')
                }
            })
        }
    }
};
</script>

<style scoped lang="scss">

   .goodsDetail{
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
