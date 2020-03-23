<template>
    <div class="searchBox-cpnt white px-2">
        <iHeader @doSomething="$emit('hide')" text="选择所在城市"></iHeader>
        <v-btn outlined @click="showProvinces=!showProvinces" class="mt-2" block color="primary" dark>{{province||'--请选择省份--'}}</v-btn>
        <v-list v-if="showProvinces" class="pa-0">
            <v-list-item-group v-model="selected" color="primary">
                <v-list-item
                v-for="(item, i) in list"
                :key="i"
                >
                    <v-list-item-content>
                        <v-list-item-title @click.stop="getDistrict(item.adcode, item.name)" v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list> 
        <v-btn outlined v-if="province" @click="showCities=true" class="mt-2" block color="primary" dark>{{city||'--请选择城市--'}}</v-btn>
        <v-list v-if="showCities" class="pa-0">
            <v-list-item-group v-model="selected" color="primary">
                <v-list-item
                v-for="(item, i) in cityList"
                :key="i"
                >
                    <v-list-item-content>
                        <v-list-item-title @click.stop="getCity(item.adcode, item.name)" v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list> 
        <!-- <el-amap 
        v-show="notShow" 
        ref="searchPage"
        :amap-manager="amapManager" 
        :events="events"
        >
        </el-amap>  -->
        <v-divider class="mt-2"></v-divider>
        <div class="px-4 subtitle-2">
            <div class="my-2">当前定位</div>
            <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                    <v-icon color="primary">mdi-map-marker</v-icon>
                    <span>{{positionCity||'定位失败'}}</span>
                </div>
                <span @click="geolocation" class="primary--text">重新定位</span>
            </div>
        </div>       

    </div>
</template>

<script>
import iHeader from '../public/header'
// import VueAMap from 'vue-amap'
// import { AMapManager } from 'vue-amap'
// VueAMap.initAMapApiLoader({
//   key: "71a4fe9e16a9e93d6653175b5f6693c8",
//   plugin: [
//     "AMap.Geolocation",
//     "AMap.Autocomplete",
//     "AMap.PlaceSearch",
//     "AMap.Scale",
//     "AMap.OverView",
//     "AMap.ToolBar",
//     "AMap.MapType",
//     "AMap.PolyEditor",
//     "AMap.CircleEditor",
//     "AMap.Geocoder",
//     "AMap.DistrictSearch",
//   ],
//   v: "1.4.4"
// });
// const amapManager = new VueAMap.AMapManager()
export default {
    name: 'searchBox',
    components: {
       iHeader
    },
    data: ()=>({
        key: '',
        // amapManager,
        opts: {
            subdistrict: 1,   //返回下一级行政区
            showbiz:false  //最后一级返回街道信息
        },          
        searchEvents: {
            init: (auto, place) => {
                // console.log(view.zoom)
                console.log('sss')
                console.log(auto)
                console.log(place)
            },
            select: e => {
                console.log(e)
            }
        }, 
        list: [],
        cityList: [],
        province: '',
        city: '',
        selected: null,
        notShow: false,
        showProvinces: false,
        showCities: false,
    }),
    computed: {
        positionCity() {
            return this.$store.state.app.positionCity
        },        
    },
    mounted() {
        this.getProvince()
    },
    methods: {
        getProvince () {
            let that = this
            //行政区查询
            //按照adcode进行查询可以保证数据返回的唯一性
            let district = new AMap.DistrictSearch(this.opts)
            district.search('中国', function(status, result) {
                if(status=='complete'){
                console.log(result.districtList[0])
                    that.list = result.districtList[0].districtList
                    // getData(result.districtList[0]);
                }
            })
        },
        getDistrict (adcode, name) {
            let that = this
            this.province = name 
            this.showProvinces = false
            let district = new AMap.DistrictSearch(this.opts)
            district.search(adcode, function(status, result) {
                if(status === 'complete'){
                    console.log(result.districtList[0].districtList);
                    that.cityList = result.districtList[0].districtList
                }
            });
        },
        getCity (adcode, name) {
            this.city = name 
            this.showCities = false
            this.$store.commit('SET_SINGLE_STATE', ['positionCity', name])
            this.$emit('adcodeGet', adcode)
        },
        geolocation() {
            let that = this
            let o = new AMap.Geolocation({
                enableHighAccuracy: true,//是否使用高精度定位，默认:true
                timeout: 10000,          //超过10秒后停止定位，默认：无穷大
                maximumAge: 0,           //定位结果缓存0毫秒，默认：0
                convert: true,           //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: true,        //显示定位按钮，默认：true
                buttonPosition: 'LB',    //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: true,        //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: true,        //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: true,     //定位成功后将定位到的位置作为地图中心点，默认：true
                zoomToAccuracy:true      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            }); 
            o.getCityInfo((status,res)=>{
                console.log(status,res)
                that.$store.commit('SET_SINGLE_STATE', ['positionCity', res.city])
                // that.$emit('hide')
                that.$emit('adcodeGet',res.adcode)
                
            })           
        }
    }
};
</script>

<style scoped lang="scss">

   .searchBox-cpnt{
       position: fixed;
       left: 0;
       right: 0;
       top: 0;
       bottom: 0;
       height: 100vh;
       padding-top: 45px;
       overflow-y: auto;
       z-index: 99; 
       #searchBox{
           text-align: left!important;
       }
   } 
</style>
