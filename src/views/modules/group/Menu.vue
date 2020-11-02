<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>组织管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单权限管理</el-breadcrumb-item>
    </el-breadcrumb>

    <el-table
      :data="tableData"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
      <el-table-column
        prop="menus"
        label="菜单名称">
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
        label="类型">
      </el-table-column>
      <el-table-column
        prop="parent"
        label="父级名称">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        sortable
      >
      </el-table-column>
      <el-table-column
        prop="resource"
        label="资源标识">
      </el-table-column>
      <el-table-column
        prop="type"
        label="类型">
      </el-table-column>
      <el-table-column
        prop="createTime"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column
        prop="opertor"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: []
      }
    },
    methods: {
    },
  }
</script>

<style>

</style>
