<template>
    <div class="xxx-cpnt white">
        <iHeader @doSomething="$emit('hide')" text="消息通知"></iHeader>
    </div>
</template>

<script>
import iHeader from '../public/header'
export default {
    components: {
       iHeader
    },
    data: ()=>({

    }),
    created() {

    },
    computed: {

    },
    mounted() {

    },
    methods: {

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
