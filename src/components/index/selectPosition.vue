<template>
    <div class="searchBox-cpnt white px-2">
        <iHeader @doSomething="$emit('hide')" text="搜索地址"></iHeader>
        <v-text-field
            name="name"
            outlined
            rounded
            dense
            class="mt-4"
            id="searchBox"
            prepend-inner-icon="mdi-magnify"
            @input="lodashInput"
            v-model="key"
        ></v-text-field>
        <v-list>
            <v-list-item-group v-model="selected" color="primary">
                <v-list-item
                v-for="(item, i) in list"
                :key="i"
                >
                    <v-list-item-content>
                        <v-list-item-title @click.stop="getArea(item.location)" v-text="item.name"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>        
                    <!-- @keypress.enter="searchInput(key)" -->

    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'searchBox',
    components: {
       iHeader
    },
    data: ()=>({
        key: '',
        searchOption: {
            city: '福州',
            citylimit: true
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
        selected: null
    }),
    created() {
        this.lodashInput = this._.debounce(this.keyInput, 200)
    },
    computed: {

    },
    mounted() {

    },
    methods: {
        onSearchResult(pois) {
            console.log(pois)
            console.log(this.$refs.searchBox)
        },
        searchInput(e){
            const autoOptions = {
                city: '福州'
            }
            let autoComplete = new AMap.Autocomplete(autoOptions)
            autoComplete.search(e,(status,res) => {
                console.log(status)
                console.log(res)
            })
        },
        keyInput(){
            const autoOptions = {
                city: '福州'
            }
            let autoComplete = new AMap.Autocomplete(autoOptions)
            autoComplete.search(this.key, (status,res) => {
                console.log(status)
                console.log(res)
                this.list = res.tips
            })            
        },
        getArea(e){
            let that = this
            console.log('sff')
            let center = [
                e.O,
                e.P
            ]
            let geoCoder = new AMap.Geocoder()
            geoCoder.getAddress(
                center,
                (status,result)=>{
                if (status === 'complete'&&result.regeocode) {
                    console.info(result)
                    const area = result.regeocode.addressComponent.city + result.regeocode.addressComponent.district
                    that.$store.commit('SET_SINGLE_STATE', ['positionCity', area])
                    that.$emit('hide')
                }else{
                    console.error('根据经纬度查询地址失败')
                }              
                }
            )
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
