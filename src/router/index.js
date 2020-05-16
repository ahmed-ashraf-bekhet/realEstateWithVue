import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import sellerProfile from "../views/sellerProfile.vue";
import customerProfile from "../views/customerProfile.vue";
import propDetails from "../views/propDetails.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/sellerProfile/:id",
    name: "sellerProfile",
    component: sellerProfile
  },
  {
    path: "/customerProfile/:id",
    name: "customerProfile",
    component: customerProfile
  },
  {
    path: "/propDetails/:id",
    name: "propDetails",
    component: propDetails
  }
];

const router = new VueRouter({
  routes
});

export default router;
