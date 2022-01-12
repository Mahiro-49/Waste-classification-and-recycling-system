<template>
  <div class="only">
    <div class="icon">
      <img :src="items.img" alt="" />

    </div>

    <div class="info">
      <el-tag align="center" type="info" effect="dark">用户名：{{items.username}}</el-tag>
      <el-tag align="center" type="info" effect="dark">邮箱：{{items.email}}</el-tag>
      <el-tag align="center" type="info" effect="dark">用户身份：{{items.isAdmin}}</el-tag>
      <el-button @click="$router.push(`/users/edit/${id}`)" type="success">修改个人信息</el-button>
    </div>
  </div>
</template>

<script>
import jwtDecode from "jwt-decode";

export default {
  data() {
    return {
      token: null,
      id: "",
      items: {},
    };
  },
  beforeMount() {
    this.token = jwtDecode(this.$store.state.token);
    console.log(this.token._id);
    this.id = this.token._id;
    this.feathData();
  },
  methods: {
    async feathData() {
      const res = await this.$http.get(`/getlist/${this.id}`);
      this.items = res.data;
      console.log(this.items);
    },
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

.only {
  position: relative;
  display: flex;
  flex-direction: column;
  height: 91vh;
  background-image: url('../../assets/bg1.gif');
}
.only .icon {
  height: 50%;
  margin: 5% 44%;
}

.only .icon img {
  height: 50%;
  border-radius: 50%;
  border: 1px;
}
.only .info {
  position: absolute;
  top: 40%;
  left: 42%;
  display: flex;
  flex-direction: column;
  width: 15%;
}

.only .info .el-tag {
  margin-bottom: 2rem;
  width: 15rem;
  height: 3rem;
  line-height: 3rem;
  font-size: 1.2rem;
}
.only .info .el-button {
  transform: translate(10%, 50%)
}
</style>