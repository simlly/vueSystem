<template>
<div>
<el-breadcrumb separator-class="el-icon-arrow-right">
  <el-breadcrumb-item v-for='(item,index) in routerInfo' :key='index'>{{item}}</el-breadcrumb-item>
</el-breadcrumb>
</div>
</template>

<script>
export default {
  computed: {
    routerInfo() {
        var arr=this.$route.matched.map(v=>{
            return v.meta
        //    console.log(v.meta) 
        });
        return arr
        // console.log(arr)
        
    }
  }
};
</script>

<style>
</style>
