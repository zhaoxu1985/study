<template>
    <div>
        <div ref="abs" class="a" v-for="(item,i) in arr" :key="i">
            {{item}}
        </div>

        <el-button type="primary" @click="getRef('abs')"> aaaaa</el-button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            arr:[1,2,3,4,5,6,6,7,7,784,654]
        }
    },
    methods: {
        getRef(ref){
            console.log(this.$refs[ref]);
        }   
    },
}
</script>

<style scoped>
    .a{
        width: 300px;
        height: 30px;
        background-color: aqua;
        margin: 10px;
    }
    .el-button{
        margin:0px;
        margin-left:50px;
    }
</style>