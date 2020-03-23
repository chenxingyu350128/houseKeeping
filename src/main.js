import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import http from "./http";
import dateTimeFormat from './plugins/getDateTimeStr'
import _ from 'lodash'
// import AMapJS from "amap-js";
import "@mdi/font/css/materialdesignicons.css";
import VueAMap from "vue-amap";
import { Picker, DatetimePicker, List, IndexBar, IndexAnchor, Cell, PasswordInput, NumberKeyboard } from "vant";
import "vant/lib/index.css";
// import { createTable, addItem, selectItem, removeItem } from './plugins/sqlite'
// import VConsole from "vconsole";
// if (process.env.NODE_ENV === "production") {
//   new VConsole();
// }
// import './mock/index'
Vue.prototype.$http = http.api;
Vue.prototype.$dateStr = dateTimeFormat;
Vue.prototype._ = _
// Vue.prototype.$createTable = createTable;
// Vue.prototype.$addSqlite = addItem;
// Vue.prototype.$getSqlite = selectItem;
// Vue.prototype.$rmSqlite = removeItem;
Vue.config.productionTip = false;
router.afterEach(() => {
  window.scrollTo(0, 0);
});
// vant插件
Vue.use(IndexBar).use(IndexAnchor).use(Cell).use(Picker).use(DatetimePicker).use(List).use(PasswordInput).use(NumberKeyboard);
// Vue.component(VueQrcode.name, VueQrcode);
Vue.use(VueAMap);
Vue.config.productionTip = false;
// 高德地图配置
// VueAMap.initAMapApiLoader({
//   key: "71a4fe9e16a9e93d6653175b5f6693c8",
//   plugin: [
//     "AMap.Geolocation",
//     "AMap.Autocomplete",
//     "AMap.PlaceSearch",
//     "AMap.Scale",
//     "AMap.OverView",
//     "AMap.ToolBar",
//     "AMap.MapType",
//     "AMap.PolyEditor",
//     "AMap.CircleEditor",
//     "AMap.Geocoder"
//   ],
//   v: "1.4.4"
// });

//重定义sessionStorage.setItem()，用来接收app的数据
sessionStorage.setItem = function (key, newVal) {
  let setItemEvent = new Event('setItemEvent')
  setItemEvent.key = key
  setItemEvent.newVal = newVal
  console.log(key, newVal);

  document.dispatchEvent(setItemEvent)
}

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app")
