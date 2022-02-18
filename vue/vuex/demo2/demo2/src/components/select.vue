<template>
  <div id="app">
    <div class="box">
      <input
        type="text"
        :value="addInput"
        @input="handleInputChange($event.target.value)"
        class="el-input el-input__inner"
      />

      <el-button
        class="addButton"
        @click="addListValue(addInput)"
        type="primary"
        size="medium  "
        >添加</el-button
      >

      <el-tabs :value="activeName" @tab-click="handleClick">
        <!-- 第一块 -->
        <el-tab-pane label="全部" name="first">
          <el-table
            max-height="300"
             style="width: 200"
            ref="multipleTable"
            :data="obj"
            tooltip-effect="dark"
            @selection-change="handleSelectionChange"
          >
          <!-- 复选框 《《-->
            <el-table-column label="select" width="300">
              <template slot-scope="scope"> 
                <!-- `checked` 为 true 或 false -->
                    <el-checkbox v-model= "scope.row.isTrue" @change="thatSelectChange($event,scope.row)">是否完成</el-checkbox>
              </template>
          
            </el-table-column>

          <!-- 》》框结束 -->
            <el-table-column label="id" width="">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>

            <el-table-column label="事项名称" width="200">
              <template slot-scope="scope">{{ scope.row.value }}</template>
            </el-table-column>
            <el-table-column label="事项名称" width="100">
              <template slot-scope="scope"
                ><el-button
                  type="danger"
                  size="mini"
                  @click="deleted(scope.row.id)"
                  >删除</el-button
                ></template
              >
            </el-table-column>
          </el-table>
        </el-tab-pane>

        <!-- 第二块 -->
        <el-tab-pane label="已完成" name="second">
          <el-table
            max-height="300"
            ref="multipleTable"
            :data="already"
            tooltip-effect="dark"
            style="width: 600px"
            @selection-change="handleSelectionChange($event)"
          >
            <el-table-column type="selection" width="50"></el-table-column>

            <el-table-column label="id" width="">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>

            <el-table-column label="事项名称" width="100">
                <template slot-scope="scope">
                    {{scope.row.value}}
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <!-- 第三块 -->
        <el-tab-pane label="未完成" name="third" >
          <el-table
            max-height="300"
            ref="multipleTable"
            :data="isFalse"
            tooltip-effect="dark"
            style="width: 600px"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="50"></el-table-column>

            <el-table-column label="id" width="">
              <template slot-scope="scope">{{ scope.row.id }}</template>
            </el-table-column>

            <el-table-column label="事项名称" width="100">
                <template slot-scope="scope">
                    {{scope.row.value}}
                </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapMutations([
      "handleInputChange",
      "handleClick",
      "handleSelectionChange",
      "deleted",
      "addListValue",
    ]),
    ...mapActions(["AsyncGetList"]),
    thatSelectChange(isTrue,row){
      // console.log(isTrue,row);
      this.$store.commit('selectChange',[isTrue,row])
    }
  },
  computed: {
    ...mapState(["obj", "activeName", "addInput", "multipleSelection"]),
    ...mapGetters(['already','isFalse'])
  },
  created() {
    this.AsyncGetList();
    console.log(this.count);
  },
};
</script>

<style scoped>
.box {
  width: 700px;
  height: 500px;
}
.el-input {
  width: 70%;
}
.addButton {
  margin-left: 10px;
}
</style>
