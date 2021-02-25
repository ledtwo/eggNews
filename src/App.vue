<!--
 * @description: 
 * @Author: ljc
 * @Date: 2020-09-26 14:47:27
 * @LastEditors: ljc
 * @LastEditTime: 2020-10-27 14:06:01
-->
<template>
  <div id="app">
    <van-tabbar v-model="active">
      <van-tabbar-item to="/home" icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item to="/add" icon="plus">添加</van-tabbar-item>
      <van-tabbar-item to="/mine" icon="friends-o">我的</van-tabbar-item>
    </van-tabbar>
    <router-view></router-view>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

export default {
  name: "App",
  data() {
    return {
      active: 0,
    };
  },
  // 监听路由跳转。
  watch: {
    $route(newRoute, oldRoute) {
      this.active = this.$route.fullPath == "/add" ? 1 : this.$route.fullPath == "/mine"? 2:0;
      console.log("watch", newRoute, oldRoute);
    },
  },
  components: {
    HelloWorld,
  },
  created() {
    // this.active = this.$route.fullPath == "/home" || this.$route.fullPath == "/" ? 0 : 1;
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.van-swipe__indicator--active{
  background: gray;
}
</style>
