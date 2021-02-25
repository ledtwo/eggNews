<!--
 * @description: 
 * @Author: ljc
 * @Date: 2020-09-26 15:52:14
 * @LastEditors: ljc
 * @LastEditTime: 2020-10-31 21:31:03
-->
<template>
  <div id="details">
    <van-nav-bar title="我的信息" />
    <van-row type="flex" justify="center" style="margin-top:5rem">
      <van-image round width="8rem" height="8rem" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </van-row>
    <van-cell-group style="margin-top:1rem" :border="false">
      <van-cell :value="userInfo.name" value-class="userRightAlign" :border="false">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="user-title">
            <van-icon style="vertical-align:middle" name="friends" size="1.3rem" />
            <span class="custom-title"> 昵&nbsp;称</span>
          </div>
        </template>
      </van-cell>
      <van-cell :value="userInfo.username" value-class="userRightAlign" :border="false">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="user-title">
            <van-icon style="vertical-align:middle" name="label" size="1.3rem" />
            <span class="custom-title"> 账&nbsp;号</span>
          </div>
        </template>
      </van-cell>
      <van-cell :value="userInfo.password" value-class="userRightAlign" :border="false">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="user-title">
            <van-icon style="vertical-align:middle" name="eye" size="1.3rem" />
            <span class="custom-title"> 密&nbsp;码</span>
          </div>
        </template>
      </van-cell>
      <van-cell value-class="userRightAlign" :border="false">
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <div class="user-title">
            <van-button size="small" type="info">修改密码</van-button>
          </div>
        </template>
        <template>
          <div>
            <van-button size="small" type="danger" plain @click="loginOut">退出登录</van-button>
          </div>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { ImagePreview } from "vant";
export default {
  data() {
    return {
      userInfo: {},
    };
  },
  methods: {
    loginOut(){
      fetch('/api/loginOut').then((res)=>{
         if (res.success) {
            this.$toast(res.msg);
            this.$router.push('/login')
          } else {
            this.$toast("网络错误！");
          }
      })
    },
    showImage(logo) {
      ImagePreview(logo);
    },
  },
  created() {
    this.userInfo = JSON.parse(window.sessionStorage.getItem("userInfo"));
    // this.$set(this.userInfo,userInfo)
  },
};
</script>

<style scoped>
.userRightAlign {
  text-align: left;
}
.user-title {
  margin-left: 4rem;
}
.van-col {
  text-align: center;
}
</style>
