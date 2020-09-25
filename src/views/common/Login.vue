<template>
  <div class="login_container">
    <h2 class="login_title">商城后台管理系统</h2>
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="@/assets/logo.png" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="userName">
          <el-input
            v-model="loginForm.userName"
            placeholder="请输入账号"
            prefix-icon="iconfont icon-user"
          >
          </el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="passWord">
          <el-input
            v-model="loginForm.passWord"
            placeholder="请输入密码"
            prefix-icon="iconfont icon-3702mima"
            show-password
          >
          </el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="loginForm">登录</el-button>
          <el-button type="info" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from "@/network/login"

export default {
  data() {
    return {
      // 登录表单数据绑定对象
      loginForm: {
        userName: "",
        passWord: ""
      },
      loginRules: {
        userName: [
          { required: true, message: "帐号不能为空", trigger: "blur" }
        ],
        passWord: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    }
  },
  methods: {
    // 登录
    loginForm() {
      // 表单预验证
      this.$refs.loginFormRef.validate((valid) => {
        if (valid) {
          // 登录
          login(this.loginForm).then(res => {
            console.log(res);
          })
        }
      })
    },
    // 重置账号密码
    reset(loginForm) {
      this.$refs.loginFormRef.resetFields();
    }
  }
}
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}

.login_title {
  position: absolute;
  left: 50%;
  top: 15%;
  transform: translate(-50%, -50%);
  font-size: 500%;
  color: #eee;
  letter-spacing: 10px;
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>