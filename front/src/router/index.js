import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import PlantTypeView from "../views/PlantTypeView.vue";
import AboutView from "../views/AboutView.vue";
import ContactView from "../views/ContactView.vue";
import PlantDetailsView from "../views/PlantDetailsView.vue";
import AllPlantsView from "../views/AllPlantsView.vue";
import ShoppingCart from "../views/ShoppingCart.vue";
import NotFound from "../components/NotFound.vue";
import Login from "../views/Login.vue";
import Register from "../views/RegisterView.vue";
import ForgotPW from "../views/ForgotView.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "About",
    component: AboutView,
  },
  {
    path: "/contact",
    name: "Contact",
    component: ContactView,
  },
  {
    path: "/plant/:type",
    name: "Plant",
    component: PlantTypeView,
  },
  {
    path: "/plant-detail/:id",
    name: "Plant-detail",
    component: PlantDetailsView,
  },
  {
    path: "/all-plants",
    name: "All Plants",
    component: AllPlantsView,
  },
  {
    path: "/shopping-cart",
    name: "Shopping Cart",
    component: ShoppingCart,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
  },
  {
    path: "/forgot",
    name: "Forgot",
    component: ForgotPW,
  },
  {
    path: "/:pathMatch(.*)*",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login" && !isAuthenticated()) next({ name: "login" });
  else next();
});

function isAuthenticated() {
  return true;
}

export default router;
