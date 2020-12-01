<template>
    <div>
       我是template
    </div>
</template>

<script>
    export default {
        name:'apple',
        props:[],
        data() {
            return {
                
            }
        },
        methods: {
            
        },
    }
</script>
    // scope:私有,不冲突
<style scoped>
    div{
        background-color: rgb(67, 233, 233);
    }
</style>