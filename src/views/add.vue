<template>
  <div class="article-add">
    <van-nav-bar title="添加文章" />
    <div class="needLogo" :style="{backgroundImage:'url('+logo+')'}">
      <van-uploader v-model="fileList" :after-read="afterRead" :max-count="1" />
    </div>
    <van-cell-group :border="false">
      <van-field :border="false" v-model="title" label="文章名称" placeholder="请输入文章名称" />
      <van-field v-model="desc" label="文章摘要" placeholder="请输入文章摘要" />
      <!-- <van-field v-model="content" label="文章内容" placeholder="请编辑文章内容" type="textarea" rows="6" maxlength="200" show-word-limit /> -->
    </van-cell-group>
    <vue-html5-editor :content="content" @change="updateData" :auto-height="true"></vue-html5-editor>

    <van-button type="info" @click="handleAdd" v-show="isBottom" class="handle-btn">确定</van-button>
  </div>
</template>

<script>
import { Uploader, Field, Toast } from "vant";
import moment from "moment";
export default {
  components: {
    [Uploader.name]: Uploader,
    [Field.name]: Field,
  },
  data() {
    return {
      fileList: [],
      title: "",
      desc: "",
      content: "",
      logo: "",
      isBottom: true,
      id: "",
    };
  },
  methods: {
    async handleEditImg() {
      if (this.$route.query.id) {
        this.id = this.$route.query.id;
        fetch(`/details/${this.id}`)
          .then((res) => res.json())
          .then((res) => {
            if (res.success) {
              let data = res.data;
              if (data.logo.startsWith("data")) {
                this.fileList.push({ content: data.logo });
              } else {
                this.fileList.push({ url: data.logo });
              }
              this.logo = data.logo;
              this.title = data.title;
              this.desc = data.desc;
              this.content = data.content;
            } else {
              Toast.fail(res.errMsg);
            }
          });
      }
    },
    updateData(e) {
      this.content = e;
      console.info(e);
    },
    afterRead(file) {
      console.log(file);
      this.logo = file.content;
    },
    handleAdd() {
      const that = this;
      if (!this.title) {
        Toast({
          message: "请输入文章标题",
          position: "bottom",
        });
        return;
      }
      if (!this.desc) {
        Toast({
          message: "请输入文章简介",
          position: "bottom",
        });
        return;
      }
      if (!this.content) {
        Toast({
          message: "请填写文章内容",
          position: "bottom",
        });
        return;
      }
      const data = {
        title: this.title,
        desc: this.desc,
        content: this.content,
        logo: this.logo,
        date: moment().format(),
      };
      let url = "/create";
      if (this.id) {
        url = "/update";
        data.id = parseInt(this.id);
      }
      fetch(url, {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.success) {
            if (this.id) {
              Toast.success("编辑成功！");
            } else {
              Toast.success("添加成功！");
            }
            setTimeout(() => {
              that.$router.push({
                path: "/home",
              });
            }, 1000);
          } else {
            Toast.fail(res.errMsg);
          }
        });
      console.log(data);
    },
  },
  mounted() {
    let _this = this;
    this.handleEditImg();
    window.onscroll = function() {
      //变量scrollTop是滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //变量windowHeight是可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //变量scrollHeight是滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        //到了这个就可以进行业务逻辑加载后台数据了
        _this.isBottom = true;
        console.log("到了底部");
      } else {
        _this.isBottom = true;
      }
    };
  },
};
</script>

<style scoped>
/* .article-add {
  margin-top: 60px;
} */
.needLogo{
  background: #adadad36;
  /* background: url('../assets/twoP.jpg') no-repeat center; */
  background-size:cover;
  box-shadow: 1px 2px 4px;
}
.vue-html5-editor {
  width: 90%;
  margin-left: 1.4em;
  padding-bottom: 80px;
  margin-bottom: 40px;
}
.van-cell-group {
  margin-bottom: 20px;
}
.van-uploader {
  margin-top: 60px;
  margin-bottom: 30px;
}
.handle-btn {
  margin-bottom: 60px;
  width: 85%;
}
</style>
