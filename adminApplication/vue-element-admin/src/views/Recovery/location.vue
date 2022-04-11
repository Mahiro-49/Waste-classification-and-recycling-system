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
        ></el-option>
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="getSearch">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="createItem">
        添加
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="回收地点" prop="location" width="400">
      </el-table-column>
      <el-table-column align="center" label="回收站名称" prop="name" width="400">
      </el-table-column>
      <el-table-column width="180px" align="center" prop="person" label="负责人">
      </el-table-column>
      <el-table-column width="250px" align="center" prop="iphone" label="联系电话">
      </el-table-column>
      <el-table-column min-width="100px" align="center" prop="time" label="回收时间">
      </el-table-column>
      <el-table-column width="200px" align="center" prop="status" label="营业状态">
      </el-table-column>
      <el-table-column align="center" label="操作" width="240">
        <template slot-scope="scope">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-edit"
            @click="updateData(scope.row._id)"
          >
            编辑
          </el-button>
          <el-button
            type="danger"
            size="small"
            icon="el-icon-remove"
            @click="remove(scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" @submit.native.prevent="save" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="回收地点" prop="location">
          <el-input v-model="temp.location"  placeholder="请输入回收地点" />
        </el-form-item>
        <el-form-item label="回收站名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入回收站名称" />
        </el-form-item>
        <el-form-item label="负责人" prop="person">
          <el-input v-model="temp.person" placeholder="请输入回收站负责人" />
        </el-form-item>
        <el-form-item label="联系电话" prop="iphone">
          <el-input v-model="temp.iphone" placeholder="请输入回收站联系电话" />
        </el-form-item>
        <el-form-item label="回收时间">
          <div class="time-wrapper">
            <el-time-select
              placeholder="起始时间"
              v-model="startTime"
              :picker-options="{
                start: '07:00',
                step: '00:15',
                end: '24:00'
              }">
            </el-time-select>
            <el-time-select
              placeholder="结束时间"
              v-model="endTime"
              :picker-options="{
                start: '07:00',
                step: '00:15',
                end: '24:00',
                minTime: startTime
              }">
            </el-time-select>
          </div>
        </el-form-item>
        <el-form-item label="营业状态" prop="status">
          <el-select v-model="temp.status" class="filter-item" placeholder="请选择状态">
            <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item" />
          </el-select>
        </el-form-item>
        <div class="dialog-footer">
          <el-form-item>
            <el-button @click="cancel">
              取消
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" native-type="submit">
              保存
            </el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: 'Category',
  inject: ['reload'],
  data() {
    return {
      id: '',
      list: null,
      search: [],
      listLoading: true,
      textMap: {
        update: '编辑项目',
        create: '新建项目'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        name: '',
        icon: '',
        price: '',
        location: '',
        iphone: '',
        time: ''
      },
      isEdit: false,
      startTime: '',
      endTime: '',
      statusOptions: ["营业中", "休息中"],
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/words");
      this.list = res.data;
      this.listLoading = false
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
          const res = await this.$http.delete(`rest/words/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!",
          });
          this.fetch();
        })
        .catch(() => {
        });
    },
    createItem() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    async save() {
      if (this.isEdit) {
        this.temp.time = this.startTime + '-' + this.endTime
        const res = await this.$http.put(`rest/words/${this.id}`, this.temp);
        console.log(res);
        this.dialogFormVisible = false
        this.$message({
          type: "success",
          message: "编辑成功"
        })
        this.isEdit = false
        this.reload()
      } else {
        this.temp.time = this.startTime + '-' + this.endTime
        const res = await this.$http.post("rest/words", this.temp);
        console.log(res);
        this.dialogFormVisible = false
        this.$message({
          type: "success",
          message: "新建成功"
        })
        this.reload()
      }
    },
    cancel() {
      this.dialogFormVisible = false
      this.temp.name = ''
      this.temp.icon = ''
      this.temp.preCategory = ''
      this.temp.danger = 0
      this.temp.tips = ''
      this.isEdit = false
    },
    afterUpload(res) {
      this.$set(this.temp, 'icon', res.url);   // 显示赋值 在model上添加icon属性
    },
    async updateData(id) {
      this.dialogStatus = 'update'
      this.isEdit = true
      this.dialogFormVisible = true
      this.id = id
      const res = await this.$http.get(`rest/words/${id}`);
      this.temp = res.data
    },
    getSearch(id) {
      this.updateData(id)
    }
  }
}
</script>

<style scoped>
.filter-item {
  margin-bottom: 3px;
}
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
  border: 1px dashed #d9d9d9;
}
.avatar {
  width: 150x;
  height: 150px;
  border-radius: 6px;
  display: block;
}
.dialog-footer {
  display: flex;
}
.time-wrapper {
  display: flex;
}
</style>
