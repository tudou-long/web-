import Vue from "vue";
import VueRouter from "vue-router";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { getToken } from "@/utils/storage.js";
import echarts from 'echarts';

Vue.prototype.$echarts = echarts;
Vue.use(ElementUI);
Vue.use(VueRouter);

const routes = [
  {
    path: "*",
    redirect: "/login",
  },
  {
    path: "/login",
    component: () => import(`@/views/login/Login.vue`),
  },
  {
    path: "/register",
    component: () => import(`@/views/register/Register.vue`),
  },
  {
    path: "/admin",
    component: () => import(`@/views/admin/Home.vue`), // 主框架页面
    meta: {
      requireAuth: true, // 需要登录权限
    },
    redirect: "/adminLayout", // 默认跳转到首页
    children: [
      {
        path: "/adminLayout",
        name: "首页",
        component: () => import(`@/views/admin/Main.vue`),
      },
      {
        path: "/userManage",
        name: "用户管理",
        component: () => import(`@/views/admin/UserManage.vue`),
      },
      {
        path: "/vendorManage",
        name: "供应商管理",
        component: () => import(`@/views/admin/VendorManage.vue`),
      },
      {
        path: "/scenicManage",
        name: "景点管理",
        component: () => import(`@/views/admin/ScenicManage.vue`),
      },
      {
        path: "/scenicTicketManage",
        name: "门票管理",
        component: () => import(`@/views/admin/ScenicTicketManage.vue`),
      },
      {
        path: "/scenicTicketOrderManage",
        name: "门票订单",
        component: () => import(`@/views/admin/ScenicTicketOrderManage.vue`),
      },
      {
        path: "/scenicStrategyManage",
        name: "攻略管理",
        component: () => import(`@/views/admin/ScenicStrategyManage.vue`),
      },
      {
        path: "/hotelManage",
        name: "酒店信息管理",
        component: () => import(`@/views/admin/HotelManage.vue`),
      },
      {
        path: "/hotelRoomManage",
        name: "酒店房间管理",
        component: () => import(`@/views/admin/HotelRoomManage.vue`),
      },
      {
        path: "/hotelOrderInfoManage",
        name: "酒店订单",
        component: () => import(`@/views/admin/HotelOrderInfoManage.vue`),
      },
      {
        path: "/scenicCategoryManage",
        name: "分类管理",
        component: () => import(`@/views/admin/ScenicCategoryManage.vue`),
      },
      {
        path: "/evaluationsManage",
        name: "评论管理",
        component: () => import(`@/views/admin/EvaluationsManage.vue`),
      },
      {
        path: "/noticeManage",
        name: "公告管理",
        component: () => import(`@/views/admin/NoticeManage.vue`),
      },
      {
        path: "/self", // 新增个人中心路由
        name: "个人中心",
        component: () => import(`@/views/user/Self.vue`),
      },
    ],
  },
  {
    path: "/user",
    component: () => import(`@/views/user/Main.vue`), // 用户界面框架
    meta: {
      requireAuth: true, // 需要登录权限
    },
    children: [
      {
        path: "/scenic",
        name: "景点",
        component: () => import(`@/views/user/Scenic.vue`),
      },
      {
        path: "/scenicDetail",
        name: "景点详情",
        component: () => import(`@/views/user/ScenicDetail.vue`),
      },
      {
        path: "/order",
        name: "我的订单",
        component: () => import(`@/views/user/Order.vue`),
      },
      {
        path: "/strategy",
        name: "攻略",
        component: () => import(`@/views/user/Strategy.vue`),
      },
      {
        path: "/strategyDetail",
        name: "攻略详情",
        component: () => import(`@/views/user/StrategyDetail.vue`),
      },
      {
        path: "/hotel",
        name: "酒店",
        component: () => import(`@/views/user/Hotel.vue`),
      },
      {
        path: "/hotelDetail",
        name: "酒店详情",
        component: () => import(`@/views/user/HotelDetail.vue`),
      },
      {
        path: "/hotelOrder",
        name: "酒店订单",
        component: () => import(`@/views/user/HotelOrder.vue`),
      },
      {
        path: "/ticketOrder",
        name: "门票订单",
        component: () => import(`@/views/user/TicketOrder.vue`),
      },
      {
        path: "/notice",
        name: "公告通知",
        component: () => import(`@/views/user/Notice.vue`),
      },
      {
        path: "/noticeDetail",
        name: "公告详情",
        component: () => import(`@/views/user/NoticeDetail.vue`),
      },
      {
        path: "/service",
        name: "服务中心",
        component: () => import(`@/views/user/Service.vue`),
      },
      {
        path: "/scenicVendor",
        name: "供应商景点",
        component: () => import(`@/views/user/ScenicVendor.vue`),
      },
      {
        path: "/hotelVendor",
        name: "供应商酒店",
        component: () => import(`@/views/user/HotelVendor.vue`),
      },
      {
        path: "/ticket",
        name: "景点门票",
        component: () => import(`@/views/user/Ticket.vue`),
      },
      {
        path: "/hotelRoom",
        name: "酒店房间",
        component: () => import(`@/views/user/HotelRoom.vue`),
      },
      {
        path: "/self",
        name: "个人中心",
        component: () => import(`@/views/user/Self.vue`),
      },
      {
        path: "/resetPwd",
        name: "重置密码",
        component: () => import(`@/views/user/ResetPwd.vue`),
      },
      {
        path: "/contentCenter",
        name: "内容中心",
        component: () => import(`@/views/user/ContentCenter.vue`),
      },
      {
        path: "/save",
        name: "我的收藏",
        component: () => import(`@/views/user/Save.vue`),
      },
    ],
  },
];

const router = new VueRouter({
  routes,
  mode: "history", // 使用 history 模式
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    const token = getToken(); // 检查 Token
    if (token) {
      next(); // 有 Token 放行
    } else {
      next("/login"); // 无 Token 跳转登录页
    }
  } else {
    next(); // 不需要权限，直接放行
  }
});

export default router;
