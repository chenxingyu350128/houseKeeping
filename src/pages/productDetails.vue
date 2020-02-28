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
                :src="item.attrPic"
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
        <div @click="showBS=true" class="px-4 py-2 d-flex align-center justify-space-between subtitle-2 white mb-2">
            <div class="d-flex align-center">
                选择:<span v-if="choice" class="ml-2 font-weight-bold">已选 {{choice}}</span>
            </div>
            <v-icon>mdi-chevron-right</v-icon>
        </div>
        <div @click="getAllEvals" class="px-4 py-2 d-flex align-center justify-space-between subtitle-2 white">
            <div>全部评价({{goodsSales}})</div>
            <v-icon>mdi-chevron-right</v-icon>
        </div>
        <div class="pa-4">
            <div class="px-12 d-flex align-center justify-center subtitle-1">
                <v-divider color="grey" width="35%"></v-divider>
                <span class="mx-4">商品详情</span>
                <v-divider color="grey" width="100"></v-divider>
            </div>
            <v-card v-for="(item,i) in images" :key="i" flat class="pa-2 subtitle-2">
                <v-img :src="item"></v-img>
            </v-card>
        </div>
        <v-bottom-sheet
         hide-overlay
         v-model="showBS">
            <div class="white pa-4">
                <div class="d-flex align-center">
                    <v-avatar
                        size="65"
                        tile
                    >
                        <img :src="sheetAvatar">
                    </v-avatar>
                    <div class="subtitle-2 ml-2 d-flex flex-column">
                        <span>{{itemName}}</span>
                        <span class="caption text--secondary">{{shortIntro}}</span>
                        <span>
                            <span class="red--text title mr-2">￥{{currentPrice}}</span>
                            <span class="text--secondary" style="text-decoration: line-through">￥{{originalPrice}}</span>
                        </span>
                    </div>
                </div>
                <v-divider></v-divider>
                <div class="py-2 subtitle-1">请选择类别</div>
                <v-row class="justify-space-between" no-gutters>
                    <v-col class="pa-2" cols="6">
                        <v-btn depressed block color="primary" dark>类型1</v-btn>
                    </v-col>
                    <v-col class="pa-2" cols="6">
                        <v-btn depressed block color="primary" dark>类型2</v-btn>
                    </v-col>
                    <v-col class="pa-2" cols="6">
                        <v-btn depressed block color="primary" dark>类型3</v-btn>
                    </v-col>
                </v-row>
                <div class="py-2 subtitle-1">请选择商品</div>
                <v-row class="justify-space-between" no-gutters>
                    <v-col 
                    v-for="(item,i) in details" 
                    @click="itemOrder(item,i)"
                    :key="i" 
                    class="pa-2" 
                    cols="6">
                        <v-btn v-text="item.type" depressed block color="primary" dark></v-btn>
                    </v-col>
                </v-row>                
            </div>
        </v-bottom-sheet>
        <v-footer fixed bottom class="white d-flex align-center justify-space-around">
            <div @click="toIndex" class="d-flex flex-column align-center caption mr-4">
                <v-icon dense color="primary">mdi-bank</v-icon>
                <span>首页</span>
            </div>
            <div @click="changeCollect" class="d-flex flex-column align-center caption mr-4">
                <v-icon dense color="primary">{{collect?'mdi-star':'mdi-star-outline'}}</v-icon>
                <span>收藏</span>
            </div>
            <v-btn @click="buyNow" depressed class="flex-fill" rounded dark color="primary">立即购买</v-btn>
        </v-footer>
        <orderCertain :type="goodsType" :item="editItem" @hide="showOrderCertain=false" v-if="showOrderCertain"/>
        <goodsEvals @hide="showEvals=false" v-if="showEvals" :id="id" />
    </div>
</template>

<script>
import iHeader from '../components/public/header'
import goodsEvals from '../components/product/goodsEvals'
import orderCertain from './orderCertain'
export default {
    name: 'goodsDetail',
    props: {
        id: {
            type: Number,
            required: true
        },
        // obj: {
        //     type: Object,
        //     required: true
        // }
    },
    components: {
       iHeader,
       orderCertain,
       goodsEvals
    },
    data: ()=>({
        details: [
            {type: '阿瑟东撒的'},
            {type: '撒旦发射点人'},
            {type: '回家击溃'},
        ],
        editItem: {},
        index: 0,
        currentPrice: 199,
        goodsSales: 13,
        goodsDetails: '',
        goodsState: true,
        goodsType: 0,
        indexType: '',
        intro: '简介',
        itemName: '商品名称',
        itemId: 0,
        originalPrice: 699,
        pic: '',
        process: '',
        scope: '',
        shortIntro: '商品简介shortIntro',
        type: '',
        choice: '',
        showBS: false,
        showEvals: false,
        selectedAddress: '',
        collect: false,
        showOrderCertain: false


    }),
    created() {

    },
    computed: {
        images() {
            return this.pic.split(',')

        },
        userId() {
            return this.$store.state.app.userId
        },
        sheetAvatar() {
            return this.images[this.index]
        }
    },
    watch: {
        obj: {
            handler(val){
                for(let x in val){
                    this[x] = val[x]
                }
            },
            immediate: true
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            const params = {
                userId: this.userId,
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
                    this.ifCollected()
                    // this.images = this.pic.split(',')
                }
            })
        },
        ifCollected() {
            const params = {
                userId: this.userId,
                goodsId: this.itemId
            }
            this.$http.get('/service/isCollect',{params})
            .then(res=>{
                if(res.data.success){
                    this.collect = res.data.obj
                }
            })
        },
        changeCollect() {
            let url = this.collect?'/service/delServiceCollect':'/service/addServiceCollect'
            const data = {
                userId: this.userId,
                goodsId: this.itemId
            }
            this.$http.post(url,data)
            .then(res=>{
                if(res.data.success){
                    this.collect = !this.collect
                }
            })
        },
        toIndex() {
            this.$emit('hide')
            console.log(this.$route)
            if(this.$route.path!='/index'){
                this.$router.push('/index')
            }
        },
        itemOrder(item,i) {
            this.index = i
            this.choice = item.type
            this.editItem = item
            this.showBS = false
        },
        buyNow() {
            if(!this.choice){
                this.showBS = true
                return
            }
            // let serviceAddress = this.selectedAddress||this.defaultAddress
            // if(!serviceAddress){
            //     this.$toast.info('请选择服务地址')
            //     return
            // }
            // if(!this.defaultOrder){
            //     this.$toast.info('请选择服务地址')
            //     return
            // }
            this.showOrderCertain = true
        },
        getAllEvals() {
            if(!this.goodsSales){
                this.$toast('暂无评价！')
                return
            }
            this.showEvals = true
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
       padding-bottom: 50px;
       overflow-y: auto;
       z-index: 99; 
   } 
</style>
