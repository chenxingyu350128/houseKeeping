<template>
    <div class="nursePage white">
        <iHeader @doSomething="$emit('hide')" :text="topText"></iHeader>
        <v-tabs
            v-model="tab"
            color="primary"
            height="35"
            slider-color="primary"
            grow
        >
            <v-tab 
            style="min-width: unset!important" 
            class="px-0" 
            @click="tabClick(i,$event)"
            v-for="(tab,i) in tabs" 
            :key="i">
                <div class="d-flex align-center flex-fill fill-height">
                    <v-divider v-if="i" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    {{tab.title}}
                    <v-icon dense>{{tab.reverse?'mdi-chevron-up':'mdi-chevron-down'}}</v-icon>
                    <v-spacer></v-spacer>                        
                </div>                
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
            <v-tab-item v-for="(item,i) in tabs" :key="i"> 
                <van-list 
                v-if="nannys.length"
                :immediate-check="false"
                @load="loadBottom" 
                :finished="allLoaded" 
                loading-text="加载中..." 
                finished-text="已全部加载完"  
                ref="loadmore">

                    <v-list 
                    class="py-0"
                    three-line
                    v-for="(item,index) in nannys" 
                    :key="index"
                    :value="index"                
                    @click.native="toDetails(item.name,item.nannyId)"
                    
                    >
                        <v-list-item
                        class="px-2"
    >
                            <v-avatar
                                size="65"
                                tile
                                class="mr-2"
                            >
                                <img :src="item.headImg">
                            </v-avatar>
                            <v-list-item-content>
                                <div class="subtitle-2 d-flex">
                                    <span class="mr-1">{{item.name}}</span>
                                    <span class="mr-1 caption">{{item.age}}岁</span>
                                    <span class="orange--text caption flex-fill">{{item.salary}}/月</span>
                                    <v-btn class="caption px-1" depressed x-small dark color="grey lighten-1">由{{item.company}}</v-btn>
                                </div>
                                <div class="d-flex">
                                    <v-btn 
                                    dark 
                                    rounded 
                                    outlined 
                                    x-small
                                    class="mr-1"
                                    color="primary">
                                    {{item.experience}}月经验
                                    </v-btn>
                                    <v-btn 
                                    dark 
                                    rounded 
                                    outlined 
                                    x-small
                                    class="mr-1"
                                    color="primary">
                                    {{item.education}}
                                    </v-btn>
                                    <v-btn 
                                    dark 
                                    rounded 
                                    outlined 
                                    x-small
                                    class="mr-1"
                                    color="primary">
                                    {{item.nativePlace}}人
                                    </v-btn>                                
                                </div>
                                <div class="subtitle-2 text--primary">
                                    <span v-for="(label,i) in item.labels" :key="i">
                                        <span>
                                            {{label.label}}
                                            <span v-if="i!=item.labels.length-1">,</span>
                                        </span>
                                    </span>
                                </div>
                            </v-list-item-content>   
                        </v-list-item>
                        <v-divider></v-divider>                     
                    </v-list>
                </van-list>

            </v-tab-item>
            
        </v-tabs-items>
        <nannyDetails :nannyName="detailName" :id="detailId" @hide="showDetails=false" v-if="showDetails"/>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
