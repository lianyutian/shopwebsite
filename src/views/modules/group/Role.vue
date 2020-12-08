<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 角色搜索 -->
    <div>
      <el-form
        ref="searchFormRef"
        :model="searchForm"
        inline="true"
        size="mini">
        <el-form-item prop="roleId">
          <el-input v-model="searchForm.roleId" placeholder="请输入角色ID"></el-input>
        </el-form-item>
        <el-form-item prop="roleName">
          <el-input v-model="searchForm.roleName" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item prop="createTime">
          <el-date-picker
            style="width: 150px;"
            v-model="searchForm.createTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="创建日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="status">
          <el-select v-model="searchForm.status" placeholder="状态" style="width: 70px">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" icon="el-icon-search" @click="searchRoles">搜索</el-button>
          <el-button type="primary" icon="el-icon-refresh-left" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="open" size="mini">新添角色</el-button>
    </div>


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
    <el-dialog append-to-body :close-on-click-modal="false" :visible.sync="visible" width="500px" title="新增角色">
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
        <el-form-item label="选择角色权限" prop="permissionList">
          <tree-select
            v-model="roleForm.permissions"
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
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="addRole">确认</el-button>
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
        searchForm: {
          status: null
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
        options: [{
          value: true,
          label: '启用'
        }, {
          value: false,
          label: '禁用'
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
        request({
          url: '/role/addRole',
          method: 'POST',
          data: JSON.stringify(this.roleForm)
        }).then(({ data: res }) => {
          data: console.log(JSON.stringify(this.roleForm))
          if (res.code !== 200) {
            return this.$message.error(res.msg)
          }
          this.visible = false
          this.getRoleList()
        })
      },
      searchRoles () {
        request({
          url: '/role/getRoleList',
          method: 'POST',
          data: JSON.stringify(this.searchForm)
        }).then(({ data: res }) => {
          if (res.code !== 200) {
            return this.$message.error(res.msg)
          }
          this.form = res.data.dataList
        })
        console.log(JSON.stringify())
      },
      // 重置账号密码
      reset () {
        this.$refs.searchFormRef.resetFields()
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
