import Vue from "vue";
import VueRouter from "vue-router";
// import index from "./views/index.vue";

Vue.use(VueRouter);

export default new VueRouter({
    routes: [
        {
            path: "/",
            redirect:  "/index"
        },
        {
            path: "/index",
            name: "index",
            component: () => import("./pages/index.vue"),
            meta: {
                keepAlive: true
            }
        },
        {
            path: "/category",
            name: "category",
            component: () => import("./pages/category.vue"),
            meta: {
                keepAlive: true
            }
        },
        {
            path: "/productDetails",
            name: "productDetails",
            component: () => import("./pages/productDetails.vue")
        },
        {
            path: "/nannyDetails",
            name: "nannyDetails",
            component: () => import("./components/index/nannyDetails.vue")
        },
        {
            path: "/order",
            name: "order",
            component: () => import("./pages/order.vue"),
            meta: {
                keepAlive: true
            }
        }
   
    ]
});