import nannyDetails from '../components/index/nannyDetails'
export default {
    name: 'nannyList',
    props: {
        type: {
            type: Number,
            required: true
        }
    },
    components: {
       iHeader,
       nannyDetails
    },
    data: ()=>({
        tab: 0,
        showDetails: false,
        allLoaded: false,
        detailName: '',
        detailId: 0,
        page: 1,
        rows: 10,
        // showMenu: false,
        tabs: [
            {
                title: '籍贯',
                reverse: false
            },
            {
                title: '工资',
                reverse: false
            },
            {
                title: '经验',
                reverse: false
            },
            {
                title: '年龄',
                reverse: false
            },
            {
                title: '能力',
                reverse: false
            },
            
        ],
        strs: ['native_place','salary','education','age','experience','power'],
        nannys: [
            {
                "age": 37, 
                "city": "福州", 
                "collectCount": 0, 
                "company": "中青家政服务", 
                "createTime": { 
                    "date": 26,
                    "day": 3,
                    "hours": 11,
                    "minutes": 41,
                    "month": 1,
                    "seconds": 22,
                    "time": 1582688482000,
                    "timezoneOffset": -480,
                    "year": 120
                },
                "dataFlag": true, 
                "education": "高中", 
                "experience": 24, 
                "goodEvalCount": 0, 
                "headImg": "", 
                "idCard": "350822198508235913", 
                "labels": [ 
                    {
                        "label": "做事认真",
                        "lableId": 1,
                        "nannyId": 1
                    },
                    {
                        "label": "责任心强",
                        "lableId": 2,
                        "nannyId": 1
                    },
                    {
                        "label": "有耐心",
                        "lableId": 3,
                        "nannyId": 1
                    }
                ],
                "marriage": true, 
                "name": "兰阿姨", 
                "nannyId": 1, 
                "nation": "汉族", 
                "nativePlace": "福建", 
                "number": "35081298", 
                "onDutyCount": 0, 
                "phone": "18000000000", 
                "salary": 3800, 
                "state": 1, //状态 0待岗 1在岗 2不在岗
                "subscribeCount": 0, //预约次数
                "type": "0", //类型 0住家保姆 1非住家保姆 2月嫂 3护工 4育儿嫂
                "updateTime": { //更新时间
                    "date": 26,
                    "day": 3,
                    "hours": 11,
                    "minutes": 41,
                    "month": 1,
                    "seconds": 27,
                    "time": 1582688487000,
                    "timezoneOffset": -480,
                    "year": 120
                }
            },
            {
                "age": 37, 
                "city": "福州", 
                "collectCount": 0, 
                "company": "中青家政服务", 
                "createTime": { 
                    "date": 26,
                    "day": 3,
                    "hours": 11,
                    "minutes": 41,
                    "month": 1,
                    "seconds": 22,
                    "time": 1582688482000,
                    "timezoneOffset": -480,
                    "year": 120
                },
                "dataFlag": true, 
                "education": "高中", 
                "experience": 24, 
                "goodEvalCount": 0, 
                "headImg": "", 
                "idCard": "350822198508235913", 
                "labels": [ 
                    {
                        "label": "做事认真",
                        "lableId": 1,
                        "nannyId": 1
                    },
                    {
                        "label": "责任心强",
                        "lableId": 2,
                        "nannyId": 1
                    },
                    {
                        "label": "有耐心",
                        "lableId": 3,
                        "nannyId": 1
                    }
                ],
                "marriage": true, 
                "name": "兰阿姨", 
                "nannyId": 1, 
                "nation": "汉族", 
                "nativePlace": "福建", 
                "number": "35081298", 
                "onDutyCount": 0, 
                "phone": "18000000000", 
                "salary": 3800, 
                "state": 1, //状态 0待岗 1在岗 2不在岗
                "subscribeCount": 0, //预约次数
                "type": "0", //类型 0住家保姆 1非住家保姆 2月嫂 3护工 4育儿嫂
                "updateTime": { //更新时间
                    "date": 26,
                    "day": 3,
                    "hours": 11,
                    "minutes": 41,
                    "month": 1,
                    "seconds": 27,
                    "time": 1582688487000,
                    "timezoneOffset": -480,
                    "year": 120
                }
            },
            {
                "age": 37, 
                "city": "福州", 
                "collectCount": 0, 
                "company": "中青家政服务", 
                "createTime": { 
                    "date": 26,
                    "day": 3,
                    "hours": 11,
                    "minutes": 41,
                    "month": 1,
                    "seconds": 22,
                    "time": 1582688482000,
                    "timezoneOffset": -480,
                    "year": 120
                },
                "dataFlag": true, 
                "education": "高中", 
                "experience": 24, 
                "goodEvalCount": 0, 
                "headImg": "", 
                "idCard": "350822198508235913", 
                "labels": [ 
                    {
                        "label": "做事认真",
                        "lableId": 1,
                        "nannyId": 1
                    },
                    {
                        "label": "责任心强",
                        "lableId": 2,
                        "nannyId": 1
                    },
                    {
                        "label": "有耐心",
                        "lableId": 3,
                        "nannyId": 1
                    }
                ],
                "marriage": true, 
                "name": "兰阿姨", 
                "nannyId": 1, 
                "nation": "汉族", 
                "nativePlace": "福建", 
                "number": "35081298", 
                "onDutyCount": 0, 
                "phone": "18000000000", 
                "salary": 3800, 
                "state": 1, //状态 0待岗 1在岗 2不在岗
                "subscribeCount": 0, //预约次数
                "type": "0", //类型 0住家保姆 1非住家保姆 2月嫂 3护工 4育儿嫂
                "updateTime": { //更新时间
                    "date": 26,
                    "day": 3,
                    "hours": 11,
                    "minutes": 41,
                    "month": 1,
                    "seconds": 27,
                    "time": 1582688487000,
                    "timezoneOffset": -480,
                    "year": 120
                }
            },
            
        ]
    }),
    created() {
        this.loadBottom = this._.debounce(this.loadmore, 200)
    },
    computed: {
        topText(){
            let strs = [
                '住家保姆',
                '非住家保姆',
                '月嫂',
                '护工',
                '育儿嫂'
            ]
            return strs[this.type]
        }
    },
    mounted() {
        const params = {
            name: 'native_place',
            val: 'asc',
            type: this.type,
            page: this.page,
            rows: this.rows      
        }
        this.init(params)
    },
    methods: {
        tabClick(i,e){
            e.preventDefault()
            // const strs = ['native_place','salary','education','age','experience','power']
            // const params = {
            //     name: strs[i],
            //     val: this.tabs[i].reverse?'desc':'asc',
            //     page: this.page,
            //     rows: this.rows
            // }
            console.log('i的数值：'+i)
            console.log('tab:'+this.tab)
            if(i==this.tab){
                let obj = this.tabs[i]
                obj.reverse = !obj.reverse
                this.$set(this.tabs,i,obj)
                const params = {
                    name: this.strs[i],
                    val: this.tabs[i].reverse?'desc':'asc',
                    type: this.type,
                    page: this.page,
                    rows: this.rows
                }
                this.init(params)
                console.log(params)
            }else{//新的tab,page重置为1
                this.page = 1
                const params = {
                    name: this.strs[i],
                    val: this.tabs[i].reverse?'desc':'asc',
                    type: this.type,
                    page: this.page,
                    rows: this.rows
                }
                console.log(params)
                this.init(params)
            }
        },
        init(params,y){
            this.$http.get('/nanny/findNannys',{params})
            .then(res=>{
                if(res.data.success){
                    let rows = res.data.obj.rows
                    this.allLoaded = res.data.obj.currentPage === res.data.obj.totalPages
                    this.nannys = y?this.nannys.concat(rows):rows
                }
            })
        },
        loadmore() {
            this.page++
            const params = {
                name: this.strs[this.tab],
                val: this.tabs[this.tab].reverse?'desc':'asc',
                type: this.type,
                page: this.page,
                rows: this.rows
            }
            console.log(params)
            this.init(params,'Yo')

        },
        toDetails(name,id){
            this.detailName = name
            this.detailId = id
            console.log('showDetail')
            this.showDetails = true
        }
    }
};
</script>

<style scoped lang="scss">

   .nursePage{
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
