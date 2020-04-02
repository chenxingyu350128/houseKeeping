<template>
  <div class="goodsDetail grey lighten-3">
    <iHeader
      text="商品详情"
      @doSomething="$router.back()"
    >
      <template v-slot:right>
        <v-icon @click="showShare=true">
          mdi-share
        </v-icon>
      </template>
    </iHeader>
    <v-carousel 
      class="green lighten-3"
      hide-delimiters
      hide-delimiter-background
      height="134"
    >
      <v-carousel-item
        v-for="(item,i) in images"
        :key="i"
        contain
        :src="item"
      />
    </v-carousel>
    <div class="pa-4 mb-2 white">
      <div class="red--text caption pb-4">
        ￥
        <span class="headline">{{ currentPrice }} <span
          v-if="notYetChoose"
          class="caption"
        >起</span>  </span>
                
        <span
          style="text-decoration: line-through"
          class="text--secondary ml-6"
        >￥{{ originalPrice }}</span>
      </div>
      <div class="title font-weight-bold pb-2">
        {{ itemName }}
      </div>
      <div class="caption text--secondary">
        {{ shortIntro }}
      </div>
    </div>
    <div
      class="px-4 py-2 d-flex align-center justify-space-between subtitle-2 white mb-2"
      @click="showBS=true"
    >
      <div class="d-flex align-center">
        选择:<span
          v-if="choice"
          class="ml-2 font-weight-bold"
        >已选 {{ choice }}</span>
      </div>
      <v-icon>mdi-chevron-right</v-icon>
    </div>
    <div
      class="px-4 py-2 d-flex align-center justify-space-between subtitle-2 white"
      @click="getAllEvals"
    >
      <div>全部评价({{ evalCount }})</div>
      <v-icon>mdi-chevron-right</v-icon>
    </div>
    <div v-if="goodsDetails">
      <div class="px-12 d-flex align-center justify-center subtitle-1 white mt-2 py-2">
        <v-divider
          color="grey"
          width="35%"
        />
        <span class="mx-4 text--secondary font-weight-bold">商品详情</span>
        <v-divider
          color="grey"
          width="100"
        />
      </div>
      <v-card
        v-for="(item,i) in goodsDetails.split(',')"
        :key="i"
        tile
      >
        <v-img :src="item" />
      </v-card>
    </div>
    <v-bottom-sheet
      v-model="showBS"
    >
      <div class="white pa-4">
        <div class="d-flex align-center">
          <v-avatar
            size="65"
            tile
          >
            <img :src="sheetAvatar">
          </v-avatar>
          <div class="subtitle-2 ml-2 d-flex flex-column">
            <span>{{ itemName }}</span>
            <span class="caption text--secondary">{{ shortIntro }}</span>
            <span>
              <span class="red--text title mr-2">￥{{ currentPrice }} <span class="overine">起</span> </span>
              <span
                class="text--secondary"
                style="text-decoration: line-through"
              >￥{{ originalPrice }}</span>
            </span>
          </div>
        </div>
        <v-divider />
        <!-- <div class="py-2 subtitle-1">请选择类别</div>
                <v-row class="justify-space-between" no-gutters>
                    <v-col class="pa-2" cols="6">
                        <v-btn depressed block color="primary" dark>类型1</v-btn>
                    </v-col>
                    <v-col class="pa-2" cols="6">
                        <v-btn depressed block color="primary" dark>类型2</v-btn>
                    </v-col>
                    <v-col class="pa-2" cols="6">
                        <v-btn depressed block color="primary" dark>类型3</v-btn>
                    </v-col>
                </v-row> -->
        <div class="py-2 subtitle-1">
          请选择商品
        </div>
        <v-row
          class="justify-space-between"
          no-gutters
        >
          <v-col 
            v-for="(item,i) in details" 
                        
            :key="i" 
            class="pa-2" 
            cols="12"
          >
            <v-btn
              outlined
              depressed
              small
              color="primary"
              dark
            >
              <span
                title="1234"
                class="v-collips-15 caption"
                @click="itemOrder(item,i)"
              >{{ item.type }}</span>
            </v-btn>
          </v-col>
        </v-row>                
      </div>
    </v-bottom-sheet>
    <v-bottom-sheet v-model="showShare">
      <div class="white pa-2 text--secondary">
        分享到
      </div>
      <div class="white d-flex justify-space-around py-4 subtitle-2 text--secondary">
        <div
          class="d-flex flex-column align-center"
          @click="share(1)"
        >
          <v-btn
            depressed
            dark
            fab
            small
            color="green accent-4"
          >
            <v-icon>mdi-wechat</v-icon>
          </v-btn>
          微信好友
        </div>
        <div
          class="d-flex flex-column align-center"
          @click="share(2)"
        >
          <v-btn
            depressed
            dark
            fab
            small
            color="green accent-4"
          >
            <v-icon>mdi-camera-iris</v-icon>
          </v-btn>
          朋友圈
        </div>
      </div>
    </v-bottom-sheet>
    <v-footer
      fixed
      bottom
      class="white d-flex align-center justify-space-around"
    >
      <div
        class="d-flex flex-column align-center caption mr-4"
        @click="toIndex"
      >
        <v-icon
          dense
          color="primary"
        >
          mdi-bank
        </v-icon>
        <span>首页</span>
      </div>
      <div
        class="d-flex flex-column align-center caption mr-4"
        @click="changeCollect"
      >
        <v-icon
          dense
          color="primary"
        >
          {{ collect?'mdi-star':'mdi-star-outline' }}
        </v-icon>
        <span>收藏</span>
      </div>
      <v-btn
        depressed
        class="flex-fill"
        rounded
        dark
        color="primary"
        @click="buyNow"
      >
        立即购买
      </v-btn>
    </v-footer>
    <orderCertain
      v-if="showOrderCertain"
      :pic="images[0]"
      :comp-id="compId"
      :type="goodsType"
      :item="editItem"
      @hide="showOrderCertain=false"
    />
    <goodsEvals
      v-if="showEvals"
      :id="itemId"
      @hide="showEvals=false"
    />
  </div>
