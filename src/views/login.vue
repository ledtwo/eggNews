<template>
  <div id="login">
    <div class="loginBox" @click="changeImage(3)">
      <div class="auth-form">
        <div class="panfish">
          <img :src="imageURL" alt="" />
        </div>
        <!-- 关闭按钮 -->
        <van-icon name="close" class="closeButton" />
        <van-tabs v-model="active" swipeable>
          <van-tab :title="login.title">
            <!-- 账号密码登录 -->
            <van-cell-group>
              <van-field
                v-model="login_userName"
                required
                clearable
                :label="login.phoneNumber"
                maxlength="11"
                @click.stop="changeImage(0)"
                :error-message="phoneNumberRight ? '' : login.phoneNumberNotCorrect"
                :placeholder="login.phoneInput"
              />
              <van-field
                v-model="login_password"
                type="password"
                :label="login.pass"
                :placeholder="login.passTip"
                required
                @click.stop="changeImage(1)"
                autocomplete
              />
              <van-field
                v-model="imgCaptcha"
                center
                clearable
                maxlength="4"
                :placeholder="login.varify"
              >
                <img
                  class="verificationImage"
                  src="http://demo.itlike.com/web/xlmc/api/captcha"
                  alt="captcha"
                  @click.prevent="getCaptcha"
                  ref="imgCaptcha"
                  slot="button"
                />
              </van-field>
              <!-- 账号快捷登录 -->
            </van-cell-group>
            <van-button type="info" size="large" style="margin-top:1rem" @click="toLogin">{{
              login.login
            }}</van-button>
          </van-tab>
          <!-- 注册 -->
          <van-tab :title="login.resgin">
            <van-cell-group>
              <van-field
                v-model="register_name"
                required
                clearable
                label="昵称"
                maxlength="11"
                @click.stop="changeImage(0)"
                :error-message="phoneNumberRight ? '' : login.phoneNumberNotCorrect"
                placeholder="请输入昵称"
              />
              <van-field
                v-model="register_userName"
                clearable
                maxlength="11"
                :label="login.phoneNumber"
                :placeholder="login.phoneInput"
                @click.stop="changeImage(0)"
                required
              />
              <van-field
                v-model="register_pwd"
                type="password"
                :label="login.pass"
                :placeholder="login.passTip2"
                @click.stop="changeImage(1)"
                required
              />
              <van-field
                v-model="register_email"
                :label="login.email"
                placeholder="请输入邮箱"
                @click.stop="changeImage(0)"
                required
              />
            </van-cell-group>
            <van-button type="info" size="large" style="margin-top:1rem" @click="register">{{
              login.resgin
            }}</van-button>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
// 引入Vant的组件
import { Toast, Dialog } from "vant";

export default {
  data() {
    return {
      countDown: 0, // 倒计时
      active: 0,
      login_name: "",
      login_userName: "", // 用户名
      login_password: "", // 用户密码
      login_email: "", // 账号码

      register_name: "", // 注册昵称
      register_userName: "", // 注册用户名
      register_pwd: "", // 注册密码
      register_email: "", // 注册邮箱

      imgCaptcha: "", // 图片验证码
      smsCaptcha: "", // 短信验证码
      imageURL: require("../assets/login/normal.png"),
      smsCaptchaResult: null,
      userInfo: null,
      phoneNumberRight: true,
      login: {
        title: "登录",
        phoneNumber: "账号",
        phoneNumberNotCorrect: "账号格式不正确",
        phoneNumberNotEmpty: "账号不能为空",
        passNumberNotEmpty: "密码不能为空",
        phoneInput: "请输入账号",
        pass: "密码",
        email: "邮箱",
        passTip: "请输入密码",
        varify: "请输入验证码",
        otherMethods: "其他登录方式",
        login: "登录",
        resgin: "注册",
        passTip2: "输入密码(不少于6位)",
        sendVerify: "发送验证码",
        hasSend: "已发送",
        phoneVerify: "账号密码登录",
        smsMessage: "短信验证码登录",
        switchLoginMsg: "账号密码登录",
        messageSuccess: "验证码获取成功,请在输入框输入",
        pleaseInputCorrectPhoneNumber: "请输入正确的账号",
        pleaseInputCorrectVerifyumber: "请输入正确的验证码",
        otherWechat: "微信登录-暂未完成",
        otherQQ: "QQ登录-暂未完成",
        message: "验证码:",
      },
    };
  },
  computed: {},
  methods: {
    async checkRules() {},
    async toLogin() {
      let data = {
        username: this.login_userName,
        password: this.login_password,
      };
      fetch("/api/login", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
           if (res.success) {
            // Toast.success(res.msg);
            Toast.success("登陆成功");
            window.sessionStorage.setItem('userInfo',JSON.stringify(res.data))
            this.$router.push('/mine')
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    async register() {
      let data = {
        name: this.register_name,
        username: this.register_userName,
        password: this.register_pwd,
        email: this.register_email,
        usertype: 1,
      };
      fetch("api/register", {
        method: "post",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          if (res.success) {
            Toast.success("注册成功！请登录！");
            this.active = 0;
          } else {
            Toast.fail(res.errMsg);
          }
        });
    },
    // 2.切换萌猫图片
    changeImage(index) {
      if (index == 0) {
        this.imageURL = require("../assets/login/greeting.png");
      } else if (index == 1) {
        this.imageURL = require("../assets/login/blindfold.png");
      } else {
        this.imageURL = require("../assets/login/normal.png");
      }
    },
  },
};
</script>
<style lang="less" scoped>
#login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("../assets/login/back.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-attachment: fixed;
  .loginBox {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    opacity: 0.95;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 500;
    .auth-form {
      position: relative;
      padding: 2rem;
      width: 26.5rem;
      max-width: 90%;
      font-size: 1.167rem;
      background-color: #fff;
      border-radius: 8px;
      box-sizing: border-box;
    }
    img {
      position: absolute;
      top: 1rem;
      left: 50%;
      width: 4rem;
      transform: translate(-50%, -70%);
      z-index: 1;
      @media screen and (max-width: 320px) {
        top: 0.5rem;
        transform: translate(-50%, -40%);
        width: 5rem;
      }
    }
    .closeButton {
      position: absolute;
      right: 1rem;
      top: 0.4rem;
    }
    .verificationImage {
      position: absolute;
      right: 0;
      width: 8rem;
      height: 3rem;
      margin-left: 3rem;
    }
    .switchLogin {
      margin-top: 1rem;
      font-size: 0.78rem;
    }
  }
}
.title {
  padding: 0.5rem;
  font-size: 0.5rem;
  color: grey;
}
.agreement {
  // margin-top: 1.667rem;
  line-height: 1rem;
  color: #767676;
  font-size: 0.867rem;
  .agreement-box {
    color: blue;
  }
}
</style>
