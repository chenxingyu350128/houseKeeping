<template>
    <div class="msgPage grey lighten-3">
        <iHeader @doSomething="$emit('hide')" text="消息通知"></iHeader>
        <v-tabs
            v-model="tab"
            color="primary"
            grow
            @change="getMsg"
            slider-color="primary"
        >
            <v-tab>
                平台通知
            </v-tab>
            <v-tab>
                交易提醒
            </v-tab>
        </v-tabs>
        <v-tabs-items class="grey lighten-3" v-model="tab">
            <div class="mt-2 px-4 py-2 subtitle-2 text--secondary white" v-for="(item,i) in list" :key="i">
                <div class="d-flex justify-space-between text--primary py-2">
                    <span>{{item.msgTitle}}</span>
                    <span>{{item.createTime}}</span>
                </div>
                <div class="d-flex">
                    <span class="flex-fill ml-4 caption">{{item.msgContent}}</span>
                </div>
            </div>
            <div v-if="!list.length" class="pa-6 d-flex flex-column align-center">
                <v-img max-height="35vw" contain src="../../assets/img/emptyContent.png"></v-img>
                <span class="mt-4 subtitle-2 text--secondary">暂无消息</span>
            </div>
        </v-tabs-items>
    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    name: 'msgPage',
    components: {
       iHeader
    },
    data: ()=>({
        tab: 0,
        list: []
    }),
    created() {

    },
    computed: {
        userId() {
            return this.$store.state.app.userId
        }
    },
    mounted() {
        this.getMsg()
    },
    methods: {
        async getMsg() {
            const params = {
                userId: this.userId,
                type: this.tab
            }
            let res = await this.$http.get('/user/findMsgsByUserId',{params})
            if(res.data.success){
                this.list = res.data.obj
            }
        }
    }
};
</script>

<style scoped lang="scss">

   .msgPage{
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
