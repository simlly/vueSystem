<template>
  <el-row type="flex" class="login" justify="center" align="middle">
    <el-form :model="form" label-width="80px">
      <div class="title">登录</div>
      <el-form-item label="账号">
        <el-input v-model="form.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.upwd" type="password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        uname: "",
        upwd: ""
      }
    };
  },
  methods: {
    // 发送请求  登陆成功就跳到admin页面  否则跳出提示框
    onSubmit() {
      this.$axios({
        url: "/admin/account/login",
        method: "POST",
        data: this.form,
        withCredentials: true
      }).then(res => {
        console.log(res)
        // 结构
        const {status,message}=res.data;
        if(status==1){
          this.$message.error(message);
        }else{
          this.$router.push('/admin');
          console.log(this.$router)
        }
      });
    },
    onReset() {
      //   console.log(this.form)
      this.form = {
        uname: "",
        upwd: ""
      };
    }
  }
};
</script>

<style scoped>
.login {
  position: absolute;
  width: 100%;
  top: 0;
  bottom: 0;
}
form {
  width: 400px;
}
.title {
  color: #66b1ff;
  text-align: center;
  margin-bottom: 30px;
  margin-left: 80px;
}
.el-form-item:last-child {
  text-align: center;
}
</style>
