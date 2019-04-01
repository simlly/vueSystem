<template>
  <div>
    <el-row type="flex" justify="space-between" style="margin:20px 0;">
      <div>
        <el-button @click="handleAdd">新增</el-button>
        <el-button @click="handleDelets">删除</el-button>
      </div>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchvalueCache" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </el-col>
    </el-row>

    <!-- 表格内容部分 -->

    <el-table
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <el-row type="flex">
            <img :src="scope.row.imgurl" class="biaoti-img">
            {{ scope.row.title}}
          </el-row>
        </template>
      </el-table-column>
      <!-- 类型 -->
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
      <!-- 价格 -->
      <el-table-column prop="sell_price" label="价格" show-overflow-tooltip></el-table-column>
      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件部分 -->
    <el-pagination
      style="margin-top:20px;"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //当前页
      currentPage4: 4,
      //   表格的数据
      tableData: [],
      multipleSelection: [],
      pageIndex: 1,
      pageSize: 5,
      searchvalue: "",
      searchvalueCache: "",
      total: 0,
      ids: []
    };
  },
  //   加载后牛显示列表数据
  mounted() {
    this.goodList();
  },
  methods: {
    //   编辑按钮
    handleEdit(index, row) {
      console.log(row)
      this.$router.push(`/admin/goods-edit/${row.id}`)
      // this.$router.push(`/admin/goods-edit`)
    },

    // 删除按钮
    handleDelete(index, row) {
      // console.log(index)
      //  console.log(row.id)
      this.$axios({
        url: `/admin/goods/del/${row.id}`,
        withCredentials: true
      }).then(res => {
        console.log(res);
        const { status, message } = res.data;
        if (status == 0) {
          this.$message({
            message,
            type: "success"
          });
          this.goodList();
        }
      });
    },

    // 多选按钮  遍历生成新的数组 id
    handleSelectionChange(val) {
      const ids = val.map(v => {
        return v.id;
      });
      this.ids = ids;
    },
    // 多选删除
    handleDelets() {
      console.log(this.ids);
      if (this.ids == []) {
        this.$message.error("请选择要删除的数据");
      }
      this.$axios({
        url: `/admin/goods/del/${this.ids.join(",")}`,
        withCredentials: true
      }).then(res => {
        // console.log(res);
        const { status, message } = res.data;
        if (status == 0) {
          this.$message({
            message,
            type: "success"
          });
          this.goodList();
        }
      });
    },

    // 新增按钮
    handleAdd() {
      this.$router.push('/admin/goods-add')
    },

    // 搜索框
    handleSearch() {
      this.searchvalue = this.searchvalueCache;
      this.pageIndex = 1;
      this.goodList();
    },

    // 获取商品数据
    goodList() {
      this.$axios({
        url: "/admin/goods/getlist",
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          searchvalue: this.searchvalue
        }
      }).then(res => {
        // 把获取的数据给摆个数据
        this.tableData = res.data.message;
        // 总条数
        this.total = res.data.totalcount;
        console.log(this.searchvalue);
        // this.input5=res.data.title
        // console.log(res);
      });
    },
    // 分页部分处理
    // 页面条数改变
    handleSizeChange(val) {
      this.pageSize = val;
      this.goodList();
    },
    // 当前页改变
    handleCurrentChange(val) {
      this.pageIndex = val;
      this.goodList();
    },

    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    }
  }
};
</script>

<style scoped>
.biaoti-img {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  flex-shrink: 0;
}
</style>
