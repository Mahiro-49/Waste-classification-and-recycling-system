<template>
  <el-table :data="list" style="width: 100%;padding-top: 15px;">
    <el-table-column label="订单编号" min-width="200" align="center">
      <template slot-scope="scope">
        {{ scope.row._id }}
      </template>
    </el-table-column>
    <el-table-column label="上门时间" width="700" align="center">
      <template slot-scope="scope">
        {{ scope.row.rdate.split("T")[0] + ' ' + scope.row.rtime }}
      </template>
    </el-table-column>
    <el-table-column label="订单状态" width="600" align="center">
      <template slot-scope="{row}">
        <el-tag v-if="row.status === '已完成'" type="success">{{ row.status }}</el-tag>
        <el-tag v-else-if="row.status === '处理中'">{{ row.status }}</el-tag>
        <el-tag v-else type="info">{{ row.status }}</el-tag>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null
    }
  },
  created() {
    this.getOrderList()
  },
  methods: {
    async getOrderList() {
      const res = await this.$http.get(`rest/orders`);
      this.list = res.data;
    }
  }
}
</script>
