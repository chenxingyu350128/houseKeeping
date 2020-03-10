<template>
    <div class="timePage white">
         <iHeader @doSomething="$emit('hide')" text="选择服务时间"></iHeader>
         <v-tabs
             v-model="tab"
             color="primary"
             grow
             @change="tabChange"
             class="px-0 caption"
             slider-color="primary"
         >
             <v-tab class="px-0" style="min-width: unset!important" v-for="(tab,i) in tabItems" :key="i">
                 <div class="d-flex flex-column align-center caption">
                     <span>{{tab.day}}</span>
                     <span>{{tab.cn}}</span>
                 </div>
             </v-tab>
         </v-tabs>
         <v-tabs-items v-model="tab">
             <v-row v-if="type==2" class="pa-0 ma-0">
                 <v-col v-for="(item,i) in times" :key="i" cols="4">

                    <v-btn 
                    :dark="!item.status"
                    small
                    block
                    depressed
                    @click="timeSelect(i)"
                    :disabled="!!item.status"
                    v-text="item.time"
                    :color="timeIndex===i?'teal accent-2':'primary'"></v-btn>
                 </v-col>
             </v-row>
             <div class="pa-4" v-else>
                 <v-btn block @click="showBS = true" color="primary">{{timeStr||'请选择时间'}}</v-btn>
                 <v-btn @click="selectCertain" class="mt-2" block color="primary">确认</v-btn>
             </div>
             <v-bottom-sheet v-model="showBS">
                <van-datetime-picker
                type="time"
                :formatter="formatter"
                @cancel="showBS=false"
                @confirm="onConfirm"
                :min-hour="minHour"
                :min-minute="minMin"
                />                 
             </v-bottom-sheet>
         </v-tabs-items>
    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'timePage',
    props: {
        id: {
            type: Number,
            default: 0
        },
        type: {
            type: Number,
            required: true
        },

    },
    components: {
       iHeader
    },
    data: ()=>({
        tab: 0,
        times: null,
        fullDateTimes: null,
        timeIndex: null,
        showBS: false,
        timeStr: ''
    }),
    created() {

    },
    computed: {
        tabItems() {

            let weekDays = ['周天','周一','周二','周三','周四','周五','周六']
            console.log(weekDays)
            let today = new Date()
            let dayPast1 = new Date(new Date().setDate(new Date().getDate()+1))
            let dayPast2 = new Date(new Date().setDate(new Date().getDate()+2))
            let dayPast3 = new Date(new Date().setDate(new Date().getDate()+3))
            console.log(today,dayPast1,dayPast2,dayPast3)
            let arr = [
                {},
                {},
                {},
                {}
            ]
            let basic = [today,dayPast1,dayPast2,dayPast3]
            console.log(basic)
            basic.forEach((res,i)=>{
                let y = res.getFullYear()
                let m = res.getMonth()+1
                let d = res.getDate()
                let day = res.getDay()
                console.log(i,m,d)
                m = m<10?'0'+m:m
                d = d<10?'0'+d:d
                let cn = m+'月'+d+'日'
                let en = y+'-'+m+'-'+d
                let times = [
                    '10:00:00',
                    '11:00:00',
                    '13:00:00',
                    '14:00:00',
                    '15:00:00',
                    '16:00:00',
                ]
                let addDate = times.map(res=>{
                    return en+' '+res
                })
                let longStr = addDate.reduce((x,y)=>{
                    // let xStr = en + ' '+x
                    // let yStr = en + ' '+y
                    // console.log(xStr,yStr)
                    return x + '~' + y
                })
                console.log(i,m,d)
                arr[i].longStr = longStr
                arr[i].cn = cn
                arr[i].en = en
                arr[i].day = i==0?'今天':i==1?'明天':weekDays[day]
            })
            console.log(arr)
            return arr
        },
        minHour(){
            if(this.tab){
                return 0
            }
            return new Date().getHours()
        },
        minMin(){
            if(this.tab){
                return 0
            }
            return new Date().getMinutes()
        },
    },
    mounted() {
       this.init()
    },
    methods: {
        init() {
            if(this.type!==2) {
                return
            }
            const params = {
                id: this.id,
                time: this.tabItems[this.tab].longStr
            }
            this.$http.get('/order/isFull',{params})
            .then(res=>{
                if(res.data.success){
                    let obj = res.data.obj
                    let keys = Object.keys(obj)
                    this.fullDateTimes = keys
                    let times = keys.map(res=>{
                        return res.split(' ')[1]
                    })
                    let values = Object.values(obj)
                    let status = values.map(res=>{
                        return Number(res)
                    })
                    console.log(times,status)
                    let x = []
                    let len = times.length
                    for(let i=0;i<len;i++){
                        x.push({
                            time: times[i],
                            status: status[i]                            
                        })
                    }
                    this.times = x
                }
            })
        },
        formatter(type, value) {
            if (type === 'hour') {
            return `${value}时`;
            } 
            else if (type === 'minute') {
            return `${value}分`
            }
            else if (type === 'day') {
            return `${value}日`
            }
            else if (type === 'month') {
            return `${value}月`
            }
            else if (type === 'year') {
            return `${value}年`
            }
            return value;
        },        
        tabChange(i) {
            console.log(i)
            console.log(this.tab)
            this.init()
        },
        timeSelect(e) {
            this.timeIndex = e
            this.$emit('timeSelect',this.fullDateTimes[this.timeIndex])
        },
        onConfirm(e){
            this.showBS = false
            this.timeStr= this.tabItems[this.tab].en+' '+e+':00'
            console.log(e)
        },
        selectCertain() {
            if(!this.timeStr) {
                this.$toast('请选择服务时间')
                return
            }
            this.$emit('timeSelect',this.timeStr)
        }
    }
};
</script>

<style scoped lang="scss">

   .timePage{
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
