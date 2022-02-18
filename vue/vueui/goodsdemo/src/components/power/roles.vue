<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: 'home' }">
        首页
      </el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-button
        type="primary"
        @click="addRoles"
      >
        添加角色
      </el-button>
      <el-table
        ref="rolesUserForm"
        :data="rolesList"
        border
        stripe
      >
        <el-table-column type="expand">
          <template v-slot="dropDownRoles">
            <div>
              <el-row
                v-for="(item1, i1) in dropDownRoles.row.children"
                :key="item1.id"
                :class="['bdBottom', i1 == 0 ? 'bdTop' : '', 'vcenter']"
              >
                <!-- 一级权限列 -->
                <el-col :span="5">
                  <el-tag
                    closable
                    @close="closeTag(dropDownRoles.row, item1.id)"
                  >
                    {{ item1.authName }}
                  </el-tag>
                  <i class="el-icon-caret-right" />
                </el-col>
                <!-- 二级权限列 -->

                <el-col :span="19">
                  <el-row
                    v-for="(item2, i2) in item1.children"
                    :key="item2.id"
                    :class="[i2 !== 0 ? 'bdTop' : '', 'vcenter']"
                  >
                    <el-col :span="6">
                      <el-tag
                        closable
                        type="success"
                        @close="closeTag(dropDownRoles.row, item2.id)"
                      >
                        {{ item2.authName }}
                      </el-tag>
                      <i class="el-icon-caret-right" />
                    </el-col>
                    <el-col :span="18">
                      <el-tag
                        v-for="item3 in item2.children"
                        :key="item3.id"
                        closable
                        type="warning"
                        @close="closeTag(dropDownRoles.row, item3.id)"
                      >
                        {{ item3.authName }}
                      </el-tag>
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" />
        <el-table-column
          label="角色名称"
          prop="roleName"
        />
        <el-table-column
          label="角色描述"
          prop="roleDesc"
        />
        <el-table-column
          label="操作"
          width="400"
          prop="level"
        >
          <template v-slot="level">
            <el-tooltip
              class="item"
              effect="dark"
              :enterable="false"
              content="编辑"
              placement="top"
            >
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editRoles(level.row.id)"
              >
                编辑
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              :enterable="false"
              content="删除"
              placement="top"
            >
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteRoles(level.row.id)"
              >
                删除
              </el-button>
            </el-tooltip>

            <el-tooltip
              class="item"
              effect="dark"
              :enterable="false"
              content="分配权限"
              placement="top"
            >
              <el-button
                type="warning"
                icon="el-icon-setting"
                size="mini"
                @click="clickAssignPermissions(level.row)"
              >
                分配权限
              </el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 添加用户弹窗 -->
    <el-dialog
      title="添加角色"
      :visible.sync="addRolesVisible"
      width="50%"
      :before-close="removeAddVisible"
    >
      <span>
        <el-form
          ref="addUserRolesRef"
          :model="addRolesFrom"
          :rules="addUsersRules"
          label-width="80px"
        >
          <!-- <el-form-item label="ID">
            <el-input v-model="addRolesFrom.roleId" />
          </el-form-item> -->
          <el-form-item
            label="角色名称"
            prop="roleName"
          >
            <el-input v-model="addRolesFrom.roleName" />
          </el-form-item>
          <el-form-item
            label="角色描述"
            prop="roleDesc"
          >
            <el-input v-model="addRolesFrom.roleDesc" />
          </el-form-item>
        </el-form>
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          @click="removeAddVisible('addUserRolesRef')"
        >取 消</el-button>
        <el-button
          type="primary"
          @click="addUserRoles('addUserRolesRef')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑角色"
      :visible.sync="editRolesVisible"
      width="50%"
      :before-close="cancelEditVisible"
    >
      <span>
        <el-form
          ref="addUserRolesRef"
          :model="addRolesFrom"
          :rules="addUsersRules"
          label-width="80px"
        >
          <el-form-item
            label="角色名称"
            prop="roleName"
          >
            <el-input v-model="addRolesFrom.roleName" />
          </el-form-item>
          <el-form-item
            label="角色描述"
            prop="roleDesc"
          >
            <el-input v-model="addRolesFrom.roleDesc" />
          </el-form-item>
        </el-form>
      </span>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="cancelEditVisible">取 消</el-button>
        <el-button
          type="primary"
          @click="editUserRoles('addUserRolesRef')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="权限分配"
      :visible.sync="assignPermissionsVisible"
      :before-close="beforeCloseRoles"
      width="50%"
    >
      <span>
        <el-tree
          ref="everyRoleId"
          node-key="id"
          :default-checked-keys="keysRoles"
          default-expand-all
          show-checkbox
          :data="newRolesFrom"
          :props="treeRolesProps"
        />
      </span>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="assignPermissionsVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="assignPermissions('everyRoleId')"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolesList: [],
      //控制添加用户框显示隐藏
      addRolesVisible: false,
      editRolesVisible: false,
      //添加角色的表单数据
      addRolesFrom: {
        // roleId: 0,
        roleName: '',
        roleDesc: ''
      },
      //分配权限列表获取的最新数据
      newRolesFrom: [],

      treeRolesProps: {
        children: 'children',
        label: 'authName'
      },
      // 默认选中的权限
      keysRoles: [105],
      //控制权限分配显示隐藏
      assignPermissionsVisible: false,
      // 规则
      addUsersRules: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ]
      },
      //保存分配权限每次打开的id值
      1: 0
    }
  },
  created() {
    this.getrolesList()
  },
  methods: {
    //页面加载触发,并获取列表内容
    async getrolesList() {
      let { data: res } = await this.$axios.get('roles')
      if (res.meta.status !== 200) return
      this.$message.success('获取成功')
      this.rolesList = res.data
    },
    //添加角色
    addRoles() {
      this.addRolesVisible = true
    },
    //添加用户取消之前示提示
    removeAddVisible(ref) {
      this.$confirm('确认关闭？')
        .then(bool => {
          this.addRolesVisible = false
          this.$refs[ref].resetFields()
        })
        .catch(err => {})
    },
    // 编辑用户框 取消编辑提示
    cancelEditVisible(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.addRolesFrom={}
          this.editRolesVisible = false
          done()
        })
        .catch(_ => {})
    },

    addUserRoles(ref) {
      this.$refs[ref].validate(async (bool, a) => {
        if (bool !== true) return
        let { data: res } = await this.$axios.post('roles', this.addRolesFrom)
        if (res.meta.status !== 201)
          return this.$message.errot('创建用户失败！')
        this.$refs[ref].resetFields()
        this.addRolesVisible = false
        this.getrolesList()
      })
    },
    async deleteRoles(id) {
      let { data: res } = await this.$axios.delete(`/roles/${id}`)
      if (res.meta.status !== 200) return this.$message.errot('删除失败!')
      this.$message.success('删除成功')
      this.getrolesList()
    },
    //获取id,利用id编辑
    async editRoles(id) {
      let { data: res } = await this.$axios.get(`/roles/${id}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取失败!')
      this.editRolesVisible = true
      this.addRolesFrom = res.data
    },
    //确定添加
    editUserRoles(ref) {
      this.$refs[ref].validate(async bool => {
        if (bool !== true) return
        let {
          data: res
        } = await this.$axios.put(`/roles/${this.addRolesFrom.roleId}`, {
          roleName: this.addRolesFrom.roleName,
          roleDesc: this.addRolesFrom.roleDesc
        })
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('编辑失败!')
        this.$message.success('编辑成功!')
        this.addRolesFrom={}
        this.getrolesList()
        this.$refs[ref].resetFields()
        this.editRolesVisible = false
      })
    },

    //删除标签触发事件
    closeTag(roleId, id) {
      console.log(roleId.id)
      this.$confirm('确认删除吗？')
        .then(async y => {
          let { data: res } = await this.$axios.delete(
            `roles/${roleId.id}/rights/${id}`
          )
          if (res.meta.status !== 200)
            return this.$.message.error('删除权限失败!')
          roleId.children = res.data
        })
        .catch(err => {})
    },
    //分配权限按钮 显示默认选中按钮
    async clickAssignPermissions(id) {
      this.everyOpenRoleId = id.id
      this.assignPermissionsVisible = true
      let { data: res } = await this.$axios.get('rights/tree')
      if (res.meta.status != 200) return
      this.newRolesFrom = res.data
      // console.log(this.newRolesFrom)
      for (let i = 0; i < id.children.length; i++) {
        let a = id.children[i].children
        for (let j = 0; j < a.length; j++) {
          let b = a[j].children
          console.log(b)
          for (let k = 0; k < b.length; k++) {
            this.keysRoles.push(b[k].id)
          }
        }
      }
    },
    //权限分配页面关闭触发
    beforeCloseRoles() {
      this.keysRoles = []
      this.assignPermissionsVisible = false
    },
    //权限分配确定按钮
    async assignPermissions(ref) {
      let id = this.everyOpenRoleId
      let keys = [
        ...this.$refs[ref].getCheckedKeys(),
        ...this.$refs[ref].getHalfCheckedKeys()
      ]
      let { data: res } = await this.$axios.post(`roles/${id}/rights`, {
        rids: keys.join(',')
      })
      if(res.meta.status !==200) return this.$message.error('授权失败')
      this.$message.success('授权成功!')
      this.getrolesList()
      this.assignPermissionsVisible=false
    }
  }
}
</script>

<style scoped>
.bdBottom {
  border-bottom: 1px solid #eee;
}
.bdTop {
  border-top: 1px solid #eee;
}
.el-tag {
  margin: 7px;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
