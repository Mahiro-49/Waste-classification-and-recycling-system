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
        <el-input style="width: 20rem" v-model="model.price"></el-input>
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
        res = await this.$http.put(`rest/goods/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/goods", this.model);
      }
      this.$router.push("/goods/list");
      if(res.data !== "没有权限") {
        this.$message({
          type: "success",
          message: "保存成功",
        });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/goods/${this.id}`);
      this.model = res.data;
    },
    async fetchParents() {
      const res = await this.$http.get(`rest/categories`);
      this.parents = res.data;
    },
  },
};
</script>