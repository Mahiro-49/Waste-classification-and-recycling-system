<template>
  <div class="login-register">
    <div class="contain">
      <div class="big-box" :class="{ active: isLogin }">
        <div class="big-contain" v-if="isLogin">
          <div class="btitle">账户登录</div>
          <div class="bform">
            <el-form
              :model="registerData"
              :rules="rules"
              ref="registerForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  v-model="registerData.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="registerData.password"
                ></el-input>
              </el-form-item>
            </el-form>
          </div>
          <button class="bbutton" @click="loginForm('registerForm')">
            登录
          </button>
        </div>
        <div class="big-contain" v-else>
          <div class="btitle">创建账户</div>
          <div class="bform">
            <el-form
              :model="registerData"
              :rules="rules"
              ref="registerForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="username">
                <el-input
                  type="text"
                  v-model="registerData.username"
                ></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input
                  type="password"
                  v-model="registerData.password"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="password2">
                <el-input
                  type="password"
                  v-model="registerData.password2"
                ></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="email">
                <el-input type="email" v-model="registerData.email"></el-input>
              </el-form-item>
              <el-form-item label="身份" prop="isAdmin">
                <el-select v-model="registerData.isAdmin" placeholder="请选择">
                  <el-option
                    v-for="item in select"
                    :key="item"
                    :label="item"
                    :value="item"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <button class="bbutton" @click="submitForm('registerForm')">
            注册
          </button>
        </div>
      </div>
      <div class="small-box" :class="{ active: isLogin }">
        <div class="small-contain" v-if="isLogin">
          <div class="stitle">您好!</div>
          <p class="scontent">点击注册，创建您的账户</p>
          <button class="sbutton" @click="changeType">注册</button>
        </div>
        <div class="small-contain" v-else>
          <div class="stitle">欢迎回来!</div>
          <p class="scontent">请登录您的账户</p>
          <button class="sbutton" @click="changeType">登录</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value !== this.registerData.password) {
        callback(new Error("两次输入的密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      select: ['管理员', '用户'],
      isLogin: true,
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
    };
  },
  methods: {
    changeType() {
      this.isLogin = !this.isLogin;
      this.registerData.username = "";
      this.registerData.email = "";
      this.registerData.password = "";
    },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/register", this.registerData).then((res) => {
            this.$message({
              type: "success",
              message: "用户注册成功",
            });
            this.isLogin = !this.isLogin;
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    loginForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post("/login", this.registerData).then((res) => {
            // 将token保存在vuex中
            this.$store.commit("saveToken", res.data);
            this.$router.push("/");
            this.$message({
              type: "success",
              message: "用户登录成功",
            });
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped="scoped">
.login-register {
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
}
.contain {
  width: 80%;
  height: 80%;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 3px #f0f0f0, 0 0 6px #f0f0f0;
}
.big-box {
  width: 70%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 30%;
  transform: translateX(0%);
  transition: all 1s;
}
.big-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.btitle {
  font-size: 1.5em;
  font-weight: bold;
  color: rgb(57, 167, 176);
  margin-bottom: 2rem;
}
.bform {
  width: 100%;
  height: 40%;
  padding: 2em 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.bform .errTips {
  display: block;
  width: 50%;
  text-align: left;
  color: red;
  font-size: 0.7em;
  margin-left: 1em;
}
.bform input {
  width: 50%;
  height: 30px;
  border: none;
  outline: none;
  border-radius: 10px;
  padding-left: 2em;
  background-color: #f0f0f0;
}
.bbutton {
  width: 20%;
  height: 40px;
  border-radius: 24px;
  border: none;
  outline: none;
  background-color: rgb(57, 167, 176);
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
  margin-top: 2rem;
}
.small-box {
  width: 30%;
  height: 100%;
  background: linear-gradient(135deg, rgb(57, 167, 176), rgb(56, 183, 145));
  position: absolute;
  top: 0;
  left: 0;
  transform: translateX(0%);
  transition: all 1s;
  border-top-left-radius: inherit;
  border-bottom-left-radius: inherit;
}
.small-contain {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.stitle {
  font-size: 1.5em;
  font-weight: bold;
  color: #fff;
}
.scontent {
  font-size: 0.8em;
  color: #fff;
  text-align: center;
  padding: 2em 4em;
  line-height: 1.7em;
}
.sbutton {
  width: 60%;
  height: 40px;
  border-radius: 24px;
  border: 1px solid #fff;
  outline: none;
  background-color: transparent;
  color: #fff;
  font-size: 0.9em;
  cursor: pointer;
}

.sbutton:hover {
  background-color: rgb(57, 167, 176);
}

.big-box.active {
  left: 0;
  transition: all 0.5s;
}
.small-box.active {
  left: 100%;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: inherit;
  border-bottom-right-radius: inherit;
  transform: translateX(-100%);
  transition: all 1s;
}
</style>
