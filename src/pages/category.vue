<template>
  <div class="catePage white">
    <!-- <iHeader @doSomething="$emit('hide')" text="分类"></iHeader> -->
    <div class="center-header primary white--text">
      商品分类
    </div>
    <v-tabs
      v-model="tab"
      vertical
      color="primary"
      slider-color="primary"
      @change="tabChange"
    >
      <v-tab
        v-for="(cate,i) in cateList"
        :key="i"
        small
        class="px-0"
      >
        {{ cate.cateName }}
      </v-tab>
      <v-tab-item
        v-for="(cate,i) in cateList"
        :key="i"
        class="pa-2"
      >
        <v-row>
          <v-col
            v-if="cate.cateImage"
            class="pa-0"
            cols="12"
          >
            <v-img
              aspect-ratio="3"
              :src="cate.cateImage"
            />
          </v-col>
          <v-col 
            v-for="(item,index) in cate.items" 
            :key="index" 
            class="d-flex flex-column align-center px-0"
            cols="4" 
            @click="toDetail(item.itemId)"
          >
            <v-avatar
              v-if="item.pic"
              size="50"
              tile
            >
              <img :src="item.pic">
            </v-avatar>
            <span class="caption text--secondary v-collips">{{ item.itemName }}</span>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>
    <!-- <goodsDetails :id="editId" @hide="showDetails=false" v-if="showDetails"/> -->
  </div>
</template>

<script>
// import iHeader from '../components/public/header'
// import goodsDetails from './productDetails'

export default {
    name: 'Category',
    components: {
        // iHeader,
        // goodsDetails

    },
    data: () => ({
        tab: 0,
        showDetails: false,
        editId: 0
    }),
    computed: {
        cateList() {
            return this.$store.state.app.cateList
        },
        areasId() {
            return this.$store.state.app.areasId
        }
    },
    created() {

    },
    mounted() {
        this.findCates()
    },
    methods: {
        async findCates() {
            // if(!this.cateList){
            //     return
            // }
            const res = await this.$http.get('/service/findCates', { params: { areasId: this.areasId } })
            if (res.data) {
                const obj = res.data.obj
                obj.forEach(res => {
                    const items = res.items
                    items.forEach(re => {
                        if (re.pic) {
                            const pic = re.pic.split(',')[0]
                            re.pic = pic
                        }
                    })
                })
                this.$store.commit('SET_SINGLE_STATE', ['cateList', obj])
            }
            console.log(res, 'rrr')
        },
        tabChange(e) {
            console.log(e)
            window.scrollTo(0, 0)
        },
        toDetail(id) {
            if (!id) {
                return
            }
            // this.editId = id
            // this.showDetails = true
            this.$router.push({
                path: '/productDetails',
                query: {
                    id
                }
            })            
        }
    }
};
</script>

<style scoped lang="scss">

   .catePage{
       overflow-y: auto;
       padding-top: 45px;
       padding-bottom: 50px;
   } 
</style>
