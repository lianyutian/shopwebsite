<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="open">添加</el-button>

    <el-table
      :data="permissions"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      :is>
      <el-table-column
        prop="name"
        label="菜单名称"
        width="290px"
      >
      </el-table-column>
      <el-table-column
        prop="url"
        label="url">
      </el-table-column>
      <el-table-column
        prop="method"
        label="请求方式">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型"
        :formatter="showType">
      </el-table-column>
      <el-table-column
        prop="orderNum"
        label="排序"
        sortable>
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        :formatter="showStatus">
      </el-table-column>
      <el-table-column
        prop="opertor"
        label="操作"
        width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加表单权限 -->
    <el-dialog append-to-body :close-on-click-modal="false"  :visible.sync="visible" width="500px" title="添加权限菜单">
      <el-form ref="permissionForm" :inline="true" :model="form" :rules="rules"  >
        <el-form-item label="菜单类型" prop="type" >
          <el-radio-group v-model="form.type" size="mini">
            <el-radio-button label="1">目录</el-radio-button>
            <el-radio-button label="2">菜单</el-radio-button>
            <el-radio-button label="3">按钮</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.type.toString() !== '3'" label="菜单名称" prop="name">
          <el-input v-model="form.name"  placeholder="请输入菜单名称" style="width: 450px;" />
        </el-form-item>
        <el-form-item v-if="form.type.toString() === '3'" label="按钮名称" prop="name">
          <el-input v-model="form.name" placeholder="按钮名称" style="width: 450px;"/>
        </el-form-item>
        <el-form-item v-show="form.type.toString() !== '0'" label="所属菜单" prop="pid">
          <tree-select
            v-model="form.pid"
            :options="menus"
            :load-options="loadMenus"
            style="width: 450px;"
            placeholder="选择所属菜单"/>
        </el-form-item>
        <el-form-item v-if="form.type.toString() !== '2'" label="路由地址" prop="url">
          <el-input v-model="form.url" placeholder="路由地址" style="width: 450px;" />
        </el-form-item>
        <el-form-item label="菜单排序" prop="orderNum">
          <el-input v-model.number="form.orderNum" :min="0" :max="999" style="width: 280px;"/>
        </el-form-item>
        <el-form-item label="状态" prop="path">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button >取消</el-button>
        <el-button @click="addPermission">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import { request } from '@/utils/httpRequest'
  // import the component
  import TreeSelect from '@riophae/vue-treeselect'
  // import the styles
  import '@riophae/vue-treeselect/dist/vue-treeselect.css'
  import { LOAD_CHILDREN_OPTIONS } from '@riophae/vue-treeselect'

  export default {
    components: {
      TreeSelect
    },
    created() {
      this.getPermissionTree()
    },
    data() {
      return {
        permissions: [],
        visible: false,
        form: {
          name: '',
          type: 1,
          orderNum: 1,
          status: true,
          pid: '2'
        },
        rules: {
          name: [
            { required: true, message: '请输入名称', trigger: 'blur' }
          ],
          url: [
            { required: true, message: '请输入地址', trigger: 'blur' }
          ]
        },
        menus: [{
          id: 0,
          label: '顶级目录',
          children: null,
        }],
      }
    },
    methods: {
      getPermissionTree() {
        request({
          url: '/permission/getAllPermission',
          method: 'get'
        }).then(({ data }) => {
          if (data.code !== 200) {
            return this.$message.error(data.msg)
          }
          this.permissions = data.data
        })
      },
      showType(row) {
        if (row.type === 1) {
          return '目录'
        } else if (row.type == 2) {
          return '菜单'
        } else {
          return '按钮'
        }
      },
      showStatus(row) {
        if (row.status === 1) {
          return '正常'
        } else {
          return '禁用'
        }
      },
      open() {
        this.visible = true;
      },
      loadMenus({ action, parentNode, callback }) {
        if (action === LOAD_CHILDREN_OPTIONS) {
          request({
            url: 'permission/getSelectMenuTree',
            method: 'get'
          }).then(({ data: res }) => {
            parentNode.children = res.data
            setTimeout(() => {
              callback()
            }, 100)
          })
        }
      },
      addPermission() {
        alert('哈哈')
        console.log(this.form)
        this.$refs.permissionForm.validate((valid) => {
          console.log(this.form)
          if (valid) {
            request({
              url: 'permission/addPermission',
              method: 'post',
              data: JSON.stringify(this.form)
            }).then(({ data }) => {
              this.visible = false
              if (data.code !== 200) {
                return this.$message.error(data.msg)
              }
            })
          }
        })
        this.visible = false
      }
    },
  }
</script>

<style>

</style>
