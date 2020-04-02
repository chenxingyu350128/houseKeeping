<template>
  <div class="goodsEvals grey lighten-3">
    <iHeader
      :text="nannyEval?'雇主评价':'商品评价'"
      @doSomething="$emit('hide')"
    />
    <div class="d-flex px-2 py-2 justify-space-between">
      <v-btn 
        v-for="(item,i) in types"
        :key="i" 
        depressed 
        small
        :color="i==type?'primary':'grey lighten-2'"
        @click="typeChange(i)"
      >
        {{ item }}
      </v-btn>
    </div>
    <van-list 
      v-if="list.length"
      ref="loadmore"
      :immediate-check="false" 
      :finished="allLoaded" 
      loading-text="加载中..." 
      finished-text="已全部加载完"  
      @load="loadBottom"
    >
      <v-card
        v-for="(item,i) in list"
        :key="i"
        class="pa-2 ma-2"
      >
        <div class="d-flex justify-space-between">
          <span>{{ item.userName }}</span>
          <span class="text--secondary">{{ item.createTime }}</span>
        </div>
        <v-rating
          v-model="item.eval"
          readonly
          background-color="red"
          small
          color="red"
        />
        <v-divider />
        <div class="my-2">
          {{ item.opinion }}
        </div>
      </v-card>
    </van-list>
  </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'GoodsEval',
    components: {
       iHeader
    },
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
    data: () => ({
        types: ['全部', '好评', '中评', '差评'],
        type: 0,
        rows: 10,
        page: 1,
        allLoaded: false,
        list: []
    }),
    computed: {

    },
    created() {
        this.loadBottom = this._.debounce(this.loadmore, 200)
    },
    mounted() {
        this.init()
    },
    methods: {
        init(e) {
            const url = this.nannyEval ? '/service/findEvalsByNanny' : '/service/findEvalsByGoods'
            const params = {
                type: this.type - 1
            }
            if (this.nannyEval) {
                params.nannyId = this.id
            } else {
                params.goodsId = this.id
            }
            this.$http.get(url, { params })
            .then(res => {
                if (res.data.success) {
                    this.allLoaded = res.data.obj.currentPage === res.data.obj.totalPages
                    this.list = e ? this.list.concat(res.data.obj) : res.data.obj
                }
            })
        },
        loadmore() {
            this.page++
            this.init('Yo')
        },
        typeChange(e) {
            if (e == this.type) {
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

   .goodsEvals{
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
