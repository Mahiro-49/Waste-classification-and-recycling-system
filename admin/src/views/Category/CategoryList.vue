<template>
  <div>
    <h1>分类列表</h1>
    <div class="search">
      <el-button type="primary" @click="$router.push('/categories/create')"
        >新建分类</el-button
      >
      <div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-select v-model="items.name" filterable placeholder="请输入分类">
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
      <el-table-column align="center" type="index" label="序号" width="100">
      </el-table-column>
      <el-table-column
        align="center"
        prop="parent.name"
        label="上级分类"
        width="auto"
      ></el-table-column>
      <el-table-column align="center" prop="name" label="分类名称" width="auto">
      </el-table-column>
      <el-table-column align="center" label="操作" width="auto">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/categories/edit/${scope.row._id}`)"
          >
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="remove(scope.row)"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination background layout="prev, pager, next" :total="100">
    </el-pagination>
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
      const res = await this.$http.get("rest/categories");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(
        `此操作将永久删除 "${row.name}" 这个分类, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const res = await this.$http.delete(`rest/categories/${row._id}`);
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
      this.$router.push(`/categories/edit/${id}`);
    },
  },
};
</script>

<style>
.search {
  display: flex;
  justify-content: space-around;
  margin: 2rem 2rem;
}

</style>