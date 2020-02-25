<template>
    <div class="catePage white">
        <iHeader @doSomething="$emit('hide')" text="分类"></iHeader>
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
                    <v-col 
                    column 
                    v-for="(item,index) in cate.items" 
                    @click="toDetail(item.itemId)"
                    :key="index" 
                    cols="4">
                        <v-avatar
                            size="50"
                            tile
                        >
                            <img :src="item.pic">
                        </v-avatar>
                        <span class="caption">{{item.itemName}}</span>
                    </v-col>
                </v-row>
            </v-tab-item>
        </v-tabs>
        <goodsDetails :id="goodsId" @hide="showDetails=false" v-if="showDetails"/>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
import goodsDetails from './productDetails'

export default {
    components: {
        iHeader,
        goodsDetails

    },
    data: ()=>({
        tab: 0,
        showDetails: false,
        goodsId: 0
    }),
    created() {

    },
    computed: {
        cateList() {
            return this.$store.state.app.cateList
        },
    },
    mounted() {

    },
    methods: {
        tabChange(e) {
            console.log(e)
            window.scrollTo(0,0)
        },
        toDetail(id) {
            this.goodsId = id
            this.showDetails = true
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
