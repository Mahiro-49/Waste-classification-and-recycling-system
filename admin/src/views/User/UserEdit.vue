<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="修改用户名">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="修改邮箱">
        <el-input v-model="model.email"></el-input>
      </el-form-item>
      <el-form-item label="修改头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.img" :src="model.img" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {},
  },
  data() {
    return {
      model: {},
    };
  },

  created() {
    this.id && this.fetch();
  },
  
  methods: {
    async save() {
      let res;
      if (this.id) {
        
        res = await this.$http.put(`getlist/${this.id}`, this.model);
      } else {
        res = await this.$http.post("getlist", this.model);
      }
      this.$router.push("/users/personal");
      if(res.data !== '没有权限') {
        this.$message({
        type: "success",
        message: "保存成功",
      });
      }
    },
    async fetch() {
      const res = await this.$http.get(`getlist/${this.id}`);
      this.model = res.data;
      console.log(this.model);
    },
    afterUpload(res) {
      this.$set(this.model, 'img', res.url);
    }
  },
};
</script>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>