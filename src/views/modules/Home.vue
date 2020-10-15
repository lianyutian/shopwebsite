<template>
  <div>
      <h2>Home组件</h2>
      <button @click="logOut">退出</button>
  </div>
</template>

<script>
export default {
  methods: {
    logOut () {
      // 清空session
      window.sessionStorage.clear()
      // 重定向到登录界面
      this.$router.push('/login')
    }
  }
}
</script>

<style>

</style>