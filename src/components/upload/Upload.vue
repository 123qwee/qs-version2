<template>
  <el-upload ref="upload" :limit="6" :action="UPLOAD_URL" :on-success="handleUploadSuccess" :on-remove="handleUploadRemove" :on-error="handleUploadError" :on-preview="handleUploadPreview" :before-upload="handleUploadBefore" :on-exceed="handleUploadExceed" multiple list-type="picture-card">
    <i class="el-icon-plus"></i>
    <div slot="tip" class="upload-tip">只能上传jpg/png文件，且不超过3M</div>
  </el-upload>
</template>

<script>
import fileOper from "../../assets/scripts/ajax/fileOper.js";

export default {
  data() {
    return {
      // 已上传附件编号集合
      fileList: [],
      // 存储带后缀名的文件名集合
      fileIdList: [],
      // 附件上传地址
      UPLOAD_URL: constants.UPLOAD_URL
    };
  },
  methods: {
    // 附件上传成功回调函数
    handleUploadSuccess(response, file, fileList) {
      if (response.code == 200) {
        this.fileIdList.push(response.data.id + "." + response.data.type);
        this.fileList.push(response.data.id);
      }
    },
    // 附件改变回调函数
    handleUploadChange(file, fileList) {},
    // 附件从列表移除时请求后台删除该附件
    handleUploadRemove(file, fileList) {
      let that = this;
      // 如果移除文件不存在，取消执行
      if (!file) {
        return false;
      }

      const fileId = file.response.data.id;

      fileOper.fileDeleteOne({
        ids: fileId,
        successFunc: data => {
          that.fileList = _.filter(that.fileList, item => {
            return item.indexOf(fileId) < 0;
          });
          that.fileIdList = _.filter(that.fileIdList, item => {
            return item.indexOf(fileId) < 0;
          });
        }
      });
    },
    // 附件上传失败回调函数
    handleUploadError(err, file, fileList) {
      console.log(err);
    },
    // 附件预览
    handleUploadPreview(file) {
      // 当前选中文件编号
      let fileId = file.response.data.id;
      let fileIndex = 0;
      const fileUrls = _.map(this.fileIdList, (item, index) => {
        if (item == fileId) {
          fileIndex = index;
        }
        return constants.READ_FILE_URL + "/" + item;
      });

      this.$root.$children[0].$refs["vGallery"].fileUrls = fileUrls;
      this.$root.$children[0].$refs["vGallery"].index = fileIndex;
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
      this.fileList = [];
      this.fileIdList = [];
      this.$refs["upload"].clearFiles();
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
