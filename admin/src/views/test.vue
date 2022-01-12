<template>
  <div>
    <input type="radio" name="radios" value="1" id="male" /><label for="male">one</label>
    <br />
    <input type="radio" name="radios" value="2" id="males"/><label for="males">two</label>
    <br />
    <input type="radio" name="radios" value="2" /><label>three</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      msgame: "",
      styles: {
        color: "red",
      },
    };
  },
  methods: {
    checkname: function () {
      const rname = "abcd";
      if (this.name == "") {
        this.msgame = "用户名不能为空";
      } else if (this.name != rname) {
        this.msgame = "输入错误";
      }
    },
  },
};
</script>

<style>
</style>