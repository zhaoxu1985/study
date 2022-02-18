import windowForm from '@/components/my-window';
import Vue from 'vue';
export default function install(vue, { ...args }) {
  vue.mixin({
    methods: {
      async form({ ...args }) {
        const el = document.createElement('div');
        el.setAttribute('id', `[form-key${args.key}]`);
        // args.component().then((res) => {
        const window = Vue.extend(windowForm);
        const component = await args.component();
        console.log(component)
        const ComponentInstance = Vue.extend(component.default);
        console.log(new ComponentInstance({
          
        }));
        const comp = new Vue({
          el: el,
          data() {
            return {
              isShow: true,
            };
          },
          render(h) {
            console.log('render触发')
            return h(window, {
              scopedSlots: {
                default: (props) => h(component.default,{
                  props:{
                    // key:'传入的key'
                  }
                }),
              },
            });
          },
        });
        document.body.appendChild(comp.$el);
        // });
      },
    },
  });
}
