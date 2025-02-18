<template>
  <div class="register-container">
    <div class="register-panel">
      <div class="logo">
        <Logo sysName="没账号？立即注册"/>
      </div>
      <div class="input-group">
        <input v-model="act" class="input act" placeholder="注册账号" />
      </div>
      <div class="input-group">
        <input v-model="name" class="input act" placeholder="用户名" />
      </div>
      <div class="input-group">
        <input v-model="pwd" class="input pwd" type="password" placeholder="输入密码" />
      </div>
      <div class="input-group">
        <input v-model="pwdConfirm" class="input pwd" type="password" placeholder="确认密码" />
      </div>
      <div>
        <span class="register-btn" @click="registerFunc">立即注册</span>
      </div>
      <div class="tip">
        <p>已有账户？<span class="no-act" @click="toDoLogin">返回登录</span></p>
      </div>
    </div>
  </div>
</template>

<script>
const DELAY_TIME = 1300;
import request from "@/utils/request.js";
import md5 from 'js-md5';
import Logo from '@/components/Logo.vue';
export default {
  name: "Register",
  components: { Logo },
  data() {
    return {
      act: '', // 账号
      pwd: '', // 密码
      pwdConfirm: '', // 确认密码
      name: '' // 用户名
    }
  },
  methods: {
    // 返回登录页面
    toDoLogin() {
      this.$router.push('/login');
    },
    async registerFunc() {
      if (!this.act || !this.pwd || !this.pwdConfirm || !this.name ) {
        this.$swal.fire({
          title: '填写校验',
          text: '账号或密码或用户名不能为空',
          icon: 'error',
          showConfirmButton: false,
          timer: DELAY_TIME,
        });
        return;
      }
      if (this.pwd !== this.pwdConfirm) {
        this.$swal.fire({
          title: '填写校验',
          text: '前后密码输入不一致',
          icon: 'error',
          showConfirmButton: false,
          timer: DELAY_TIME,
        });
        return;
      }
      const hashedPwd = md5(md5(this.pwd));
      const paramDTO = { userAccount: this.act, userPwd: hashedPwd, userName: this.name };
      try {
        const { data } = await request.post(`user/register`, paramDTO);
        if (data.code !== 200) {
          this.$swal.fire({
            title: '注册失败',
            text: data.msg,
            icon: 'error',
            showConfirmButton: false,
            timer: DELAY_TIME,
          });
          return;
        }
        // 使用Swal通知注册成功，延迟后跳转
        this.$swal.fire({
          title: '注册成功',
          text: '即将返回登录页...',
          icon: 'success',
          showConfirmButton: false,
          timer: DELAY_TIME,
        });
        // 根据角色延迟跳转
        setTimeout(() => {
          this.$router.push('/login');
        }, DELAY_TIME);
      } catch (error) {
        console.error('注册请求错误:', error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  box-sizing: border-box;
}

.register-container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url('/bag2.png') no-repeat center center, url('/bg2.jpg') no-repeat center center;
    background-size: cover;
    background-blend-mode: overlay;
    z-index: -1;
    animation: backgroundAnimation 20s ease-in-out infinite;
  }

  @keyframes backgroundAnimation {
    0%, 100% {
      background-position: 100% 0, 0 0;
    }
    50% {
      background-position: 0 100%, 100% 100%;
    }
  }

  .register-panel {
    width: 320px;
    padding: 40px 30px 16px 30px;
    border-radius: 10px;
    background-color: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 6px rgba(36, 36, 36, 0.1), 0 1px 3px rgba(40, 40, 40, 0.06);
    transition: box-shadow 0.3s ease, transform 0.3s ease;

    &:hover {
      box-shadow: 0 8px 16px rgba(36, 36, 36, 0.1), 0 2px 6px rgba(40, 40, 40, 0.06);
      transform: scale(1.02);
    }

    .logo {
      margin: 10px 0 30px 0;
      transition: margin 0.3s ease;

      &:hover {
        margin: 10px 0 20px 0;
      }
    }

    .input-group {
      position: relative;
      margin: 10px 0;

      .input {
        height: 53px;
        line-height: 53px;
        width: 100%;
        padding: 0 15px;
        background-color: rgb(248, 248, 248);
        border: 1px solid rgb(248, 248, 248);
        border-radius: 5px;
        font-weight: 800;
        font-size: 18px;
        transition: background-color 0.3s ease, border 0.3s ease;

        &:focus {
          outline: none;
          background-color: rgb(242, 243, 244);
          border: 1px solid rgb(30, 102, 147);
        }
      }
    }

    .register-btn {
      display: inline-block;
      text-align: center;
      border-radius: 3px;
      margin-top: 20px;
      height: 43px;
      line-height: 43px;
      width: 100%;
      background-color: rgb(128, 158, 76);
      font-size: 14px;
      border: none;
      color: rgb(250, 250, 250);
      padding: 0;
      cursor: pointer;
      user-select: none;
      transition: background-color 0.3s ease, transform 0.3s ease;

      &:hover {
        background-color: rgb(110, 138, 63);
        transform: scale(1.05);
      }
    }

    .tip {
      margin: 20px 0;
      text-align: center;

      p {
        padding: 3px 0;
        margin: 0;
        font-size: 14px;
        color: #647897;
        transition: color 0.3s ease;

        span {
          color: #3b3c3e;
          border-radius: 2px;
          margin: 0 6px;
          transition: color 0.3s ease, cursor 0.3s ease;

          &:hover {
            color: #3e77c2;
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>