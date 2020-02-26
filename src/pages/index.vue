<template>
    <div class="indexPage white">
        <iHeader @doSomething="$emit('hide')">
            <template  v-slot:center>
                <div @click="showAreaPicker=true">
                    {{positionCity||'地址位置获取失败'}}
                    <v-icon>mdi-chevron-down</v-icon>
                </div>
            </template>
            <template  v-slot:right>
                <v-icon @click="showMsg=true">mdi-bell-outline</v-icon>
            </template>
        </iHeader>
        <v-carousel 
        class="pink"
        hide-delimiter-background
        hide-delimiter
        height="183" 
        >
            <v-carousel-item
                v-for="(banner,i) in banners"
                :key="i"
                :src="banner.pic"
            ></v-carousel-item>
        </v-carousel>
        <div class="my-2 d-flex flex-wrap align-center">
            <div 
            style="width: 20%"
            class="d-flex flex-column align-center my-2" 
            @click="iconsClick(i)"
            v-for="(item,i) in icons" 
            :key="i">
            <!-- @click="$router.push({path:'/category',query: {type: i}})" -->
                <v-avatar
                    size="42.5"
                >
                    <img :src="item.img">
                </v-avatar>
                <span class="mt-2 caption text--primary">{{item.text}}</span>
            </div>
        </div>
        <!-- 热销 -->
        <div class="title text-center py-2">
            热销产品
        </div>
        <div class="d-flex flex-wrap justify-space-between mx-4">

            <div 
            class="d-flex flex-column pa-2" 
            style="width: 100%" 
            v-for="(item,i) in hotProducts" 
            @click="toDetail(item)"
            :key="i">
                <!-- <v-avatar
                    size="100"
                    tile
                >
                    <img :src="item.pic">
                </v-avatar> -->
                <!-- <div class="d-flex align-center">
                    <v-img height="110" aspect-ratio="2" class="flex-fill mr-2" :src="item.details[0].attrPic"></v-img>
                    <div class="d-flex flex-column">
                        <v-img height="55" aspect-ratio="2" class="flex-fill mr-2" :src="item.details[0].attrPic"></v-img>
                        <v-img height="55" aspect-ratio="2" class="flex-fill mr-2" :src="item.details[0].attrPic"></v-img>
                    </div>
                </div> -->
                <v-row no-gutters>
                    <v-col v-if="item.details.length==1" class="pa-0 ma-0" cols="12">
                        <v-img 
                        height="110" 
                        width="100%" 
                        aspect-ratio="2" 
                        class="flex-fill mr-2" 
                        :src="item.details[0].attrPic">
                        </v-img>
                    </v-col>
                    <v-col v-if="item.details.length>1" class="pa-0 ma-0 pr-2" cols="8">
                        <v-img 
                        width="100%" 
                        aspect-ratio="2" 
                        class="flex-fill mr-2 fill-height" 
                        :src="item.details[0].attrPic">
                        </v-img>
                    </v-col>
                    <v-col v-if="item.details.length>1" class="pa-0 ma-0" cols="4">
                        <v-img 
                        style="margin-bottom: 5%" 
                        width="100%" height="47.5%" 
                        aspect-ratio="2" 
                        class="flex-fill mr-2" 
                        :src="item.details[1].attrPic">
                        </v-img>
                        <v-img 
                        v-if="item.details.length>2" 
                        width="100%" height="47.5%" 
                        aspect-ratio="2" 
                        class="flex-fill mr-2" 
                        :src="item.details[2].attrPic">
                        </v-img>
                    </v-col>
                </v-row>
                <div class="d-flex align-center justify-space-between">
                    <div class="d-flex flex-column">

                        <span class="mt-1 px-1 subtitle-1 text--primary">{{item.itemName}}</span>
                        <span class="px-1 caption text--secondary">{{item.intro}}</span>
                    </div>
                    <span class="px-1 subtitle-2 orange--text">{{item.currentPrice}}元</span>
                </div>
                <v-divider class="mt-2"></v-divider>
                <!-- <v-img cover max-height="100" :src="item.pic"></v-img> -->

            </div> 
        </div>
        <!-- 畅销 -->
        <div class="title text-center py-2">
            畅销单品
        </div>
        <div class="d-flex flex-wrap justify-space-between pb50 mx-4">

            <div 
            class="d-flex flex-column pa-2" 
            style="width: 45%" 
            @click="toDetail(item)"
            v-for="(item,i) in bestSellings" 
            :key="i">
                <div class="d-flex justify-center">

                    <v-avatar
                        size="100"
                        tile
                    >
                        <img :src="item.pic">
                    </v-avatar>
                </div>
                <!-- <v-img :src="item.pic"></v-img> -->
                <span class="mt-1 px-1 subtitle-1 text--primary">{{item.itemName}}</span>
                <span class="px-1 caption text--secondary">{{item.intro}}</span>
                <span class="px-1 subtitle-2 orange--text">{{item.currentPrice}}元</span>

            </div> 
        </div>
        <!-- <el-amap-search-box :events="searchEvents" ref="searchBox" style="max-width: 100%" class="search-box mt-2 caption" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
        <el-amap 
        v-show="notShow" 
        class="indexMap" 
        ref="mapIndex"
        :amap-manager="amapManager" 
        :events="events"
        >
        </el-amap>   
        <v-dialog
            v-model="showPositionDia"
            persistent 
            max-width="500px"
            transition="dialog-transition"
        >
            <v-card class="white">
                
                <v-card-title class="subtitle-2 justify-center">
                    定位失败，手动获取定位？
                </v-card-title>
                <v-card-actions>
                    <v-btn @click="showPositionDia=false" class="flex-fill" dark color="primary" outlined>取消</v-btn>
                    <v-btn @click="showAreaPicker=true" class="flex-fill" dark color="primary">确认</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>    
        <msg @hide="showMsg=false" v-if="showMsg"/>
        <nurseList @hide="showNurse=false" v-if="showNurse"/>
        <goodsDetails :obj="editItem" @hide="showDetails=false" v-if="showDetails"/>
        <position @hide="showAreaPicker=false" v-if="showAreaPicker"/>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
