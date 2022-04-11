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
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="createItem">
        添加
      </el-button>
    </div>
    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <!-- <el-table-column align="center" label="ID" prop="_id" width="250">
      </el-table-column> -->
      <el-table-column width="180px" align="center" prop="preCategory" label="上级分类">
      </el-table-column>
      <el-table-column width="120px" align="center" prop="name" label="垃圾名称">
      </el-table-column>
      <el-table-column width="600px" align="center" prop="danger" label="小提示">
      </el-table-column>
      <el-table-column class-name="status-col" label="图片" prop="icon" width="auto">
        <template slot-scope="scope">
          <img :src="scope.row.icon" alt="" style="height: 3rem" />
        </template>
      </el-table-column>
      <el-table-column min-width="300px" align="center" prop="tips" label="描述">
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
    <el-pagination
      class="pagination"
      background
      layout="prev, pager, next"
      :total="100">
    </el-pagination>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form ref="dataForm" :model="temp" @submit.native.prevent="save" label-position="left" label-width="90px" style="width: 400px; margin-left:50px;">
        <el-form-item label="上级分类" prop="preCategory">
          <el-input v-model="temp.preCategory"  placeholder="请输入" />
        </el-form-item>
        <el-form-item label="垃圾名称" prop="name">
          <el-input v-model="temp.name" placeholder="请输入" />
        </el-form-item>
        <el-form-item label="描述" prop="tips">
          <el-input v-model="temp.tips" />
        </el-form-item>
        <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            :action="$http.defaults.baseURL + '/upload'"
            :show-file-list="false"
            :on-success="afterUpload"
          >
            <img v-if="temp.icon" :src="temp.icon" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="小提示">
          <el-input v-model="temp.danger" />
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
        update: '编辑',
        create: '新建'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      temp: {
        name: '',
        icon: '',
        preCategory: '',
        danger: "",
        tips: '',
      },
      isEdit: false
    }
  },
  created() {
    this.fetch()
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/items");
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
          const res = await this.$http.delete(`rest/items/${row._id}`);
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
        await this.$http.put(`rest/items/${this.id}`, this.temp);
        this.dialogFormVisible = false
        this.$message({
          type: "success",
          message: "编辑成功"
        })
        this.isEdit = false
        this.reload()
      } else {
        await this.$http.post("rest/items", this.temp);
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
      this.temp.danger = ""
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
      const res = await this.$http.get(`rest/items/${id}`);
      this.temp = res.data
    },
    async getSearch(id) {
      this.updateData(id)
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 30px;
  margin-left: 850px;
  margin-bottom: 100px;
}
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
</style>
