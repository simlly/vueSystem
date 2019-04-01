<template>
  <el-row type="flex" justify="space-between" align="middle">
    <i class="el-icon-back" @click="handleClick"></i>
    <div>
      admin 超级管理员
      <span class="back" @click="handleBack">退出</span>
    </div>
  </el-row>
</template>

<script>
export default {
  methods: {
    handleClick(){
      this.$emit("changeShow")
    },
    // 退出按钮
    handleBack(){
      this.$axios({
        url:'/admin/account/logout',
        withCredentials: true
      }).then(res=>{
        console.log(res)
        if(res.data.status==0){
          this.$router.replace('/login')
        }
      })

    }
  }
};
</script>

<style scoped>
.back {
  cursor: pointer;
}
</style>
