<template>
  <div class="app-container">
    <div class="filter-container">
      <el-select v-model="search.name" filterable placeholder="请输入搜索内容">
        <el-option
          v-for="item in list"
          :key="item._id"
          :label="item.name"
          :value="item._id"
          @click.native ="getSearch(item._id)"
        >
        </el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getSearch">
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >添加</el-button>
    </div>

    <el-table
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="订单编号" prop="_id" align="center" width="250">
        <template slot-scope="{row}">
          <span>{{ row._id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地址" align="center" min-width="150px">
        <template slot-scope="{row}">
          <span>{{ row.address }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.contacts }}</span>
        </template>
      </el-table-column>
      <el-table-column label="联系人电话" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.cphone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="上门时间" width="200px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rdate.split("T")[0] + ' ' +row.rtime }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回收员" width="150px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rpersonnel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回收员电话" width="110px" align="center">
        <template slot-scope="{row}">
          <span>{{ row.rphone }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" class-name="status-col" width="100">
        <template slot-scope="{row}">
          <el-tag v-if="row.status === '已完成'" type="success">{{ row.status }}</el-tag>
          <el-tag v-else-if="row.status === '处理中'">{{ row.status }}</el-tag>
          <el-tag v-else type="info">{{ row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="400" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">编辑</el-button>
          <el-button
            v-if="row.status!='已完成'"
            size="mini"
            type="success"
            @click="handleModifyStatus(row,'已完成')"
          >已完成</el-button>
          <el-button v-if="row.status!='处理中'" size="mini" @click="handleModifyStatus(row,'处理中')">处理中</el-button>
          <el-button v-if="row.status!='deleted'" size="mini" type="danger" @click="remove(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        @submit.native.prevent="save"
        :model="temp"
        label-position="right"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="上门地址" prop="address">
          <el-input v-model="temp.address" />
        </el-form-item>
        <el-form-item label="联系人" prop="contacts">
          <el-input v-model="temp.contacts" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="cphone">
          <el-input v-model="temp.cphone" />
        </el-form-item>
        <!-- <el-form-item label="上门时间" prop="rtime">
          <el-date-picker v-model="temp.rtime" type="datetime" placeholder="请选择时间" />
        </el-form-item> -->
        <el-form-item label="上门时间" prop="rtime">
          <el-col :span="11">
            <el-date-picker type="date" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="temp.rdate" style="width: 120%"></el-date-picker>
          </el-col>
          <el-col :span="5">
            <el-time-select
              style="width: 130px"
              placeholder="选择时间"
              v-model="temp.rtime"
              :picker-options="{
              start: '08:30',
              step: '00:15',
              end: '18:30',
            }"
            ></el-time-select>
          </el-col>
        </el-form-item>
        <el-form-item label="回收员" prop="rpersonnel">
          <el-input v-model="temp.rpersonnel" />
        </el-form-item>
        <el-form-item label="回收员电话" prop="rphone">
          <el-input v-model="temp.rphone" />
        </el-form-item>
        <el-form-item label="订单状态" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择状态">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <div class="dialog-footer">
          <el-form-item>
            <el-button @click="cancel">取消</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">保存</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { createArticle, updateArticle } from "@/api/article";
import waves from "@/directive/waves";
import Pagination from "@/components/Pagination";

export default {
  inject: ["reload"],
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  inject: ["reload"],
  data() {
    return {
      search: [],
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      statusOptions: ["已完成", "处理中", "已过期"],
      temp: {
        address: "",
        ctime: "",
        rtime: "",
        rdate: "",
        rpersonnel: "",
        rphone: "",
        status: "",
        tprice: "",
        cphone: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑",
        create: "创建"
      },
      rules: {
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        contacts: [
          { required: true, message: "请输入联系人", trigger: "blur" }
        ],
        cphone: [
          { required: true, message: "请输入联系人电话", trigger: "blur" }
        ],
        rtime: [{ required: true, message: "请输入时间", trigger: "blur" }],
        rpersonnel: [
          { required: true, message: "请输入回收员", trigger: "blur" }
        ],
        rphone: [
          { required: true, message: "请输入回收人电话", trigger: "blur" }
        ],
        status: [{ required: true, message: "请输入状态", trigger: "blur" }]
      },
      isEdit: false,
      id: ""
    };
  },
  created() {
    this.getList();
  },
  methods: {
    cancel() {
      this.dialogFormVisible = false;
      this.isEdit = false;
    },
    async save() {
      if (this.isEdit) {
        await this.$http.put(`rest/orders/${this.id}`, this.temp);
        this.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "编辑成功"
        });
        this.isEdit = false;
        this.reload();
      } else {
        await this.$http.post("rest/orders", this.temp);
        this.dialogFormVisible = false;
        this.$message({
          type: "success",
          message: "新建成功"
        });
        this.reload();
      }
    },
    async remove(row) {
      this.$confirm(
        `此操作将永久删除 "${row._id}" 这个订单, 是否继续?`,
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }
      )
        .then(async () => {
          const res = await this.$http.delete(`rest/orders/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.reload();
          this.fetch();
        })
        .catch(() => {});
    },
    //
    async getList() {
      this.listLoading = true;
      const res = await this.$http.get(`rest/orders`);
      this.list = res.data;
      console.log(res);
      setTimeout(() => {
        this.listLoading = false;
      }, 1.5 * 1000);
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    resetTemp() {
      this.id = "";
      this.temp = {
        address: "",
        ctime: "",
        rtime: "",
        rpersonnel: "",
        rphone: "",
        status: "已完成",
        tprice: "",
        cphone: "",
        rdate: ""
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
          this.temp.author = "vue-element-admin";
          createArticle(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "Success",
              message: "Created Successfully",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row);
      this.id = row._id;
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.isEdit = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    async updateData(id) {
      this.dialogStatus = 'update'
      this.isEdit = true
      this.dialogFormVisible = true
      this.id = id
      const res = await this.$http.get(`rest/orders/${id}`);
      this.temp = res.data
    },
    getSearch(id) {
      this.updateData(id)
    }
  }
};
</script>
<style scoped>
.dialog-footer {
  display: flex;
}
</style>