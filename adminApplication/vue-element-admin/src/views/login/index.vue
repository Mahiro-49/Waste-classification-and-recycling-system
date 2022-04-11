<template>
  <div class="login-container">
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      autocomplete="on"
      label-position="left"
      v-if="isLogin"
    >
      <div class="title-container">
        <h3 class="title">登录</h3>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="username"
          v-model="loginForm.username"
          placeholder="用户名"
          name="username"
          type="text"
          tabindex="1"
          autocomplete="on"
        />
      </el-form-item>

      <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input
            :key="passwordType"
            ref="password"
            v-model="loginForm.password"
            :type="passwordType"
            placeholder="密码"
            name="password"
            tabindex="2"
            autocomplete="on"
            @keyup.native="checkCapslock"
            @blur="capsTooltip = false"
            @keyup.enter.native="handleLogin"
          />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
      </el-tooltip>

      <div class="button-wrapper">
        <el-button
          :loading="loading"
          type="primary"
          style="width:50%;margin-bottom:30px;"
          @click.native.prevent="handleLogin"
        >登录</el-button>
        <el-button
          :loading="loading"
          type="primary"
          style="width:50%;margin-bottom:30px;"
          @click.native.prevent="isLogin = !isLogin"
        >注册</el-button>
      </div>
    </el-form>
    <el-form
      v-else
      :model="registerData"
      :rules="rules"
      ref="registerForm"
      label-width="90px"
      class="login-form"
      autocomplete="on"
      label-position="right"
    >
      <div class="title-container">
        <h3 class="title">注册</h3>
      </div>
      <el-form-item label="用户名 :" prop="username" class="item">
        <el-input type="text" v-model="registerData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码 :" prop="password" class="item">
        <el-input type="password" v-model="registerData.password"></el-input>
      </el-form-item>
      <el-form-item label="确认密码 :" prop="password2" class="item">
        <el-input type="password" v-model="registerData.password2"></el-input>
      </el-form-item>
      <el-form-item label="邮箱 :" prop="email" class="item">
        <el-input type="email" v-model="registerData.email"></el-input>
      </el-form-item>
      <el-form-item label="身份" prop="isAdmin" class="item">
        <el-select v-model="registerData.isAdmin" placeholder="请选择">
          <el-option v-for="item in select" :key="item" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>

      <div class="button-wrapper">
        <el-button
          :loading="loading"
          type="primary"
          style="width:100%;margin-bottom:30px;"
          @click.native.prevent="submitForm('registerForm')"
        >注册</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import SocialSign from "./components/SocialSignin";

export default {
  name: "Login",
  components: { SocialSign },
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入正确的用户账号"));
      } else {
        callback();
      }
    };
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error("密码长度不能少于6位"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerData.password) {
        callback(new Error("两次输入的密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      select: ['超级管理员', '用户', '游客'],
      loginForm: {
        username: "",
        password: ""
      },
      registerData: {
        username: "",
        password: "",
        password2: "",
        email: "",
        isAdmin: '',
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur " },
          { min: 3, max: 32, message: "长度应在3-32之间", trigger: "blur" },
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 32, message: "长度应在3-32之间", trigger: "blur" },
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 3, max: 32, message: "长度应在3-32之间", trigger: "blur" },
          { validator: validatePass, trigger: "blur" },
        ],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { min: 3, max: 32, message: "长度应在3-32之间", trigger: "blur" },
        ],
      },
      loginRules: {
        username: [
          { required: true, trigger: "blur", validator: validateUsername }
        ],
        password: [
          { required: true, trigger: "blur", validator: validatePassword }
        ]
      },
      passwordType: "password",
      capsTooltip: false,
      loading: false,
      redirect: undefined,
      otherQuery: {},
      isLogin: true
    };
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query;
        if (query) {
          this.redirect = query.redirect;
          this.otherQuery = this.getOtherQuery(query);
        }
      },
      immediate: true
    }
  },
  created() {
    // window.addEventListener('storage', this.afterQRScan)
  },
  mounted() {
    if (this.loginForm.username === "") {
      this.$refs.username.focus();
    } else if (this.loginForm.password === "") {
      this.$refs.password.focus();
    }
  },
  destroyed() {
    // window.removeEventListener('storage', this.afterQRScan)
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/register", this.registerData).then((res) => {
            console.log(res);
            if (res !== undefined) {
              this.$message({
                type: "success",
                message: "用户注册成功",
              });
              this.isLogin = !this.isLogin;
            }
          });
        } else {
          this.$message({
            type: 'warning',
            message: '密码不正确'
          })
        }
      });
    },
    checkCapslock(e) {
      const { key } = e;
      this.capsTooltip = key && key.length === 1 && key >= "A" && key <= "Z";
    },
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.password.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("user/login", this.loginForm)
            .then(() => {
              this.$router.push({
                path: this.redirect || "/",
                query: this.otherQuery
              });
              this.loading = false;
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message({
            type: 'warning',
            message: '密码不正确'
          })
        }
      });
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== "redirect") {
          acc[cur] = query[cur];
        }
        return acc;
      }, {});
    }
  }
};
</script>

<style lang="scss">
$bg: #f9f9ff;
$light_gray: rgb(80, 59, 59);
$cursor: rgb(80, 59, 59);

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.item .el-form-item__label{
    color: rgb(80, 59, 59);
    text-align: center;
    margin-top: 7px;
    margin-left: 15px;
}
.login-container {
  .button-wrapper {
    display: flex;
  }
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;
    ::placeholder {
      color: rgb(80, 59, 59)
    }

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: rgb(80, 59, 59);
$light_gray: rgb(80, 59, 59);

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }

  .thirdparty-button {
    position: absolute;
    right: 0;
    bottom: 6px;
  }

  @media only screen and (max-width: 470px) {
    .thirdparty-button {
      display: none;
    }
  }
}
</style>
