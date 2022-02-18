<template>
    <div>
       <Title :title.sync="data"></Title>
    </div>
</template>

<script>
import Title from '../components/title.vue'
    export default {
        name:'apple',
        components:{
            Title
        },
        data() {
            return {
                data:{
                    title:'初始数据',
                    value:'新数据'
                }
            }
        },
        methods: {
            
        },
    }
</script>
<style scoped>
    div{
        background-color: rgb(67, 233, 233);
    }
</style>