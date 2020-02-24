<template>
    <div class="xxx-cpnt white">
        <iHeader @doSomething="$emit('hide')" text="我的订单"></iHeader>
    </div>
</template>

<script>
import iHeader from '../components/public/header'
export default {
    components: {
       iHeader
    },
    data: () => ({

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

   } 
</style>
