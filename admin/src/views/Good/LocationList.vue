<template>
  <div>
    <h1>回收列表</h1>
    <div class="search">
      <el-button type="primary" @click="$router.push('/locations/create')">
        添加地点
      </el-button>
      <div>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-select v-model="items.location" filterable placeholder="请输入所在市区">
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.location"
            :value="item._id"
            @click.native="goDeail(item._id)"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <el-table :data="items">
      <el-table-column align="center" prop="time" label="回收时间" width="auto"> </el-table-column>
      <el-table-column
        prop="location"
        label="回收地点"
        width="auto"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="person"
        label="联系人"
        width="auto"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="phone"
        label="联系电话"
        width="auto"
        align="center"
      ></el-table-column>
      <el-table-column align="center" label="操作" width="auto">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push(`/locations/edit/${scope.row._id}`)"
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
      const res = await this.$http.get("rest/apples");
      this.items = res.data;
    },
    async remove(row) {
      this.$confirm(
        `此操作将永久删除 "${row.location}" 这个地点, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(async () => {
          const res = await this.$http.delete(`rest/apples/${row._id}`);
          if(res.data !== "没有权限") {
            this.$message({
            type: "success",
            message: "删除成功!",
          });
          }
          this.fetch();
        })
        .catch(() => {
          if(res.data !== "没有权限") {
            this.$message({
            type: "info",
            message: "已取消删除",
          });
          }
        });
    },
    goDeail(id) {
      this.$router.push(`/locations/edit/${id}`);
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