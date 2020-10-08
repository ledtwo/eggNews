<template>
  <div id="details">
    <van-nav-bar title="详情" left-text="返回" left-arrow @click-left="onClickLeft" />
    <h1 class="arc-title">{{ list.title }}</h1>
    <div class="arc-desc">
      <p>{{ list.desc }}</p>
    </div>
    <van-image @click.stop="showImage([list.logo])" width="120" height="100" :src="list.logo" />
    <div class="arc-content" v-html="list.content"></div>
    <p class="arc-date">{{ list.date | dateformat }}</p>
  </div>
</template>

<script>
import { ImagePreview } from 'vant';
export default {
  data() {
    return {
      list: {},
    };
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    showImage(logo) {
      ImagePreview(logo);
    },
  },
  created() {
    let id = this.$route.query.id;
    if (id) {
      // 异步更新数据
      fetch(`/details/${id}`)
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            this.list = res.data;
          } else {
            Toast.fail(res.errMsg);
          }
        });
    } else {
      Toast.fail("文章信息不存在！");
    }
  },
};
</script>

<style scoped>
#details {
  padding-bottom: 80px;
}
.arc-title {
  font-size: 1.2em;
}
.arc-desc {
  text-align: left;
  font-size: 0.88em;
  font-weight: lighter;
  padding: 0 2em;
  background: #80808047;
}
.arc-content {
  padding: 1em 2em;
  font-size: 0.9em;
  text-align: left;
  text-indent: 2em;
}
.arc-date {
  text-align: right;
  padding-right: 2em;
}
</style>
