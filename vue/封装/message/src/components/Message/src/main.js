import main from "./index.vue";
import Vue from "vue";
const Message = Vue.extend(main);

let instances = [];
let id = 0;

const message = function (options) {
  id++;
  options.id = id;
  const instanceMessage = new Message({
    data: options
  });
  instanceMessage.$slots.default = [options.vnode];
  instances.push(instanceMessage);
  instanceMessage.$mount();
  let dom = instanceMessage.$el;
  dom.style.top = "10px";
  if (instances.length > 1) {
    let len = instances.length;
    let top = 10 * len;
    for (let i = 0; i < len; i++) {
      top += instances[i].$el.offsetHeight;
    }
    dom.style.top = top + "px";
  }
  instanceMessage.onClose = function (id) {
    let index = -1;
    const removeMessage = instances.filter((item, i) => {
      if (item.id === id) {
        index = i;
        instances.splice(i, 1);

        return item;
      }
    })[0];
    let howSub = removeMessage.$el.offsetHeight;
    let len = instances.slice(0, index).length;
    instances.slice(index).forEach((item) => {
      item.$el.style.top = item.$el.offsetTop - howSub - 10 + "px";
    });
    document.body.removeChild(removeMessage.$el);
  };
  document.body.append(instanceMessage.$el);
  // instanceMessage.close();
};
export default message;
