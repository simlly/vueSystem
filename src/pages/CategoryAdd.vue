<template>
  <el-row type="flex" :gutter="12">
    <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px;">
      <el-form-item label="所属父类别">
        <!-- value是点击到谁  就根据id显示出title -->
        <el-select v-model="form.category_id" placeholder="请选择">
          <el-option
            v-for="(item,index) in categorys"
            :key="index"
            :label="item.title"
            :value="item.category_id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="排序数字">
        <el-input v-model="form.sort_id"></el-input>
        <span class="tips">*栏目排序,排序不能小于( 0 )</span>
      </el-form-item>
      <el-form-item label="类别名称">
        <el-input v-model="form.title"></el-input>
        <span class="tips">*类别中文名称，100字符内</span>
      </el-form-item>
      <el-form-item label="类别级别">
        <el-input v-model="form.class_layer"></el-input>
        <span class="tips">类别的级别，1:1级菜单 2：二级菜单 依次类推</span>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      form: {
        category_id: "",
        title: "",
        sort_id: "",
        class_layer: ""
      },
      categorys:[]
    };
  },
  methods: {
    onSubmit() {
      this.$axios({
        url:'/admin/category/add/goods',
        method:'POST',
        data:this.form,
        withCredentials: true
      }).then(res=>{
        console.log(res)
        const {status,message}=res.data;
        if(!status){
          this.$message({
            message,
            type:'success'
          })
          this.$router.back()
        }
      })
    }
  },
  mounted(){
     // 获取类别数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      console.log(res)
      const { message } = res.data;
      this.categorys = message;
    });
  }
};
</script>

<style>
.tips {
  color: #a8a9aa;
  margin-left: 20px;
  font-size: 10px;
}
.el-form-item__content .el-input {
  width: 60%;
}
</style>
