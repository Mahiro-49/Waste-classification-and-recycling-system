<template>
  <div>
    <h1>垃圾列表</h1>
    <div class="search">
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
    <el-table :data="items">
      <el-table-column prop="_id" label="ID" width="300"> </el-table-column>
      <el-table-column prop="icon" label="图片" width="200">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column prop="name" label="垃圾名称" width="200">
      </el-table-column>
      <el-table-column label="操作" width="230">
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
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    goDeail(id) {
      console.log("111");
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