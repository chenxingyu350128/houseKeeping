<template>
  <div class="indexPage white">
    <iHeader @doSomething="backToApp">
      <template v-slot:center>
        <div @click="showAreaPicker=true">
          {{ positionCity||'地址位置获取失败' }}
          <v-icon>mdi-chevron-down</v-icon>
        </div>
      </template>
      <template v-slot:right>
        <div>
          <v-badge 
            v-if="notRead"
            :content="notRead" 
            class="caption"
            overlap
            offset-x="15"
            offset-y="10"
            color="pink accent-3" 
            @click.native="toMsgPage"
          >
            <v-icon class="pa-0">
              mdi-bell-outline
            </v-icon>
          </v-badge>
          <v-icon
            v-else
            @click="showMsg=true"
          >
            mdi-bell-outline
          </v-icon>
        </div>
      </template>
    </iHeader>
    <v-carousel 
      class="grey lighten-4"
      hide-delimiter-background
      hide-delimiter
      height="134" 
    >
      <v-carousel-item
        v-for="(banner,i) in banners"
        :key="i"
        contain
        aspect-ratio="2" 
        :src="banner.pic"
      />
    </v-carousel>
    <div class="my-2 d-flex flex-wrap align-center">
      <div 
        v-for="(item,i) in icons"
        :key="i" 
        style="width: 20%"
        class="d-flex flex-column align-center my-2" 
        @click="iconsClick(i)"
      >
        <!-- @click="$router.push({path:'/category',query: {type: i}})" -->
        <v-avatar
          size="42.5"
        >
          <img :src="item.img">
        </v-avatar>
        <span class="mt-2 caption text--primary">{{ item.text }}</span>
      </div>
    </div>
    <!-- 热销 -->
    <div class="title text-center py-2 font-weight-bold">
      热销产品
    </div>
    <div
      v-if="hotProducts.length"
      class="d-flex flex-wrap justify-space-between mx-4"
    >
      <div 
        v-for="(item,i) in hotProducts" 
        :key="i" 
        class="d-flex flex-column pa-2" 
        style="width: 100%"
        @click="toDetail(item.itemId)"
      >
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
          <v-col 
            v-if="item.pics.length==1" 
            class="pa-0 ma-0" 
            cols="12"
          >
            <v-img 
              height="110" 
              width="100%" 
              aspect-ratio="2" 
              class="flex-fill mr-2" 
              :src="item.pics[0]"
            />
          </v-col>
          <v-col 
            v-if="item.pics.length>1" 
            class="pa-0 ma-0 pr-2" 
            cols="8"
          >
            <v-img 
              width="100%" 
              aspect-ratio="2" 
              class="flex-fill mr-2 fill-height" 
              :src="item.pics[0]"
            />
          </v-col>
          <v-col
            v-if="item.pics.length>1"
            class="pa-0 ma-0"
            cols="4"
          >
            <v-img 
              style="margin-bottom: 5%" 
              aspect-ratio="2" 
              class="flex-fill" 
              :src="item.pics[1]"
            />
            <v-img 
              v-if="item.pics.length>2" 
              width="100%" 
              aspect-ratio="2" 
              class="flex-fill" 
              :src="item.pics[2]"
            />
          </v-col>
        </v-row>
        <div class="d-flex justify-space-between">
          <div class="d-flex flex-column">
            <span class="mt-1 px-1 subtitle-1 text--primary">{{ item.itemName }}</span>
            <span class="px-1 caption text--secondary">{{ item.shortIntro }}</span>
          </div>
          <span class="py-2 subtitle-2 orange--text no-wrap font-weight-bold">{{ item.currentPrice }}元</span>
        </div>
        <v-divider class="mt-2" />
        <!-- <v-img cover max-height="100" :src="item.pic"></v-img> -->
      </div> 
    </div>
    <!-- 畅销 -->
    <div class="title text-center py-2 font-weight-bold">
      畅销单品
    </div>
    <div
      v-if="bestSellings.length"
      class="d-flex flex-wrap justify-space-between pb50 mx-4"
    >
      <div 
        v-for="(item,i) in bestSellings" 
        :key="i" 
        class="d-flex flex-column pa-2"
        style="width: 45%" 
        @click="toDetail(item.itemId)"
      >
        <div class="d-flex justify-center">
          <v-avatar
            size="100"
            tile
          >
            <img :src="item.pic">
          </v-avatar>
        </div>
        <!-- <v-img :src="item.pic"></v-img> -->
        <span class="mt-1 px-1 subtitle-1 text--primary">{{ item.itemName }}</span>
        <span class="px-1 caption text--secondary">{{ item.intro }}</span>
        <span class="px-1 subtitle-2 orange--text">{{ item.currentPrice }}元</span>
      </div> 
    </div>
    <!-- <el-amap-search-box :events="searchEvents" ref="searchBox" style="max-width: 100%" class="search-box mt-2 caption" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
    <el-amap 
      v-show="notShow" 
      ref="mapIndex" 
      class="indexMap"
      :amap-manager="amapManager" 
      :events="events"
    >
      <!-- events事件中new AMap可用 -->
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
          <v-btn
            class="flex-fill"
            dark
            color="primary"
            outlined
            @click="showPositionDia=false"
          >
            取消
          </v-btn>
          <v-btn
            class="flex-fill"
            dark
            color="primary"
            @click="showAreaPicker=true"
          >
            确认
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>    
    <msg
      v-if="showMsg"
      @hide="showMsg=false"
    />
    <nurseList
      v-if="showNurse"
      :type="nannyType"
      @hide="showNurse=false"
    />
    <!-- <goodsDetails :id="editId" @hide="showDetails=false" v-if="showDetails"/> -->
    <position
      v-if="showAreaPicker"
      @adcodeGet="postAdcode"
      @hide="showAreaPicker=false"
    />
  </div>
