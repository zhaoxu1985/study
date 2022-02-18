// Vue.config.silent = true

Vue.component('mode', {
    name: 'mode',
    mode
    template: `
        <div>
            我是子组件 v-model是:{{value}}<br/>
            <button  @click="click">更改prop:value</button>
        </div>`,
    props: ['value'],
    created() {},
    methods: {
        click() {
            // this.$emit('input', '替换了')
            // this.value = 1
        }
    }
})
const vm = new Vue({
    el: '#app',
    data: {
        value: 111
    },
    template: `
    <div>
        <div>
            显示
            <mode v-model="value" />
        </div>
   
    </div>
       
    `,

    created() {
        console.log('111')
    }
})