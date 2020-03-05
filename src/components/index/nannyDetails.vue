<template>
    <div class="nannyDetails white subtitle-2">
        <iHeader @doSomething="$emit('hide')" :text="newName||nannyName">
            <template v-slot:right>
                <v-icon @click="changeCollectState">{{isCollect?'mdi-star':'mdi-star-outline'}}</v-icon>
                <v-icon>mdi-share</v-icon>
            </template>
        </iHeader>
        <div class="d-flex pa-2 caption">
            <v-avatar
                size="75"
                tile
            >
                <img src="headImg">
            </v-avatar>
            <div class="d-flex flex-column flex-fill justify-space-around ml-2">
                <span class="d-flex">
                    编号：{{number}}
                    <span class="ml-2 flex-fill">{{goodEvalCount}}个好评</span>
                    <span>{{salary}}元/月</span>
                </span>
                <span>
                    总在岗天数{{onDutyCount}}天
                    <span class="ml-2">{{experience}}个月经验</span>
                </span>
                <span>
                    预约次数{{subscribeCount}}次
                    <span class="ml-2">收藏{{collectCount}}次</span>
                </span>
            </div>
        </div>
        <v-divider></v-divider>
        <div v-if="!showMore&&labels.length" class="d-flex px-2 py-1 flex-wrap">
            <v-btn 
            v-for="(item,i) in labels.slice(0,2)" 
            :key="i" 
            rounded
            dark
            depressed
            small
            class="mr-2"
            v-text="item.label"
            color="primary">
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="showMore=true" small depressed dark rounded color="grey">+更多</v-btn>
        </div>
        <div v-if="showMore&&labels.length" class="d-flex px-2 py-1 flex-wrap">
            <v-btn 
            v-for="(item,i) in labels" 
            :key="i" 
            rounded
            dark
            depressed
            small
            class="mr-2 mb-1"
            v-text="item.label"
            color="primary">
            </v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="showMore=false" small depressed dark rounded color="grey">收起</v-btn>
        </div>
        <v-divider></v-divider>
        <div class="subtitle-1 px-4 py-2">基本信息</div>
        <v-divider></v-divider>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>身份证</span>
            <span>{{idCard.substring(0,6)+'**********'+idCard.substring(idCard.length-4)}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>手机号</span>
            <span>{{phone.substring(0,3)+'****'+phone.substring(phone.length-4)}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>类型</span>
            <span>{{type==0?'住家保姆':type==1?'非住家保姆':type==2?'月嫂':type==3?'护工':'育儿嫂'}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>籍贯</span>
            <span>{{nativePlace}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>民族</span>
            <span>{{nation}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>婚姻</span>
            <span>{{marriage?'已婚':'未婚'}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>年龄</span>
            <span>{{age}}岁</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>当前城市</span>
            <span>{{city}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>最高学历</span>
            <span>{{education}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>目前状态</span>
            <span>{{state==0?'待岗':state==1?'在岗':'不在岗'}}</span>
        </div>
        <div class="subtitle-2 px-4 my-2 d-flex justify-space-between">
            <span>更新时间</span>
            <span>{{updateStr}}</span>
        </div>
        <v-divider></v-divider>
        <div @click="toShowEvals" class="subtitle-2 px-4 py-2 my-2 d-flex align-center">
            <span class="flex-fill">雇主评价</span>
            <span>共有{{goodEvalCount}}次好评，好评率{{percent}}%</span>
            <v-icon>mdi-chevron-right</v-icon>
        </div>
        <v-divider></v-divider>
        <v-card color="#daf5ec" class="mx-4 my-2">
            <div v-for="(item,i) in evalsList" :key="i">

                <div class="pa-2" >
                    <div class="d-flex justify-space-between">
                        <span>{{item.userName}}</span>
                        <span class="text--secondary">{{item.createTime}}</span>
                    </div>
                    <v-rating readonly background-color="red" small color="red" v-model="item.eval"></v-rating>
                    <div class="pt-4">{{item.opinion}}</div>
                </div>
                <v-divider></v-divider>
            </div>
        </v-card>
        <div class="px-4 py-2 title font-weight-bold">相似阿姨推荐</div>
        <v-divider></v-divider>
        <v-list 
        class="py-0"
        three-line
        v-for="(item,index) in similar.slice(0,3)" 
        :key="index"
        :value="index"                
        @click.native="toSimilar(item.name,item.nannyId)"
        
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
        <v-footer class="white py-6">
            <v-btn @click="callService" depressed color="primary">联系客服</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click="showReservation=true" depressed color="primary">立即预约</v-btn>
        </v-footer>      
        <evals nannyEval="Yo" :id="id" @hide="showEvals=false" v-if="showEvals"/>
        <reservation :userId="userId" :nannyId="nannyId" @hide="showReservation=false" v-if="showReservation"/>
    </div>
</template>

<script>
import iHeader from '../public/header'
import evals from '../product/goodsEvals'
import reservation from '../product/reservation'
export default {
    name: 'nannyDetail',
    props: {
        nannyName: {
            type: String,
            required: true
        },
        id: {
            type: Number,
            required: true
        }
    },
    components: {
       iHeader,
       evals,
       reservation
    },
    data: ()=>({
        isCollect: false,
        showReservation: false,
        showMore: false,
        showEvals: false,
        age: 29,
        newName: '',
        nannyId: 0,
        compId: 0,
        city: '福州',
        collectCount: 3,
        evalsList: [
            {
                "auntId": 0, //阿姨ID
                "eval": 2, //评价星数
                "evalId": 0, //评价ID
                "goodsId": 0, //商品ID
                "opinion": "还不错", //评价内容
                "orderId": 0, //订单ID
                "userId": 0, //用户ID
                "userName": "阿斯蒂芬" //用户昵称
            },
            {
                "auntId": 0,
                "eval": 4,
                "evalId": 0,
                "goodsId": 0,
                "opinion": "非常好",
                "orderId": 0,
                "userId": 0,
                "userName": "梵蒂冈"
            }            
        ],
        similar: [
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
        ],
        company: '中青家政服务',
        createTime: {
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
        dataFlag: true,
        education: '高中',
        experience: 23,
        goodEvalCount: 4,
        headImg: '',
        idCard: '350822198508235913',
        labels: [
            {
                "label": "做事认真",
                "lableId": 1,
                "id": 1
            },
            {
                "label": "责任心强",
                "lableId": 2,
                "id": 1
            },
            {
                "label": "有耐心",
                "lableId": 3,
                "id": 1
            },
            {
                "label": "效率高",
                "lableId": 3,
                "id": 1
            },
            {
                "label": "厨艺好",
                "lableId": 3,
                "id": 1
            },
        ],
        marriage: true,
        name: '兰阿姨',
        nation: '汉族',
        nativePlace: '福建',
        number: '35081298',
        onDutyCount: 12,
        phone: '15080090143',
        salary: 3589,
        state: 0,
        subscribeCount: 6,
        type: 0,
        servicePhone: '',
        updateTime: {
            "date": 26,
            "day": 3,
            "hours": 11,
            "minutes": 41,
            "month": 1,
            "seconds": 22,
            "time": 1582688482000,
            "timezoneOffset": -480,
            "year": 2019            
        },
        
    }),
    created() {

    },
    computed: {
        userId() {
            return this.$store.state.app.userId
        },
        // evalsList() {
        //     return this.$store.state.app.evalsList
        // },
        // nannyEvals() {
        //     return this.$state.state.app.nannyEvals
        // },
        updateStr() {
            return this.updateTime.year+'-'+this.updateTime.month+'-'+this.updateTime.date+' '+this.updateTime.hours+':'+this.updateTime.minutes+':'+this.updateTime.seconds
        },
        percent(){
            if(!this.onDutyCount){
                return 0
            }
            return Number(this.goodEvalCount/this.onDutyCount*100).toFixed(2)
        },
        
    },
    mounted() {
        const params = {
            id: this.id
        }
        this.findNanny(params)
        // this.findEvalsByNanny()
    },
    methods: {
        findNanny(params) {
            this.$http.get('/nanny/findNanny',{params})  
            .then(res=>{
                if(res.data.success){
                    let obj = res.data.obj
                    for(let x in obj){
                        this[x] = obj[x]
                    }
                    this.findSimilarity()
                    this.saveOrNot()
                    this.findEvalsList()
                }
            })   
        },
        callService() {
            console.log('yoyoyo')
            location.href='tel: ' + this.servicePhone
        },
        toSimilar(name,id) {
            this.newName = name
            const params = {
                id
            }
            this.findNanny(params)
        },
        toShowEvals() {
            if(!this.onDutyCount){
                this.$toast('暂无评价')
                return
            }
            this.showEvals = true
        },
        findEvalsList() {
            const params = {
                nannyId: this.nannyId,
                type: 1//好评
            }
            // const url = this.type?
            this.$http.get('/service/findEvalsByNanny',{params})
            .then(res=>{
                if(res.data.success){
                    this.evalsList = res.data.obj
                }
            })
        },
        findSimilarity() {
            const params = {
                compId: this.compId
            }
            console.info(params)
            this.$http.get('/nanny/findSimilarity',{params})
            .then(res=>{
                if(res.data.success){
                    this.similar = res.data.obj
                    
                }
            })
        },
        saveOrNot() {
            const params = {
                userId: this.userId,
                nannyId: this.nannyId
            }
            this.$http.get('/nanny/isCollect',{params})
            .then(res=>{
                if(res.data.success){
                    this.isCollect = !!res.data.obj
                }
            })
        },
        changeCollectState() {
            let url = this.isCollect?'/nanny/delNannyCollect':'/nanny/addNannyCollect'
            const data = {
                userId: this.userId
            }
            if(this.isCollect){
                data.nannyId = this.nannyId
            }else{
                data.nanny = this.nannyId

            }
            this.$http.post(url,data)
            .then(res=>{
                if(res.data.success){
                    this.$toast(this.isCollect?'取消收藏':'添加收藏')
                    this.isCollect = !this.isCollect
                }
            })
        }
    }
};
</script>

<style scoped lang="scss">

   .nannyDetails{
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
