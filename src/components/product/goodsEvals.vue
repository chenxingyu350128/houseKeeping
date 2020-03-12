<template>
    <div class="xxx-cpnt grey lighten-3">
        <iHeader @doSomething="$emit('hide')" :text="nannyEval?'雇主评价':'商品评价'"></iHeader>
        <div class="d-flex px-2 py-2 justify-space-between">
            <v-btn 
            depressed
            v-for="(item,i) in types" 
            :key="i" 
            small
            @click="typeChange(i)"
            :color="i==type?'primary':'grey lighten-2'">
            {{item}}
            </v-btn>
        </div>
        <van-list 
        v-if="list.length"
        :immediate-check="false"
        @load="loadBottom" 
        :finished="allLoaded" 
        loading-text="加载中..." 
        finished-text="已全部加载完"  
        ref="loadmore">
            <v-card class="pa-2 ma-2" v-for="(item,i) in list" :key="i">
                <div class="d-flex justify-space-between">
                    <span>{{item.userName}}</span>
                    <span class="text--secondary">{{item.createTime}}</span>
                </div>
                <v-rating readonly background-color="red" small color="red" v-model="item.eval"></v-rating>
                <v-divider></v-divider>
                <div class="my-2">{{item.opinion}}</div>
            </v-card>
        </van-list>


    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'goodsEval',
    props: {
        nannyEval: {
            type: String,
            default: ''
        },
        id: {
            type: Number,
            required: true
        }
    },
    components: {
       iHeader
    },
    data: ()=>({
        types: ['全部','好评','中评','差评'],
        type: 0,
        rows: 10,
        page: 1,
        allLoaded: false,
        list: []
    }),
    created() {
        this.loadBottom = this._.debounce(this.loadmore,200)
    },
    computed: {

    },
    mounted() {
        this.init()
    },
    methods: {
        init(e) {
            let url = this.nannyEval?'/service/findEvalsByNanny':'/service/findEvalsByGoods'
            const params = {
                type: this.nannyEval?this.type:this.type-1
            }
            if(this.nannyEval){
                params.nannyId = this.id
            }else{
                params.goodsId = this.id
            }
            this.$http.get(url,{params})
            .then(res=>{
                if(res.data.success){
                    this.allLoaded = res.data.obj.currentPage === res.data.obj.totalPages
                    // this.list = e?this.list.concat(res.data.obj):res.data.obj
                }
            })
        },
        loadmore() {
            this.page++
            this.init('Yo')
        },
        typeChange(e){
            if(e==this.type) {
                return
            }
            this.page = 1
            this.type = e
            this.init()
        }
    }
};
</script>

<style scoped lang="scss">

   .xxx-cpnt{
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
