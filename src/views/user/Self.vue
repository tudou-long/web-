<template>
  <div class="container">
    <el-card class="box-card" shadow="hover">
      <!-- 头像 -->
      <div style="text-align: center;">
        <p class="label">头像</p>
        <el-upload class="avatar-uploader" action="/api/online-travel-sys/v1.0/file/upload" :show-file-list="false" :on-success="handleAvatarSuccess">
          <img v-if="userAvatar" :src="userAvatar" style="width: 88px;height: 88px; border-radius: 50%;">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </div>
      <!-- 昵称 -->
      <div style="margin-top: 20px;">
        <p class="label">昵称</p>
        <input class="dialog-input" v-model="userInfo.userName" placeholder="请输入" />
      </div>
      <!-- 邮箱 -->
      <div style="margin-top: 20px;">
        <p class="label">邮箱</p>
        <input class="dialog-input" v-model="userInfo.userEmail" placeholder="请输入" />
      </div>
      <!-- 提交按钮 -->
      <div style="margin-top: 20px;text-align: center;">
        <el-button type="primary" class="customer" size="medium" @click="postInfo" round>立即修改</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Self",
  data() {
    return {
      userInfo: {},
      userAvatar: '',
    }
  },
  created() {
    this.auth();
  },
  methods: {
    // 提交个人信息修改
    async postInfo() {
      const { userName, userEmail } = this.userInfo;
      const userUpdateDTO = {
        userAvatar: this.userAvatar,
        userName,
        userEmail
      }
      const { data } = await this.$axios.put('/user/update', userUpdateDTO);
      this.$notify({
        position: 'bottom-right',
        duration: 1000,
        title: '编辑个人信息',
        message: data.code === 200 ? '编辑成功' : '编辑失败',
        type: data.code === 200 ? 'success' : 'error'
      });
      // 返回首页
      if (data.code === 200) {
        this.auth();
      }
    },
    // 头像上传
    handleAvatarSuccess(res, file) {
      this.$notify({
        duration: 1500,
        title: '头像上传',
        message: res.code === 200 ? '上传成功' : '上传失败',
        type: res.code === 200 ? 'success' : 'error'
      });
      // 上传成功则更新用户头像
      if (res.code === 200) {
        this.userAvatar = res.data;
      }
    },
    // Token 检验 ,取得用户信息
    async auth() {
      const { data } = await this.$axios.get('/user/auth');
      if (data.code !== 200) { // Token校验异常
        this.$router.push('/');
      } else {
        this.userInfo = data.data;
        this.userAvatar = data.data.userAvatar;
      }
    },
  }
};
</script>

<style scoped lang="scss">
.container {
  width: 500px;
  margin: 0 auto;
}

.box-card {
  padding: 20px;
  text-align: left;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.2);
  }
}

.label {
  font-size: 16px;
  color: #333;
  font-weight: bold;
  margin-bottom: 5px;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 88px;
  height: 88px;
  line-height: 88px;
  text-align: center;
}

.dialog-input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #409EFF;
  }
}

.customer {
  font-size: 18px;
  padding: 12px 30px;
  background-color: #409EFF;
  border: none;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #3a8ee6;
  }
}
.box-card {
  margin: 0 auto;
  width: 100%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  border-radius: 50px; /* 增加圆角 */
}

.box-card:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  transform: translateY(-2px); /* 增强悬浮效果 */
}
</style>