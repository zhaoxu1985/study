

<script>
import {ref,createElementBlock as h, withModifiers, defineComponent} from 'vue'
export default defineComponent({
  setup() {
    const count = ref(0);

    const inc = () => {
      count.value++;
    };


  },
  render(h){
    return <div>
      aaa
    </div>
  }
});
</script>

<style></style>
