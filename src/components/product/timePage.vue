<template>
    <div class="timePage white">
         <iHeader @doSomething="$emit('hide')" text="选择服务时间"></iHeader>
         <v-tabs
             v-model="tab"
             color="primary"
             grow
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
    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'timePage',
    props: {
        id: Number,
        required: true
    },
    components: {
       iHeader
    },
    data: ()=>({
        tab: 0
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
                arr[i].day = i==0?'今天':i==1?'明天':weekDays[day]
            })
            console.log(arr)
            return arr
        }
    },
    mounted() {
       this.init()
    },
    methods: {
        init() {
            const params = {
                id: this.id,
                time: this.tabItems[this.tab].longStr
            }
            this.$http.get('/order/isFull',{params})
            .then(res=>{
                if(res.data.success){
                    let obj = res.data.obj
                    for(let x in obj) {
                        
                    }
                }
            })
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