</template>

<script>
import iHeader from '../components/public/header'
import position from '../components/index/selectPosition'
// import goodsDetails from './productDetails'
import nurseList from './nurseList'
import msg from '../components/index/msgCenter'
import VueAMap from 'vue-amap'

// import AMap from "amap-js";
VueAMap.initAMapApiLoader({
  key: "71a4fe9e16a9e93d6653175b5f6693c8",
  plugin: [
    "AMap.Geolocation",
    "AMap.Autocomplete",
    "AMap.DistrictSearch",
    "AMap.PlaceSearch",
    "AMap.Scale",
    "AMap.OverView",
    "AMap.ToolBar",
    "AMap.MapType",
    "AMap.PolyEditor",
    "AMap.CircleEditor",
    "AMap.Geocoder"
    
  ],
  v: "1.4.4"
});
const amapManager = new VueAMap.AMapManager()
export default {
    name: 'Index',
    components: {
        iHeader,
        position,
        msg,
        // goodsDetails,
        nurseList
    },
    data() {
        const view = this
        return {
            amapManager,
            notShow: false,
            showPositionDia: false,
            showNurse: false,
            showAreaPicker: false,
            showDetails: false,
            showMsg: false,
            editId: 0,
            // areasId: 0,
            notRead: 0,
            nannyType: '',
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
                }
            ],
            events: {
                init: (map) => {
                    // console.log(view.zoom)
                    console.log('event ')
                    view.getLocation()
                }
            }
        }
    },
    computed: {
        positionCity() {
            return this.$store.state.app.positionCity
        },
        userId() {
            return this.$store.state.app.userId
        },
        areasId() {
            return this.$store.state.app.areasId
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
        }
        // defaultAddress() {
        //     return this.$store.state.app.defaultAddress
        // },
    },
    created() {

    },
    mounted() {
        // this.getLocation()
        this.init()
    },
    activated() {
        console.log('actived')
        if (this.userId) {
            this.findNotRead()
        }
        if (this.areasId) {
            this.hotProduct()
            this.bestSelling()
        }
    },
    methods: {
        backToApp() {
            localStorage.clear()
          const message = { backToApp: true }
          window.webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(message));
        },
        getLocation() {
            // eslint-disable-next-line no-undef
            console.log(AMap)
            const that = this
            // eslint-disable-next-line no-undef
            const o = new AMap.Geolocation({
                enableHighAccuracy: true, // 是否使用高精度定位，默认:true
                timeout: 10000, // 超过10秒后停止定位，默认：无穷大
                maximumAge: 0, // 定位结果缓存0毫秒，默认：0
                convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true, // 显示定位按钮，默认：true
                buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
                // eslint-disable-next-line no-undef
                buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            }); 
            o.getCityInfo((status, res) => {
                console.log(status, res)
                if (res.type === 'complete') {
                    that.$store.commit('SET_SINGLE_STATE', ['positionCity', res.city])
                    that.postAdcode(res.adcode)
                } else {
                    that.showPositionDia = true 
                }
            }) 
        },
        toMsgPage() {
            this.setReaded()
            this.showMsg = true
        },
        async setReaded() {
            const data = {
                userId: this.userId
            }
            const res = await this.$http.post('/user/markRead', data)
            if (res.data.success) {
                this.findNotRead()
            }
        },       
        init() {
            console.log('init')
            this.appLogin()
            // this.findIndexCates()
            this.findBanners()
            this.findCommunitys()
            // this.getDefaultAddress()
        },
        postAdcode(adcode) {
            this.showAreaPicker = false
            this.$store.commit('SET_SINGLE_STATE', ['areasId', adcode])
            // this.areasId = adcode
            // this.findCates()
            this.hotProduct()
            this.bestSelling()
            console.log('地区编码：', adcode)
        },
        appLogin() {
            // 测试用
            // this.$store.commit('SET_SINGLE_STATE', ['userId', 1])
            // this.$store.commit('SET_SINGLE_STATE', ['userName', 'cxx'])
            if (this.userId) {
                return
            }
            const sessionId = window.location.hash.split('sessionId=')[1]
            // const sessionId = '4F020823F072702A'
            const params = {
                sessionId
            }
            this.$http.get('/user/applogin', { params })
            .then(res => {
                if (res.data.success && res.data.obj) {
                    const obj = res.data.obj
                    this.$store.commit('SET_SINGLE_STATE', ['sex', obj.sex])
                    this.$store.commit('SET_SINGLE_STATE', ['userId', obj.userId])
                    this.$store.commit('SET_SINGLE_STATE', ['userName', obj.userName])
                    this.$store.commit('SET_SINGLE_STATE', ['realName', obj.realName])
                    this.findNotRead()
                }
            })
        },
        async findNotRead() {
            const params = {
                userId: this.userId
            }
            const res = await this.$http.get('/user/findNotReaderNumByUserId', { params })
            this.notRead = res.data.obj
        },
        iconsClick(e) {
            this.nannyType = e
            this.showNurse = true
        },
        async findCommunitys() {
            // if(!this.communityList){
            //     return
            // }
            const res = await this.$http.get('/user/findCommunitys')
            if (res.data) {
                this.$store.commit('SET_SINGLE_STATE', ['communityList', res.data.obj])
            }
            console.log(res, 'rrr')
        },
        async findBanners() {
            // if(!this.banners){
            //     return
            // }
            const res = await this.$http.get('/service/findBanners')
            if (res.data) {
                this.$store.commit('SET_SINGLE_STATE', ['indexBanners', res.data.obj])
            }
            console.log(res, 'rrr')
        },
        // async findCates() {
        //     // if(!this.cateList){
        //     //     return
        //     // }
        //     let res = await this.$http.get('/service/findCates',{params: {areasId: this.areasId}})
        //     if(res.data){
        //         let obj = res.data.obj
        //         obj.forEach(res=>{
        //             let items = res.items
        //             items.forEach(re=>{

        //                 if(re.pic){
        //                     let pic = re.pic.split(',')[0]
        //                     re.pic = pic
        //                 }
        //             })
 
        //         })
        //         this.$store.commit('SET_SINGLE_STATE', ['cateList', obj])
        //     }
        //     console.log(res,'rrr')
        // },
        async bestSelling() {
            // if(!this.indexCates){
            //     return
            // }
            const res = await this.$http.get('/service/findCxiao', { params: { areasId: this.areasId } })
            if (res.data) {
                const obj = res.data.obj
                obj.forEach(re => {
                   this.$set(re, 'pic', re.pic.split(',')[0])
                })
                this.$store.commit('SET_SINGLE_STATE', ['bestSelling', obj])
            }
            console.log(res, 'rrr')
        },
        async hotProduct() {
            // if(!this.indexCates){
            //     return
            // }
            const res = await this.$http.get('/service/findHot', { params: { areasId: this.areasId } })
            if (res.data) {
                const obj = res.data.obj
                obj.forEach(re => {
                   this.$set(re, 'pics', re.pic.split(','))
                })
                console.log(obj)
                this.$store.commit('SET_SINGLE_STATE', ['hotProduct', obj])
            }
            console.log(res, 'rrr')
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
        toDetail(id) {
            // this.editId = id
            // this.showDetails = true
            this.$router.push({
                path: '/productDetails',
                query: {
                    id
                }
            })
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
