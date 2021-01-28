import Vue from "vue";
import Router from "vue-router";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import NavBar from "../components/common/NavBar";
import Post from "../components/common/Post";
import Story from "../components/common/Story";
import Feed from "../components/common/Feed";
import Stories from "../components/common/Stories";

import AddPost from "../components/AddPost";
import AddStory from "../components/AddStory";
import Business from "../components/Business";
import Home from "../components/Home";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Register from "../components/Register";
import Search from "../components/Search";
import User from "../components/User";

Vue.component("nav-bar", NavBar);
Vue.component("post", Post);
Vue.component("story", Story);
Vue.component("feed", Feed);
Vue.component("stories", Stories);

Vue.component("addPost", AddPost);
Vue.component("addStory", AddStory);
Vue.component("business", Business);
Vue.component("home", Home);
Vue.component("login", Login);
Vue.component("profile", Profile);
Vue.component("register", Register);
Vue.component("search", Search);
Vue.component("user", User);

Vue.use(Router);
Vue.use(BootstrapVue);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: Login,
      meta: { title: "Login" },
    },
    {
      path: "/register",
      name: "register",
      component: Register,
      meta: { title: "Register" },
    },
    {
      path: "/search",
      name: "search",
      component: Search,
      meta: { title: "Search" },
    },
    {
      path: "/home",
      name: "home",
      component: Home,
      meta: { title: "Home" },
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile,
      meta: { title: "Profile" },
    },
    {
      path: "/user",
      name: "user",
      component: User,
      meta: { title: "User" },
    },
    {
      path: "/business",
      name: "business",
      component: Business,
      meta: { title: "Business" },
    },
    {
      path: "/addPost",
      name: "addPost",
      component: AddPost,
      meta: { title: "AddPost" },
    },
    {
      path: "/addStory",
      name: "addStory",
      component: AddStory,
      meta: { title: "AddStory" },
    },
  ],
});
