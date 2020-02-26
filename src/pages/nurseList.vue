<template>
    <div class="nursePage white">
        <iHeader @doSomething="$emit('hide')" text="住家保姆"></iHeader>
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
    </div>
</template>

<script>
import iHeader from '../components/public/header'
export default {
    components: {
       iHeader
    },
    data: ()=>({
        tab: 0,
        x: 0,
        y: 0,
        selectList: [],
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
            
        ]
    }),
    created() {

    },
    computed: {

    },
    watch: {
        tab: {
            handler(val){
                this.selectList = this.tabs[val].list
            },
            immediate: true
        }
    },
    mounted() {
        const params = {
            name: 'native_place',
            val: 'asc'            
        }
        this.init(params)
    },
    methods: {
        tabClick(i,e){
            e.preventDefault()
            console.log('i的数值：'+i)
            console.log('tab:'+this.tab)
            if(i==this.tab){
                let obj = this.tabs[i]
                obj.reverse = !obj.reverse
                this.$set(this.tabs,i,obj)
            }
            const strs = ['native_place','salary','education','age','experience','power']
            const params = {
                name: strs[i],
                val: this.tabs[i].reverse?'desc':'asc'
            }
            this.init(params)
        },
        init(params){
            this.$http.get('/nanny/findNannys',{params})
            .then(res=>{
                if(res.data.success){

                }
            })
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
