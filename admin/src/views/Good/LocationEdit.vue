<template>
  <div>
    <h1>项目{{ id ? "详情" : "新建" }}</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="回收时间">
        <el-input style="width: auto" v-model="model.time"></el-input>
      </el-form-item>
      <el-form-item label="回收地点">
        <el-input style="width: auto" v-model="model.location"></el-input>
      </el-form-item>
      <el-form-item label="联系人">
        <el-input style="width: auto" v-model="model.person"></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input style="width: auto" v-model="model.phone"></el-input>
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
      startTime: "",
      endTime: "",
    };
  },

  created() {
    this.id && this.fetch();
  },

  methods: {
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`rest/apples/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/apples", this.model);
      }
      this.$router.push("/locations/list");
      if(res.data !== '没有权限') {
        this.$message({
        type: "success",
        message: "保存成功",
      });
      }
    },
    async fetch() {
      const res = await this.$http.get(`rest/apples/${this.id}`);
      this.model = res.data;
    },
  },
};
</script>