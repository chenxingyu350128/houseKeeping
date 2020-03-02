<template>
    <div class="addressList white pb-11">
        <iHeader @doSomething="$emit('hide')" text="服务地址管理"></iHeader>
        <div v-if="list.length">
            <v-card v-for="(item,i) in list" :key="i">
                <div class="d-flex align-center subtitle-2 px-4 py-2 justify-space-between">
                    <div class="d-flex align-center">
                        <v-icon :color="item.defcode?'primary':'grey'">{{item.defcode?'mdi-check-circle':'mdi-circle-outline'}}</v-icon>
                        <span class="ml-2">{{item.receiver}}</span>
                    </div>
                    <span>{{item.phone}}</span>
                    <v-icon>mdi-square-edit-outline</v-icon>
                </div>
                <v-divider></v-divider>
                <div class="px-4 py-2">
                    <v-icon color="white">mdi-book</v-icon>
                    <span class="ml-2">{{item.region+item.communityName+item.address}}</span>
                </div>
            </v-card>
        </div>
        <v-row v-else>
            <v-col cols="12">
                <v-img max-height="35%" contain :src="emptyImg"></v-img>
                <p class="text-center subtitle-2 grey--text mt-2">您还没有服务地址，快去添加地址吧</p>
            </v-col>
        </v-row>
        <v-footer class="pa-0 ma-0" bottom fixed>
            <v-btn large depressed tile block color="primary" dark>添加</v-btn>
        </v-footer>
    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    components: {
       iHeader
    },
    data: ()=>({
        list: [],
        emptyImg: require('../../assets/img/emptyContent.png')
    }),
    created() {

    },
    computed: {
        userId() {
            return this.$store.state.app.userId
        }
    },
    mounted() {
        this.getList()
    },
    methods: {
        getList() {
            const params = {
                userId: this.userId
            }
            this.$http.get('/user/findAddress',{params})
            .then(res=>{
                if(res.data.success){
                    this.list = res.data.obj
                }
            })
        }
    }
};
</script>

<style scoped lang="scss">

   .addressList{
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
