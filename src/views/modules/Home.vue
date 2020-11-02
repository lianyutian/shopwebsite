<template>
  <el-container class="home-container">
    <!-- 头部 -->
    <el-header>
      <div>
        <img>
        <span>电商后台管理系统</span>
      </div>
      <el-button type="info" @click="logOut">退出</el-button>
    </el-header>
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="collapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409fff"
          :unique-opened="true"
          :collapse="collapse"
          :collapse-transition="false"
          :router="true"
          :default-active="$route.path"
        >
          <!-- 一级菜单 -->
          <el-submenu :index="item.id" v-for="item in menuList" :key="item.id">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.name}}</span>
            </template>
            <!-- 二级菜单 -->
            <el-menu-item-group>
              <el-menu-item :index="subItem.url" v-for="subItem in item.children" :key="subItem.id">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{subItem.name}}</span>
                </template>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  import { request } from '../../utils/httpRequest'

  export default {
    created() {
      this.getMenuList()
    },
    data () {
      return {
        isCollapse: true,
        menuList: [],
        collapse: false
      }
    },
    methods: {
      logOut() {
        // 清空session
        window.sessionStorage.clear()
        // 重定向到登录界面
        this.$router.push('/login')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      toggleCollapse() {
        this.collapse = !this.collapse
      },
      // 获取所有菜单
      getMenuList() {
        request({
          url: 'menu/getMenuList',
          method: 'get'
        }).then(({ data }) => {
          if (data.code !== 200) {
            this.$message.error(data.msg)
            // 跳转到登录界面
            this.$router.push('/login')
          }
          this.menuList = data.data
          console.log(this.dataList)
        })
      },
    }
  }
</script>

<style>
  .home-container {
    height: 100%;
  }

  .el-header {
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    align-items: center;
    color: #fff;
    font-size: 20px;
    > div {
      display: flex;
      align-items: center;
      span {
        margin-left: 15px;
      }
    }
  }
  .el-aside {
    background-color: #545c64;
  }

  .el-main {
    background-color: #ffffff;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }

  .toggle-button {
    background-color: #4a5064;
    font-size: 10px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.2em;
    cursor: pointer;
  }

</style>
