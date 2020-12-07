<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="open">新添角色</el-button>

    <el-table
      :data="form"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border>
      <el-table-column
        prop="id"
        label="角色ID"
        width="290px">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称"
        width="290px">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="updateTime"
        label="更新时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled="true">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        sortable>
      </el-table-column>
      <el-table-column
        prop="opertor"
        label="操作"
        width="150px">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">禁用
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增角色 -->
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="visible" width="500px" title="添加权限菜单">
      <el-form ref="roleForm" :inline="true" :model="roleForm" :rules="rules">
        <el-form-item label="角色名称" prop="name">
          <el-input v-model="roleForm.name" placeholder="请输入角色名称" style="width: 450px;"/>
        </el-form-item>
        <el-form-item label="状态" prop="path">
          <el-switch
            v-model="roleForm.status"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <el-form-item label="选择角色权限" prop="id">
          <tree-select
            v-model="roleForm.id"
            :options="menus"
            :load-options="loadMenus"
            style="width: 450px;"
            placeholder="选择角色权限"
            :multiple="true"
          />
          <el-form-item label="描述信息" prop="description">
            <el-input v-model="roleForm.description" placeholder="请输入描述信息" style="width: 450px;" type="textarea"
                      :autosize="{ minRows: 1, maxRows: 4}"/>
          </el-form-item>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button>取消</el-button>
        <el-button @click="addRole">确认</el-button>
      </div>
    </el-dialog>

    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.pageNum"
        :page-sizes="[10, 50, 100, 200]"
        :page-size="page.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.totalRows">
      </el-pagination>
    </div>
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
    created () {
      this.getRoleList()
    },
    data () {
      return {
        form: {},
        roleForm: {
          status: true
        },
        page: {
          pageNum: 0,
          pageSize: 10
        },
        visible: false,
        rules: {
          name: [
            {
              required: true,
              message: '请输入名称',
              trigger: 'blur'
            }
          ]
        },
        menus: [{
          id: 0,
          label: '权限目录',
          children: null,
        }],
      }
    },
    methods: {
      getRoleList () {
        request({
          url: '/role/getRoleList',
          method: 'POST',
          data: JSON.stringify(this.page)
        }).then(({ data: res }) => {
          if (res.code !== 200) {
            return this.$message.error(res.msg)
          }
          this.form = res.data.dataList
          this.page = res.data.page
        })
      },
      loadMenus ({ action, parentNode, callback }) {
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
      addRole () {
        console.log(JSON.stringify(this.roleForm))
        console.log(this.roleForm)
      },
      open () {
        this.visible = true
      },
      handleSizeChange (val) {
        this.page.pageSize = val
        this.getRoleList()
        console.log(`每页 ${val} 条`)
      },
      handleCurrentChange (val) {
        this.page.pageNum = val
        this.getRoleList()
        console.log(`当前页: ${val}`)
      }
    },
  }
</script>

<style>
</style>
