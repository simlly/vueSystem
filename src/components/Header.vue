<template>
  <el-row type="flex" justify="space-between" align="middle">
    <i class="el-icon-back" @click="handleClick"></i>
    <div>
     {{user.username}} {{user.realname}}
      <span class="back" @click="handleBack">退出</span>
    </div>
  </el-row>
</template>

<script>
import {mapState} from "vuex";
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

    },
    computed: {
        ...mapState({
            user: "user"
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