</template>

<script>
import iHeader from '../components/public/header'
import goodsEvals from '../components/product/goodsEvals'
import orderCertain from './orderCertain'
export default {
    name: 'GoodsDetail',
    // props: {
    //     id: {
    //         type: Number,
    //         required: true
    //     },
    //     // obj: {
    //     //     type: Object,
    //     //     required: true
    //     // }
    // },
    components: {
       iHeader,
       orderCertain,
       goodsEvals
    },
    data: () => ({
        id: 0,
        details: [],
        editItem: {},
        index: 0,
        currentPrice: 0,
        goodsSales: 0, // 测试评价数据时，设置大于0
        goodsDetails: '',
        goodsState: true,
        notYetChoose: true,
        goodsType: 0,
        evalCount: 0,
        indexType: '',
        intro: '',
        itemName: '',
        itemId: 0,
        originalPrice: 0,
        pic: '',
        process: '',
        scope: '',
        shortIntro: '',
        type: '',
        compId: 0,
        choice: '',
        showBS: false,
        showEvals: false,
        selectedAddress: '',
        collect: false,
        showShare: false,
        showOrderCertain: false

    }),
    computed: {
        images() {
            return this.pic.split(',')
        },
        userId() {
            return this.$store.state.app.userId
        },
        sheetAvatar() {
            return this.images[this.index]
        }
    },
    watch: {
        obj: {
            handler(val) {
                for (const x in val) {
                    this[x] = val[x]
                }
            },
            immediate: true
        }
    },
    created() {

    },
    mounted() {
        this.id = this.$route.query.id
        this.init()
        console.log(location)
    },
    methods: {
        init() {
            const params = {
                userId: this.userId,
                itemId: this.id
            }
            this.$http.get('/service/findDetailByItemId', { params })
            .then(res => {
                if (res.data.success) {
                    console.log(res.data.obj)
                    const obj = res.data.obj
                    for (const x in obj) {
                        this[x] = obj[x]
                    }
                    this.ifCollected()
                    this.getEval()
                    // this.images = this.pic.split(',')
                }
            })
        },
        getEval() {

        },
        ifCollected() {
            const params = {
                userId: this.userId,
                goodsId: this.itemId
            }
            this.$http.get('/service/isCollect', { params })
            .then(res => {
                if (res.data.success) {
                    this.collect = res.data.obj
                }
            })
        },
        changeCollect() {
            const url = this.collect ? '/service/delServiceCollect' : '/service/addServiceCollect'
            const data = {
                userId: this.userId,
                goodsId: this.itemId
            }
            this.$http.post(url, data)
            .then(res => {
                if (res.data.success) {
                    this.collect = !this.collect
                }
            })
        },
        toIndex() {
            this.$router.push('/index')
            // this.$emit('hide')
            // console.log(this.$route)
            // if(this.$route.path!='/index'){
            // }
        },
        itemOrder(item, i) {
            this.index = i
            // this.originalPrice = item.originalPrice
            this.currentPrice = item.price
            this.choice = item.type
            this.editItem = item
            this.notYetChoose = false
            this.showBS = false
        },
        buyNow() {
            if (!this.choice) {
                this.showBS = true
                return
            }
            // let serviceAddress = this.selectedAddress||this.defaultAddress
            // if(!serviceAddress){
            //     this.$toast.info('请选择服务地址')
            //     return
            // }
            // if(!this.defaultOrder){
            //     this.$toast.info('请选择服务地址')
            //     return
            // }
            this.showOrderCertain = true
        },
        getAllEvals() {
            if (!this.evalCount) {
                this.$toast('暂无评价！')
                return
            }
            this.showEvals = true
        },
        share(e) {
            this.showShare = false
            const shareInfo = {
                url: location.href,
                way: e
            };
            // 这里发送数据到给app处理
            window.webkit.messageHandlers.cordova_iab.postMessage(JSON.stringify(shareInfo))            
        }
    }
};
</script>

<style scoped lang="scss">

   .goodsDetail{
       position: fixed;
       left: 0;
       right: 0;
       top: 0;
       bottom: 0;
       height: 100vh;
       padding-top: 45px;
       padding-bottom: 50px;
       overflow-y: auto;
       z-index: 99; 
   } 
</style>
