<template>
    <div class="catePage white">
        <iHeader @doSomething="$emit('hide')" text="分类"></iHeader>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
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

   .catePage{
       overflow-y: auto;
   } 
</style>
