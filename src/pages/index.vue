<template>
    <div class="xxx-cpnt grey lighten-2 px-2">
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
        <div id="container"></div>
        <!-- <el-amap-search-box :events="searchEvents" ref="searchBox" style="max-width: 100%" class="search-box mt-2 caption" :search-option="searchOption" :on-search-result="onSearchResult"></el-amap-search-box> -->
        <el-amap class="indexMap" 
            ref="mapIndex"
            :amap-manager="amapManager" 
            :events="events"
        >
        </el-amap>   
        <!-- <v-dialog
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
        </v-dialog>     -->
        <msg @hide="showMsg=false" v-if="showMsg"/>
        <position @hide="showAreaPicker=false" v-if="showAreaPicker"/>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
import position from '../components/index/selectPosition'
import msg from '../components/index/msgCenter'
import VueAMap from 'vue-amap'
import { AMapManager } from 'vue-amap'
// import AMap from "amap-js";

const amapManager = new VueAMap.AMapManager()
export default {
    components: {
        iHeader,
        position,
        msg
    },
    data() {
        let view = this
        return {

            amapManager,
            notShow: false,
            showPositionDia: false,
            showAreaPicker: false,
            showMsg: false,
            searchOption: {
                city: '福州',
                citylimit: true
            },            
            // searchEvents: {
            //     init: (auto, place) => {
            //         // console.log(view.zoom)
            //         console.log('sss')
            //         console.log(auto)
            //         console.log(place)
            //     },
            // },  
            events: {
                init: (map) => {
                    // console.log(view.zoom)
                    map.getCity(result => {
                        console.log(result)
                        const cityName = result.city + result.district
                        view.showPositionDia = true
                        view.$store.commit('SET_SINGLE_STATE', ['positionCity', cityName])
                    })
                },
            }
        }
    },
    created() {

    },
    computed: {
        positionCity(){
            return this.$store.state.app.positionCity
        },
        sessionId(){
            return 1
        },
    },
    mounted() {
        this.getPosition()
        this.appLogin()
    },
    methods: {
        getPosition() {
            // let o = new AMap.Geolocation({
            //     enableHighAccuracy: true,//是否使用高精度定位，默认:true
            //     timeout: 10000,          //超过10秒后停止定位，默认：无穷大
            //     maximumAge: 0,           //定位结果缓存0毫秒，默认：0
            //     convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
            //     showButton: true,        //显示定位按钮，默认：true
            //     buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
            //     buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
            //     showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
            //     showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
            //     panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
            //     zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            // });
            // o.getCurrentPosition((status, result) => {
            //     console.log('v-amap定位插件,定位中。。。');
            //     console.log(status,result);
            //     if (result && result.position) {
            //     this.center = [result.position.O, result.position.P];
            //     // this.addressDesc = result.formattedAddress
            //     console.log(this)
            //     console.log(this.addressDesc)
            //     let geoCoder = new AMap.Geocoder()
            //     geoCoder.getAddress(
            //         this.center,
            //         (status,result)=>{
            //         if (status === 'complete'&&result.regeocode) {
            //             console.info(result)
            //         }else{
            //             console.error('根据经纬度查询地址失败')
            //         }              
            //         }
            //     )
            //     }
            // })     
          
        },
        onSearchResult(pois) {
            console.log(pois)
            console.log(this.$refs.searchBox)
        },
        appLogin() {
            const params = {
                sessionId: this.sessionId
            }
            this.$http.get('/user/applogin',{params})
            .then(res=>{
                console.log(res)
            })
        },
    }
};
</script>

<style scoped lang="scss">

   .xxx-cpnt{
       overflow-y: auto;
       min-height: 100vh;
       padding-top: 45px;

   } 
</style>
