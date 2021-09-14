<template>
  <div>
    <h1>项目{{ id ? "详情" : "新建" }}</h1>
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
        <el-input style="width: 20rem" v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="回收价格">
        <el-input style="width: 20rem" v-model="model.name"></el-input>
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
      this.$message({
        type: "success",
        message: "保存成功",
      });
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
      console.log(res);
      this.$set(this.model, 'icon', res.url);   // 显示赋值 在model上添加icon属性
    }
  },
};
</script>