<template>
  <div>
    <h1>垃圾{{ id ? "详情" : "新建" }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="所属分类">
        <el-select v-model="model.parent">
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="垃圾名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="危险值">
        <el-rate style="margin-top: 0.7rem" show-score v-model="model.danger"></el-rate>
      </el-form-item>
      <el-form-item label="利用值">
        <el-rate style="margin-top: 0.7rem" show-score v-model="model.reuse"></el-rate>
      </el-form-item>
      <el-form-item label="垃圾图片">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.icon" :src="model.icon" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="小提示">
        <el-input type="textarea" v-model="model.tips"></el-input>
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
      model: {
        danger: 0,
        reuse: 0,
        tips: ''
      },
      parents: [],
    };
  },

  created() {
    this.fetchParents();
    this.id && this.fetch();
  },

  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/items/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/items", this.model);
      }
      this.$router.push("/items/list");
      if(res.data !== '没有权限') {
        this.$message({
        type: "success",
        message: "保存成功",
      });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/items/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    },
    afterUpload(res) {
      this.$set(this.model, 'icon', res.url);   // 显示赋值 在model上添加icon属性
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