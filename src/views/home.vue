<template>
  <div class="home">
    <van-pull-refresh v-model="isLoading" :head-height="80" @refresh="onRefresh">
      <!-- 下拉提示，通过 scale 实现一个缩放效果 -->
      <template #pulling="props">
        <img class="doge" src="https://img.yzcdn.cn/vant/doge.png" :style="{ transform: `scale(${props.distance / 80})` }" />
      </template>
      <!-- 释放提示 -->
      <template #loosing>
        <img class="doge" src="https://img.yzcdn.cn/vant/doge.png" />
      </template>
      <!-- 加载提示 -->
      <template #loading>
        <img class="doge" src="https://img.yzcdn.cn/vant/doge-fire.jpg" />
      </template>
      <van-nav-bar title="首页" />
      <van-notice-bar
        color="rgb(59 66 74 / 78%)"
        background="rgb(236 249 255 / 33%)"
        left-icon="volume-o"
        text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。请诸君不要上传大图片"
      />
      <van-swipe class="my-swipe" :autoplay="2000" style="height: 200px;" vertical>
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img v-lazy="image" width="100%" height="100%" />
        </van-swipe-item>
      </van-swipe>
      <van-divider :style="{ color: '#2c3e50a3', borderColor: 'rgb(237 106 12 / 50%)', padding: '0 16px' }">
        所有文章
      </van-divider>
      <van-swipe-cell v-for="item in list" :key="item.id">
        <van-cell :border="false">
          <template #title>
            <div class="box-img">
              <van-image width="120" height="100" :src="item.logo" />
            </div>
          </template>
          <div class="box-right" @click="openArcPage(item.id)">
            <p class="arc-title">{{ item.title }}</p>
            <p class="arc-desc">{{ item.desc }}</p>
          </div>
        </van-cell>
        <template #right>
          <van-button square type="primary" icon="edit" text="编辑" class="edit-button" @click="handleUpdate(item.id)" />
          <van-button square text="删除" type="danger" icon="close" @click="handleDel(item.id)" class="delete-button" />
        </template>
      </van-swipe-cell>
      <van-skeleton title avatar :row="3" :loading="loading"/>
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from "vant";

export default {
  data() {
    return {
      isLoading: false,
      loading: false,
      finished: false,
      images: [
        require('@/assets/bg1.jpg'),
        require('@/assets/bg2.jpg'),
        require('@/assets/bg3.jpg')
      ],
      list: [],
    };
  },
  methods: {
    async onRefresh() {
      // Toast("刷新成功");
      await this.onLoad();
      Toast("刷新成功");
      this.isLoading = false;
    },
    async onLoad() {
      // 异步更新数据
      fetch("/lists")
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            this.loading = false;
            this.finished = true;
            this.list = res.data;
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    openArcPage(id) {
      this.$router.push({
        path: "/details",
        query: {
          id: id,
        },
      });
    },
    handleDel(id) {
      fetch(`/delete/${id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            Toast.success("删除文章成功！");
            this.onLoad();
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    handleUpdate(id) {
      this.$router.push({
        path: "/add",
        query: {
          id: id,
        },
      });
    },
  },
};
</script>

<style scoped>
.home {
  padding-bottom: 80px;
}
.box-right {
  text-align: left;
  font-size: 12px;
  padding-top: 5px;
  padding-right: 2em;
}
.box-right p {
  margin: 0;
  line-height: 18px;
}
.box-right > .arc-title {
  font-weight: bold;
  font-size: 12px;
  color: black;
}
/* .box-right > .arc-desc{
  margin-top: 5px;
} */
.box-right .arc-desc {
  margin-top: 5px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  /* background-color: #39a9ed; */
}
.delete-button,
.edit-button {
  height: 100%;
}
.doge {
  width: 140px;
  height: 72px;
  margin-top: 8px;
  border-radius: 4px;
}
</style>
