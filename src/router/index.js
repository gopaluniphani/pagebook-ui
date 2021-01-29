import Vue from "vue";
import Router from "vue-router";

import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import NavBar from "../components/common/NavBar";
import Post from "../components/common/Post";
import Comment from "../components/common/Comment";
import UnApprovedPost from "../components/common/UnApprovedPost";

import AddPost from "../components/AddPost";
import AddBusinessPost from "../components/AddBusinessPost";
import AddStory from "../components/AddStory";
import Business from "../components/Business";
import Home from "../components/Home";
import Login from "../components/Login";
import Profile from "../components/Profile";
import Register from "../components/Register";
import Search from "../components/Search";
import User from "../components/User";
import StoryFeed from "../components/StoryFeed";
import AddBusiness from "../components/AddBusiness";
import FriendsList from "../components/FriendsList";
import Ads from "../components/common/Ads"
import Notifications from "../components/Notifications"

Vue.component("nav-bar", NavBar);
Vue.component("post", Post);
Vue.component("comment", Comment);
Vue.component("unApprovedPost", UnApprovedPost);

Vue.component("Ads", Ads);
Vue.component("notifications", Notifications);
Vue.component("addPost", AddPost);
Vue.component("addBusinessPost", AddBusinessPost);
Vue.component("addStory", AddStory);
Vue.component("business", Business);
Vue.component("home", Home);
Vue.component("login", Login);
Vue.component("profile", Profile);
Vue.component("register", Register);
Vue.component("search", Search);
Vue.component("user", User);
Vue.component("storyfeed", StoryFeed);
Vue.component("addBusiness", AddBusiness);
Vue.component("friendsList", FriendsList);

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
      path: "/addBusinessPost",
      name: "addBusinessPost",
      component: AddBusinessPost,
      meta: { title: "AddBusinessPost" },
    },
    {
      path: "/addStory",
      name: "addStory",
      component: AddStory,
      meta: { title: "AddStory" },
    },
    {
      path: "/storyfeed",
      name: "storyfeed",
      component: StoryFeed,
      meta: { title: "Story Feed" },
    },
    {
      path: "/addBusiness",
      name: "addBusiness",
      component: AddBusiness,
      meta: { title: "Add Business" },
    },
    {
      path: "/friendsList",
      name: "friendsList",
      component: FriendsList,
      meta: { title: "Friends List" },
    },
    {
      path: "/notifications",
      name: "notifications",
      component: Notifications,
      meta: { title: "Notifications" },
    },
  ],
});
