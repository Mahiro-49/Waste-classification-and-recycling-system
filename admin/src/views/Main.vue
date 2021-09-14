<template>
  <el-container style="height: 100vh">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router :default-openeds="['1','2' ,'3']">
        <el-submenu index="1">
          <template slot="title"
            ><i class="el-icon-message"></i>内容管理
          </template>
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <template slot="title">垃圾</template>
            <el-menu-item index="/items/create">新建垃圾</el-menu-item>
            <el-menu-item index="/items/list">垃圾列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title"><i class="el-icon-menu"></i>废品回收</template>
          <el-menu-item-group>
            <el-menu-item index='/reuse/create'>新建项目</el-menu-item>
            <el-menu-item index='/reuse/list'>回收列表</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title"
            ><i class="el-icon-setting"></i>公益科普</template
          >
          <el-menu-item-group>
            <el-menu-item index="3-1">文章管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
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
    return {};
  },
  beforeMount() {
    this.$http.get("/getlist").then((res) => {
      console.log(res.data);
    });
  },
};
</script>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>