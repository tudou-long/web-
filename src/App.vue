<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

/* 全局基础样式 */
body {
  margin: 0;
  font-family: "Arial", sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app > .header-section {
  width: 100%;
  background-color: #545c64;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

a {
  color: inherit;
  text-decoration: none;
}

* {
  box-sizing: border-box;
}



.el-menu-item,
.el-submenu__title {
  padding: 0 20px;
}

.el-avatar {
  margin-right: 10px;
}




</style>
