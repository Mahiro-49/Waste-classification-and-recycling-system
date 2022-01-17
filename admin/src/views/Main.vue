<template>
  <el-container style="height: 100vh">
    <el-aside width="200px">
      <el-menu router :default-openeds="['1','2','4']">
        <el-menu-item index="/home">
          <template slot="title"
            ><i class="el-icon-message"></i>首页
          </template>
        </el-menu-item>
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">垃圾</template>
            <el-menu-item index="/items/list">垃圾列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>废品回收</template>
          <el-menu-item-group>
            <template slot="title">价格</template>
            <el-menu-item index='/goods/list'>价格列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">地点</template>
            <el-menu-item index='/locations/list'>回收地点</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="4">
          <template slot="title"
            ><i class="el-icon-setting"></i>用户管理</template
          >
          <el-menu-item-group>
            <el-menu-item index="/users/personal">个人信息</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <el-menu-item index="/users/list">账户列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <img class="header-img" src="../assets/bg2.png" alt="">
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看个人信息</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span class="name">欢迎您：admin</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path" />
      </el-main>
    </el-container>
  </el-container>
</template>


<script>

export default {
  data() {
    return {
      token: null,
      id: "",
      items: {},
    };
  },
  create() {
    
  },
  beforeMount() {
    // this.token = jwtDecode(this.$store.state.token);
    // console.log(this.token._id);
    // this.id = this.token._id;
    // this.feathData();
  },
  methods: {
    async feathData() {
      const res = await this.$http.get(`/getlist/${this.id}`);
      this.items = res.data;
    },
  }
};
</script>

<style>
.el-container .el-main {
  margin: 0;
  padding: 0;
}
.el-header {
  display: flex;
  justify-content: right;
  background-color: #7da380;
  color: #333;
  line-height: 60px;
}

.el-header .name {
  font-weight: 700;
  margin: 0 25px;
  font-size: 15px;
}

.el-header .header-img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-top: 5px;
}

.el-aside {
  color: #333;
}
</style>