/*
 * @description:
 * @Author: ljc
 * @Date: 2020-09-26 14:47:27
 * @LastEditors: ljc
 * @LastEditTime: 2020-10-31 16:32:03
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { Image as VanImage } from "vant";
import initRichText from "./common/initHtmlEditor.js";
import {
  Button,
  Tabbar,
  TabbarItem,
  Cell,
  CellGroup,
  List,
  Toast,
  NavBar,
  NoticeBar,
  Swipe,
  SwipeItem,
  Lazyload,
  Divider,
  SwipeCell,
  PullRefresh,
  Skeleton,
  Col,
  Row,
  Tag,
  Icon,
  Tab,
  Tabs,
  Field,
} from "vant";
import moment from "moment";
import "font-awesome/css/font-awesome.min.css";
Vue.filter("dateformat", function(dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern);
});
Vue.use(router);
Vue.use(Button);
Vue.use(Tabbar);
Vue.use(TabbarItem);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(List);
Vue.use(VanImage);
Vue.use(Toast);
Vue.use(NavBar);
Vue.use(NoticeBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload);
Vue.use(Divider);
Vue.use(SwipeCell);
Vue.use(PullRefresh);
Vue.use(Skeleton);
Vue.use(Col);
Vue.use(Row);
Vue.use(Tag);
Vue.use(Icon);
Vue.use(Tab), Vue.use(Tabs), Vue.use(Field);
initRichText();
Vue.config.productionTip = false;

const originFetch = fetch;
Object.defineProperty(window, "fetch", {
  configurable: true,
  enumerable: true,
  // writable: true,
  get() {
    return (url, options) => {
      return (
        originFetch(url, {
          ...options,
          ...{
            headers: {
              "Content-Type": "application/json;charset=UTF-8",
              Accept: "application/json",
              token: localStorage.getItem("token"),
              //这里统一加token 实现请求拦截
            },
            // ...options.headers,
          },
        })
          .then((checkStatus) => {
            let cacheBody = checkStatus.json();
            return cacheBody;
          })
          // checkStatus 这里可以做返回错误处理，实现返回拦截
          .then((response) => {
            if (response.status == 401) {
              setTimeout(()=>{
                rootInstance.$router.push("/login");
              },1000)
            }
            return response;
          })
      );
    };
  },
});

let rootInstance = new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
