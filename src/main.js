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
initRichText();
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
}).$mount("#app");
