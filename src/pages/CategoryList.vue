<template>
  <div>
    <el-row type="flex" justify="space-between" style="margin:20px 0;">
      <div>
        <el-button @click="handleAdd">新增</el-button>
        <el-button @click="handleDelets">删除</el-button>
      </div>
    </el-row>
    <!-- data展示数据 -->
    <el-tree :data="[0]">
      <div class="custom-tree-node">
        <span>分类</span>
        <span>排序</span>
        <span>操作</span>
      </div>
    </el-tree>
    <el-tree
      :data="data"
      show-checkbox
      node-key="id"
      default-expand-all
      :expand-on-click-node="false"
    >
      <!-- 当前行数据，是一个对象,row.data才是当前行的数据  -->
      <span class="custom-tree-node" slot-scope="row">
        <span>{{ row.data.label }}</span>
        <span>
          <!-- v-model才可以修改value值 -->
          <!-- <el-input class="elInput" :value="row.data.sort_id" ></el-input> -->
          <!-- 给input注册失去焦点  或者change事件 -->
          <el-input class="elInput" v-model="row.data.sort_id" @change="handleEdit(row.data)"></el-input>
        </span>
        <span>
          <el-button type="text" size="mini">编辑</el-button>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: []
    };
  },
  methods: {
    // 新增按钮
    handleAdd() {
      this.$router.push("/admin/category-add");
    },
    // 删除按钮
    handleDelets() {},
    append(data) {
      const newChild = { id: id++, label: "testtest", children: [] };
      if (!data.children) {
        this.$set(data, "children", []);
      }
      data.children.push(newChild);
    },
    // 编辑input的值
    handleEdit(data) {
        console.log(data)
      this.$axios({
        url: `/admin/category/edit/${data.id}`,
        method: "POST",
        data,
        withCredentials: true
      }).then(res => {
          
        const { message } = res.data;
        this.$message({
          message,
          type: "success"
        });
      });
    }
  },
  mounted() {
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      console.log(res);
      const { status, message } = res.data;
      if (!status) {
        this.data = message.map(v => {
          return {
            ...v,
            id: v.category_id,
            label: v.title
          };
        });
        console.log(this.data);
      }
    });
  }
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
.elInput input {
  width: 80px;
  height: 20px;
  line-height: 20px;
}
</style>
