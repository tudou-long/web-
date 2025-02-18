<template>
  <div class="menu-container">
    <div class="header-section">
      <!-- 左侧标识 -->
      <div class="menu-left">
        <span class="system-title">后台管理系统</span>
      </div>
      <!-- 菜单栏 -->
      <el-menu
        mode="horizontal"
        :default-active="activeIndex"
        background-color="rgb(104 103 106)"
        text-color="#fff"
        active-text-color="#ffd04b"
        class="menu-right"
        @select="handleRouteSelect"
      >
        <el-menu-item index="/adminLayout">
          <i class="el-icon-s-home"></i> 首页
        </el-menu-item>
        <el-submenu index="account" popper-class="custom-popup-class">
          <template #title>
            <i class="el-icon-user"></i> 账号管理
          </template>
          <el-menu-item index="/userManage">用户管理</el-menu-item>
        </el-submenu>
        <el-submenu index="scenic" popper-class="custom-popup-class">
          <template #title>
            <i class="el-icon-location"></i> 景区管理
          </template>
          <el-menu-item index="/scenicManage">景点管理</el-menu-item>
          <el-menu-item index="/scenicTicketManage">门票管理</el-menu-item>
          <el-menu-item index="/scenicTicketOrderManage">门票订单</el-menu-item>
          <el-menu-item index="/scenicStrategyManage">攻略管理</el-menu-item>
        </el-submenu>
        <el-submenu index="hotel" popper-class="custom-popup-class">
          <template #title>
            <i class="el-icon-office-building"></i> 酒店管理
          </template>
          <el-menu-item index="/hotelManage">酒店信息管理</el-menu-item>
          <el-menu-item index="/hotelRoomManage">酒店房间管理</el-menu-item>
          <el-menu-item index="/hotelOrderInfoManage">酒店订单</el-menu-item>
        </el-submenu>
        <el-submenu index="other" popper-class="custom-popup-class">
          <template #title>
            <i class="el-icon-setting"></i> 其他管理
          </template>
          <el-menu-item index="/scenicCategoryManage">分类管理</el-menu-item>
          <el-menu-item index="/evaluationsManage">评论管理</el-menu-item>
          <el-menu-item index="/noticeManage">公告管理</el-menu-item>
        </el-submenu>
        <el-menu-item index="/self">
          <i class="el-icon-user-solid"></i> 个人中心
        </el-menu-item>
      </el-menu>
    </div>
    <!-- 页面内容 -->
    <div class="content-section">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "Admin",
  data() {
    return {
      activeIndex: "/adminLayout", // 默认选中的菜单项
    };
  },
  mounted() {
    this.$nextTick(() => {
      const dropdowns = document.querySelectorAll('.el-menu--popup');
      dropdowns.forEach((dropdown) => {
        const parentMenu = dropdown.closest('.el-submenu');
        if (parentMenu) {
          requestAnimationFrame(() => {
            const width = parentMenu.offsetWidth;
            dropdown.style.minWidth = `${width}px`; // 设置下拉菜单项的宽度与主菜单项一致
            dropdown.style.borderTopLeftRadius = '0'; // 去掉左上角圆角
            dropdown.style.borderTopRightRadius = '0'; // 去掉右上角圆角
            dropdown.style.borderTop = 'none'; // 去掉上边框
            dropdown.style.marginTop = '0'; // 去掉上边距
            dropdown.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)'; // 添加阴影效果
            dropdown.style.borderBottomLeftRadius = '8px'; // 添加左下角圆角
            dropdown.style.borderBottomRightRadius = '8px'; // 添加右下角圆角
            dropdown.style.padding = '0'; // 去掉内边距
            dropdown.style.margin = '0'; // 去掉外边距

            // 确保每个子菜单项没有额外的边距和内边距
            const menuItems = dropdown.querySelectorAll('.el-menu-item');
            menuItems.forEach((item, index, items) => {
              item.style.height = '41px'; // 设置高度与主菜单项一致
              item.style.lineHeight = '41px'; // 设置行高与高度一致，使文本垂直居中
              item.style.padding = '0px'; // 增加内边距以加大间距
              item.style.margin = '0px'; // 去掉外边距
              if (index === 0) {
                item.style.borderTopLeftRadius = '0';
                item.style.borderTopRightRadius = '0';
              }
              if (index === items.length - 1) {
                item.style.borderBottomLeftRadius = '8px';
                item.style.borderBottomRightRadius = '8px';
              }
            });
          });
        } else {
          dropdown.style.minWidth = '150px';
        }
      });

      const menuItems = document.querySelectorAll('.el-menu-item, .el-submenu__title');
      menuItems.forEach((item) => {
        item.style.textAlign = 'center';
        item.style.fontSize = '17px'; // 设置字体大小为17px

        item.style.fontWeight = 'bold'; // 字体加粗
      });
    });
  },
  methods: {
    handleRouteSelect(index) {
      this.activeIndex = index;
      this.$router.push(index);
    },
  },
};
</script>

<style scoped lang="scss">
/* 主容器 */
.menu-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
}

/* 头部菜单栏 */
.header-section {
  height: 60px;
  display: flex;
  align-items: center;
  background-color: #68795f; /* 更新的深灰绿色背景 */
  padding: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.58); /* 更明显的阴影效果 */
  z-index: 10;
}

/* 左侧系统标题 */
.menu-left {
  display: flex;
  align-items: center;
  padding-right: 20px;
  padding-left: 33px;
}

.system-title {
  font-size: 21px;
  font-weight: bold;
  color: white; /* 白色文本 */
  margin-right: 20px;
}

/* 菜单栏右侧内容 */
.menu-right {
  flex-grow: 1;
  color: #f0f0f0 !important; /* 浅灰色文本颜色 */
}

.el-menu {
  background-color: rgb(104, 103, 106); /* 浅灰色背景 */
  transition: all 0.3s ease; /* 添加过渡效果 */
}

.el-menu-item,
.el-submenu__title {
  color: #fff !important; /* 修改字体颜色 */
  transition: color 0.3s ease; /* 添加过渡效果 */
}

.el-menu-item:hover,
.el-submenu__title:hover {
  color: #ffd04b !important; /* 修改悬停时的字体颜色 */
}

///* 子菜单样式 */
//::v-deep(.custom-popup-class) {
//  min-width: 150px !important;
//  width: auto !important;
//  padding: 0 !important;
//  border-radius: 6px !important;
//  background-color: #fff !important;
//  border: 1px solid #ddd !important;
//  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1) !important;
//}

/* 页面内容 */
.content-section {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
}
</style>