import position from '../components/index/selectPosition'
import goodsDetails from './productDetails'
import nurseList from './nurseList'
import msg from '../components/index/msgCenter'
import VueAMap from 'vue-amap'
import { AMapManager } from 'vue-amap'
// import AMap from "amap-js";

const amapManager = new VueAMap.AMapManager()
export default {
    name: 'index',
    components: {
        iHeader,
        position,
        msg,
        goodsDetails,
        nurseList
    },
    data() {
        let view = this
        return {

            amapManager,
            notShow: false,
            showPositionDia: false,
            showNurse: false,
            showAreaPicker: false,
            showDetails: false,
            showMsg: false,
            editItem: {},
            searchOption: {
                city: '福州',
                citylimit: true
            },            
            icons: [
                {
                    img: require('../assets/img/icon01.png'),
                    text: '住家保姆'
                },
                {
                    img: require('../assets/img/icon02.png'),
                    text: '非住家保姆'
                },
                {
                    img: require('../assets/img/icon03.png'),
                    text: '月嫂'
                },
                {
                    img: require('../assets/img/icon04.png'),
                    text: '护工'
                },
                {
                    img: require('../assets/img/icon05.png'),
                    text: '育儿嫂'
                },
            ],
            events: {
                init: (map) => {
                    // console.log(view.zoom)
                    map.getCity(result => {
                        console.log(result)
                        const cityName = result.city + result.district
                        // view.showPositionDia = true
                        view.$store.commit('SET_SINGLE_STATE', ['positionCity', cityName])
                    })
                },
            }
        }
    },
    created() {

    },
    computed: {
        positionCity() {
            return this.$store.state.app.positionCity
        },
        userId() {
            return this.$store.state.app.userId
        },
        sessionId() {
            return 1
        },
        communityList() {
            return this.$store.state.app.communityList
        },
        banners() {
            return this.$store.state.app.indexBanners
        },
        cateList() {
            return this.$store.state.app.cateList
        },
        indexCates() {
            return this.$store.state.app.indexCates
        },
        bestSellings() {
            return this.$store.state.app.bestSelling
        },
        hotProducts() {
            return this.$store.state.app.hotProduct
        },
        // defaultAddress() {
        //     return this.$store.state.app.defaultAddress
        // },
    },
    mounted() {
        if(!this.positionCity){
            this.showPositionDia = true
        }
        // console.log(JSON.parse(this.defaultAddress))
        this.init()
    },
    methods: {
        init() {
            this.appLogin()
            // this.findIndexCates()
            this.findCates()
            this.findBanners()
            this.findCommunitys()
            this.hotProduct()
            this.bestSelling()
            // this.getDefaultAddress()
        },
        appLogin() {
            if(this.userId){
                return
            }
            const params = {
                sessionId: this.sessionId
            }
            this.$http.get('/user/applogin',{params})
            .then(res=>{
                if (res.data.success&&res.data.obj) {
                    let obj = res.data.obj
                    this.$store.commit('SET_SINGLE_STATE', ['sex', obj.sex])
                    this.$store.commit('SET_SINGLE_STATE', ['userId', obj.userId])
                    this.$store.commit('SET_SINGLE_STATE', ['userName', obj.userName])
                    this.$store.commit('SET_SINGLE_STATE', ['realName', obj.realName])
                }
            })
        },
        iconsClick(e) {
            if(!e){
                this.showNurse = true
            }
        },
        async findCommunitys() {
            // if(!this.communityList){
            //     return
            // }
            let res = await this.$http.get('/user/findCommunitys')
            if(res.data){

                this.$store.commit('SET_SINGLE_STATE', ['communityList', res.data.obj])
            }
            console.log(res,'rrr')
        },
        async findBanners() {
            // if(!this.banners){
            //     return
            // }
            let res = await this.$http.get('/service/findBanners')
            if(res.data){

                this.$store.commit('SET_SINGLE_STATE', ['indexBanners', res.data.obj])
            }
            console.log(res,'rrr')
        },
        async findCates() {
            // if(!this.cateList){
            //     return
            // }
            let res = await this.$http.get('/service/findCates')
            if(res.data){

                this.$store.commit('SET_SINGLE_STATE', ['cateList', res.data.obj])
            }
            console.log(res,'rrr')
        },
        async bestSelling() {
            // if(!this.indexCates){
            //     return
            // }
            let res = await this.$http.get('/service/findCxiao')
            if(res.data){

                this.$store.commit('SET_SINGLE_STATE', ['bestSelling', res.data.obj])
            }
            console.log(res,'rrr')
        },
        async hotProduct() {
            // if(!this.indexCates){
            //     return
            // }
            let res = await this.$http.get('/service/findHot')
            if(res.data){

                this.$store.commit('SET_SINGLE_STATE', ['hotProduct', res.data.obj])
            }
            console.log(res,'rrr')
        },
        // async getDefaultAddress() {
        //     // if(!this.defaultAddress){
        //     //     return
        //     // }
        //     let res = await this.$http.get('/user/findDefaultAddrByUserId',{params: {userId: this.userId}})
        //     if(res.data){

        //         this.$store.commit('SET_SINGLE_STATE', ['defaultAddress', res.data.obj])
        //     }
        //     console.log(res,'rrr')
        // },
        toDetail(item) {
            this.editItem = item
            this.showDetails = true
        }
    }
};
</script>

<style scoped lang="scss">

   .indexPage{
       overflow-y: auto;
       min-height: 100vh;
       padding-top: 45px;

   } 
</style>
