<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-button type="primary" icon="el-icon-circle-plus-outline" plain @click="addPermission">添加</el-button>
    <el-form>biaodan</el-form>

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
  </div>
</template>

<script>
  import { request } from '@/utils/httpRequest'

  export default {
    created() {
      this.getPermissionTree()
    },
    data() {
      return {
        permissions: [],
        isDisplay: true
      }
    },
    methods: {
      getPermissionTree() {
        request({
          url: '/permission/getPermissionTree'
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
      addPermission() {
        this.$router.push('/index/addPermission')
      }
    },
  }
</script>

<style>

</style>
