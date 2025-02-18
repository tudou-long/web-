<template>
  <div class="login-container">
    <div class="login-panel">
      <div class="logo">
        <Logo :bag="colorLogo" sysName="旅游平台登录"/>
      </div>
      <div class="input-group">
        <input v-model="act" class="input act" placeholder="账号" />
      </div>
      <div class="input-group">
        <input v-model="pwd" class="input pwd" type="password" placeholder="密码" />
      </div>
      <div class="btn-group">
        <span class="login-btn" @click="login">立即登录</span>
      </div>
      <div class="tip">
        <p>没有账号？<span class="no-act" @click="toDoRegister">点此注册</span></p>
      </div>
    </div>
  </div>
</template>

<script>
const ADMIN_ROLE = 1;
const USER_ROLE = 2;
const DELAY_TIME = 1300;
import request from "@/utils/request.js";
import { setToken } from "@/utils/storage.js";
import md5 from 'js-md5';
import Logo from '@/components/Logo.vue';
export default {
  name: "Login",
  components: { Logo },
  data() {
    return {
      act: '',
      pwd: '',
      colorLogo: 'rgb(38,38,38)',
    }
  },
  methods: {
    toDoRegister(){
      this.$router.push('/register');
    },
    async login() {
      if (!this.act || !this.pwd) {
        this.$swal.fire({
          title: '填写校验',
          text: '账号或密码不能为空',
          icon: 'error',
          showConfirmButton: false,
          timer: DELAY_TIME,
        });
        return;
      }
      const hashedPwd = md5(md5(this.pwd));
      const paramDTO = { userAccount: this.act, userPwd: hashedPwd };
      try {
        const { data } = await request.post(`user/login`, paramDTO);
        if (data.code !== 200) {
          this.$swal.fire({
            title: '登录失败',
            text: data.msg,
            icon: 'error',
            showConfirmButton: false,
            timer: DELAY_TIME,
          });
          return;
        }
        setToken(data.data.token);
        setTimeout(() => {
          const { role } = data.data;
          this.navigateToRole(role);
        }, DELAY_TIME);
      } catch (error) {
        console.error('登录请求错误:', error);
        this.$message.error('登录请求出错，请重试！');
      }
    },
    navigateToRole(role) {
      switch (role) {
        case ADMIN_ROLE:
          this.$router.push('/admin');
          break;
        case USER_ROLE:
          this.$router.push('/user');
          break;
        default:
          console.warn('未知的角色类型:', role);
          break;
      }
    },
  }
};
</script>

<style lang="scss" scoped>
* {
  user-select: none;
  box-sizing: border-box;
}

.login-container {
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
    background: url('/bag2.png') no-repeat center center, url('/bag2.png') no-repeat center center;
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

  .login-panel {
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

    .btn-group {
      margin-top: 20px;

      .login-btn {
        display: inline-block;
        text-align: center;
        border-radius: 3px;
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

        i {
          margin-right: 3px;
        }

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