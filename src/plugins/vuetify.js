import Vue from "vue";
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VuetifySnackbar from "vuetify-toast-snackbar";
Vue.use(Vuetify);
Vue.use(VuetifySnackbar, {
  x: "right", // default
  y: "bottom", // default
color: "grey darken-1", // default
  icon: "mdi-information",
  classes: ["body-2"],
  dismissable: true, // default
  multiLine: false, // default
  vertical: false, // default
  queueable: false, // default
  showClose: false, // default
  shorts: {
    custom: {
      color: "amber"
    }
  },
  property: "$toast" // default
});
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#04c0af",
        secondary: "#424242",
        orange: '#dc6769',
        accent: "#82B1FF",
        error: "#FF5252",
        info: "#00aaef",
        success: "#4CAF50",
        warning: "#FFC107"
      }
    }
  },
  icons: {
    iconfont: ["mdi"]
  }
});
