<template>
  <div>
    <h1>垃圾列表</h1>
    <div class="search">
      <el-button type="primary" @click="$router.push('/items/create')">新建垃圾</el-button>
      <div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
      <el-select v-model="items.name" filterable placeholder="请输入搜索内容">
        <el-option
          v-for="item in items"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          @click.native="goDeail(item._id)"
        >
        </el-option>
      </el-select> 
      </div>
    </div>
    <el-table :data="items">
      <el-table-column align="center" type="index" label="序号" width="100"> </el-table-column>
      <el-table-column align="center" prop="icon" label="图片" width="auto">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="name" label="垃圾名称" width="auto">
      </el-table-column>
      <el-table-column align="center" label="操作" width="auto ">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/items/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [],
    };
  },

  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/items");
      this.items = res.data;
      console.log(this.items);
    },
    async remove(row) {
      this.$confirm(
        `此操作将永久删除 "${row.name}" 这个物品, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const res = await this.$http.delete(`rest/items/${row._id}`);
          if(res.data !== '没有权限') {
            this.$message({
            type: "success",
            message: "删除成功!",
          });
          }
          this.fetch();
        })
        .catch(() => {
          if(res.data !== '没有权限') {
            this.$message({
            type: "info",
            message: "已取消删除",
          });
          }
        });
    },
    goDeail(id) {
      this.$router.push(`/items/edit/${id}`);
    },
  },
};
</script>

<style>
.search {
  display: flex;
  justify-content: right;
  margin: 2rem 2rem;
}
</style>