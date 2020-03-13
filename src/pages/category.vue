<template>
    <div class="catePage white">
        <!-- <iHeader @doSomething="$emit('hide')" text="分类"></iHeader> -->
        <div class="center-header primary white--text">商品分类</div>
        <v-tabs
            vertical
            @change="tabChange"
            v-model="tab"
            color="primary"
            slider-color="primary"
        >
            <v-tab small class="px-0" v-for="(cate,i) in cateList" :key="i">
                {{cate.cateName}}
            </v-tab>
            <v-tab-item class="pa-2" v-for="(cate,i) in cateList" :key="i">

                <v-row>
                    <v-col v-if="cate.cateImage" class="pa-0" cols="12">
                        <v-img aspect-ratio="3"  :src="cate.cateImage"></v-img>
                    </v-col>
                    <v-col 
                    class="d-flex flex-column align-center px-0" 
                    v-for="(item,index) in cate.items" 
                    @click="toDetail(item.itemId)"
                    :key="index" 
                    cols="4">
                        <v-avatar
                            v-if="item.pic"
                            size="50"
                            tile
                        >
                            <img :src="item.pic">
                        </v-avatar>
                        <span class="caption text--secondary v-collips">{{item.itemName}}</span>
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
    name: 'category',
    components: {
        // iHeader,
        // goodsDetails

    },
    data: ()=>({
        tab: 0,
        showDetails: false,
        editId: 0
    }),
    created() {

    },
    computed: {
        cateList() {
            return this.$store.state.app.cateList
        },
        areasId() {
            return this.$store.state.app.areasId
        },
    },
    mounted() {
        this.findCates()
    },
    methods: {
        async findCates() {
            // if(!this.cateList){
            //     return
            // }
            let res = await this.$http.get('/service/findCates',{params: {areasId: this.areasId}})
            if(res.data){
                let obj = res.data.obj
                obj.forEach(res=>{
                    let items = res.items
                    items.forEach(re=>{

                        if(re.pic){
                            let pic = re.pic.split(',')[0]
                            re.pic = pic
                        }
                    })
 
                })
                this.$store.commit('SET_SINGLE_STATE', ['cateList', obj])
            }
            console.log(res,'rrr')
        },
        tabChange(e) {
            console.log(e)
            window.scrollTo(0,0)
        },
        toDetail(id) {
            if(!id){
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
