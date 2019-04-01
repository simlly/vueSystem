<template>
  <el-form ref="form" :model="form" label-width="80px" style="margin-top:20px;">
    <el-form-item label="所属类别">
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
    <el-form-item label="是否发布">
      <el-switch v-model="form.status"></el-switch>
      <span class="tips">*不发布前台则无法显示</span>
    </el-form-item>
    <el-form-item label="推荐类型">
      <el-checkbox label="置顶" v-model="form.is_top"></el-checkbox>
      <el-checkbox label="热门" v-model="form.is_hot"></el-checkbox>
    </el-form-item>
    <el-form-item label="内容标题">
      <el-input v-model="form.title"></el-input>
    </el-form-item>
    <el-form-item label="副标题">
      <el-input v-model="form.sub_title"></el-input>
    </el-form-item>
    <el-form-item label="封面图片">
      <!-- action：图片上传的路径 axios指定了默认路径 但是这个路径很axios没关系  还要加上 
      存到数据库
      -->
      <el-upload
        class="avatar-uploader"
        action="http://localhost:8899/admin/article/uploadimg"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
    </el-form-item>
    <el-form-item label="商品货号">
      <el-input v-model="form.goods_no"></el-input>
    </el-form-item>
    <el-form-item label="库存数量">
      <el-input v-model="form.stock_quantity"></el-input>
      <span class="tips">*我不确定要不要自动生成</span>
    </el-form-item>
    <el-form-item label="市场价格">
      <el-input v-model="form.market_price"></el-input>
    </el-form-item>
    <el-form-item label="销售价格">
      <el-input v-model="form.sell_price"></el-input>
    </el-form-item>
    <el-form-item label="图片相册">
      <!-- file-lis用于显示相册图片  此处显示图片的方式不是img -->
      <el-upload
        action="http://localhost:8899/admin/article/uploadimg"
        list-type="picture-card"
        :on-preview="handlePictureCardPreview"
        :file-list="form.fileList"
        :on-remove="handleRemove"
        :on-success="handleSuccessPicture">
        <i class="el-icon-plus"></i>
      </el-upload>
      <el-dialog :visible.sync="dialogVisible">
        <img width="100%" :src="dialogImageUrl" alt>
      </el-dialog>
    </el-form-item>

    <el-form-item label="内容摘要">
      <el-input type="textarea" v-model="form.zhaiyao"></el-input>
    </el-form-item>
    <div class="editor">
      <el-form-item label="内容描述">
        <quill-editor v-model="form.content"></quill-editor>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
// 富文本样式
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  data() {
    return {
      form: {
        category_id: "",
        status: false,
        is_top: false,
        is_hot: false,
        title: "",
        sub_title: "",
        imgList: [],
        fileList: [],
        goods_no: "",
        stock_quantity: "",
        market_price: "",
        sell_price: "",
        zhaiyao: "",
        content: "",
        is_slide: false
      },
      categorys: [],
      imageUrl: "",
      dialogImageUrl: "",
      dialogVisible: false
    };
  },
  methods: {
    onSubmit() {
      //   点击创建 提交form数据(根据提供的接口把数据传回后台)   返回上一页
      this.$axios({
        url: `/admin/goods/edit/${this.$route.params.id}`,
        method: "POST",
        data: this.form,
        withCredentials: true
      }).then(res => {
        // console.log(res)
        const { message } = res.data;
        this.$message({
          message,
          type: "success"
        });
        this.$router.back();
      });
    },
    //封面图   上传成功
    handleAvatarSuccess(res, file) {
      //    图片上传成功后res(返回的是name,url,shorturl)
      this.imageUrl = URL.createObjectURL(file.raw);
      // 请求要带参数  正是res返回的内容  封面上传只有一张图片[0]
      this.form.imgList[0] = res;
    },
    //   上传前
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    //图片相册    删除图片
    handleRemove(file, fileList) {
      this.form.fileList = fileList.map(v => {
        return v.response;
      });
      //   console.log( this.form.imgList);
    },
    // 预览图片
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleSuccessPicture(res) {
      // 上传成功就把数据（res） 追加到数组里面
      this.form.fileList.push(res);
    }
  },
  mounted() {
    // 获取类别数据
    this.$axios({
      url: "/admin/category/getlist/goods"
    }).then(res => {
      const { message } = res.data;
      this.categorys = message;

      // console.log(this.categorys)
    });
    // 根据id展示对应的数据
    const id = this.$route.params.id;
    this.$axios({
      url: `/admin/goods/getgoodsmodel/${id}`
    }).then(res => {
      const { message } = res.data;
      this.form = message;
      // 因为是form表单收集数据  但是在上面定义的data里 imageUrl不是表单里的 重新赋值
      this.imageUrl = message.imgList[0].url;
       this.form.fileList = message.fileList.map(v=> {
        return {
          ...v,
          url: `http://127.0.0.1:8899` + v.shorturl
        }
        
      })
      // console.log(res);
      console.log(this.form.fileList)
    });
  },
  components: { quillEditor }
};
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.tips {
  color: #a8a9aa;
  margin-left: 20px;
  font-size: 10px;
}
.editor .el-form-item__content {
  line-height: unset;
}
</style>
