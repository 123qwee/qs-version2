<template>
  <el-upload ref="upload" :file-list="picList" :limit="6" :action="UPLOAD_URL" :on-success="handleUploadSuccess" :on-remove="handleUploadRemove" :on-error="handleUploadError" :on-preview="handleUploadPreview" :before-upload="handleUploadBefore" :on-exceed="handleUploadExceed" multiple list-type="picture-card">
    <i class="el-icon-plus"></i>
    <div slot="tip" class="upload-tip">只能上传jpg/png文件，且不超过3M</div>
  </el-upload>
</template>

<script>
import fileOper from "../../assets/scripts/ajax/fileOper.js";

export default {
  props: {
    oldImage: {
      type: String,
      default: {}
    }
  },
  data() {
    return {
      //原始图片
      oldFileList: [],
      // 已上传附件编号集合
      fileList: [],
      // 存储带后缀名的文件名集合
      fileIdList: [],
      //获取原有图片
      picList: [],
      // 附件上传地址
      UPLOAD_URL: constants.UPLOAD_URL
    };
  },
  created() {
    this.getUrlInfo();
  },
  watch: {
    oldImage(nValue, oValue) {
      this.getUrlInfo();
    }
  },
  methods: {
    getUrlInfo() {
      let that = this;
      let imageList = [];
      this.fileList = [];
      if (this.oldImage == null) {
        imageList = [];
      } else {
        imageList = this.oldImage.split(",");
      }
      this.picList = [];
      _.map(imageList, id => {
        let img = {
          name: id + ".jpg",
          url: constants.READ_FILE_URL + "/" + id
        };
        that.picList.push(img);
        that.fileList.push(id);
      });
    },
    // 附件上传成功回调函数
    handleUploadSuccess(response, file, fileList) {
      // this.getUrlInfo();
      if (response.code == 200) {
        this.oldFileList = this.fileList;
        this.fileIdList.push(response.data.id + "." + response.data.type);
        this.fileList.push(response.data.id);
      }
    },
    // 附件改变回调函数
    handleUploadChange(file, fileList) {},
    // 附件从列表移除时请求后台删除该附件
    handleUploadRemove(file, fileList) {
      // this.getUrlInfo();
      let that = this;

      // 如果移除文件不存在，取消执行
      if (!file) {
        return false;
      }
      let fileId;
      if (file.response == undefined) {
        fileId = file.name.substring(0, file.name.indexOf("."));
      } else {
        fileId = file.response.data.id;
      }

      fileOper.fileDeleteOne({
        ids: fileId,
        successFunc: data => {
          that.fileList = _.pull(that.fileList, fileId);
        }
      });
    },
    // 附件上传失败回调函数
    handleUploadError(err, file, fileList) {
      console.log(err);
    },
    // 附件预览
    handleUploadPreview(file, fileList) {
      // 获取文件访问地址数组
      const fileUrls = _.map(this.fileList, url => {
        return constants.READ_FILE_URL + "/" + url + ".jpg";
      });
      this.$root.$children[0].$refs["vGallery"].fileUrls = fileUrls;
      this.$root.$children[0].$refs["vGallery"].index = 0;
      this.$root.$children[0].$refs["vGallery"].visible = true;
    },
    // 附件上传前验证操作
    handleUploadBefore(file) {
      // 如果图片大于3M，提示用户
      if (file.size > 3145728) {
        this.$popup.showNotification({
          message: "附件大小不能超过3M!"
        });
        return false;
      } else if (_.indexOf(constants.SUPPORT_IMAGE_TYPE, file.type) < 0) {
        this.$popup.showNotification({
          message: "附件格式不支持!"
        });
        return false;
      }
    },
    // 限制文件上传个数
    handleUploadExceed(files, fileList) {
      this.$popup.showNotification({
        message: `最大上传附件6个，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件。`
      });
    },
    // 清除已上传附件
    clearFileList() {
      this.getUrlInfo();
      this.fileIdList = [];
      this.$refs["uploadEdit"].clearFiles();
    }
  }
};
</script>

<style>
.upload-tip {
  font-size: 12px;
  color: #8391a5;
}
</style>
