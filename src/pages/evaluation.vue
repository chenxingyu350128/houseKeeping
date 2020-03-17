<template>
    <div class="evaluatePage white">
        <iHeader @doSomething="$emit('hide')" text="评价"></iHeader>
        <div class="px-4 py-2 d-flex white">
          <v-avatar
            size="70"
            tile
            color="grey lighten-3"
          >
            <v-img :src="obj_f.pic"></v-img>
          </v-avatar>
          <div class="d-flex flex-fill ml-2 flex-column justify-space-between">
            <div>{{obj_f.name}}</div>
            <div class="d-flex justify-space-between">
              <span class="pink--text text--accent-2">￥{{obj_f.price}}</span>
              <span>x1</span>
            </div>
          </div>
        </div> 
        <div class="text-center mt-2">

          <v-rating
            v-model="rating"
            background-color="primary"
            color="primary"
          ></v-rating>        
        </div>
        <v-textarea
          label="评价内容"
          textarea
          class="ma-2"
          outlined
          v-model="desc"
        ></v-textarea>
        <v-footer fixed bottom class="white"> 
          
          <v-btn @click="commit" block large color="primary" dark>提交</v-btn>
        </v-footer>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
export default {
    name: 'evaluatePage',
    props: {
      obj: {
        type: Object,
        default: ()=>{
          return null
        }
      },
      pOrderId: {
        type: Number,
        default: 0
      },
      auntId: {
        type: Number,
        default: 0
      },
      itemId: {
        type: Number,
        default: 0
      },
      nannyId: {
        type: Number,
        default: 0
      }
    },
    components: {
       iHeader
    },
    data: ()=>({
      rating: 5,
      desc: '',
      auntId0: 0,
      itemId0: 0,
      nannyId0: 0,
      obj0: null,

    }),
    created() {
    
    },
    computed: {
      userId() {
        return this.$store.state.app.userId
      },
      userName() {
        return this.$store.state.app.userName
      },
      auntId_f () {
        return this.auntId0||this.auntId
      },
      itemId_f () {
        return this.itemId0||this.itemId
      },
      nannyId_f () {
        return this.nannyId0||this.nannyId
      },
      orderId_f () {
        return this.pOrderId||this.obj_f.orderId
      },
      obj_f () {
        return this.obj||this.obj0
      },
    },
    mounted() {
      if(this.pOrderId){
        this.getDetails()
      }
    },
    methods: {
      async getDetails () {
        const params = {
          orderId: this.pOrderId
        }
        let res = await this.$http.get('/order/findOrderById',{params})
        if(res.data&&res.data.success){
          let obj = res.data.obj
          this.auntId0 = obj.auntId
          this.itemId0 = obj.itemId
          this.nannyId0 = obj.nannyId
          this.obj0 = obj.orderServices[0]

        }
        
      },
      async commit() {
        // if(!this.rating) {
        //   this.$toast('请进行星级评价')
        //   return
        // }
        if(!this.desc) {
          this.$toast('请填写评价内容')
          return
        }
        const data = {
          userId: this.userId,
          userName: this.userName,
          eval: this.rating,
          orderId: this.orderId_f,
          option: this.desc
        }
        if(this.auntId_f){
          data.auntId = this.auntId_f
        }
        if(this.nannyId_f){
          data.auntId = this.nannyId_f
        }
        if(this.itemId_f){
          data.goodsId = this.itemId_f
        }
        let res = await this.$http.post('/order/addEvaluation',data)
        if(res.data.success) {
          this.$toast('评价成功')
          this.$emit('evalSuccess')
        }
      }
    }
};
</script>

<style scoped lang="scss">

   .evaluatePage{
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
