<template>
	<el-dialog title="设置密码" :visible.sync="visible" :top="dialogTop" :modal-append-to-body="true" :close-on-press-escape="false" :close-on-click-modal="false" size="tiny" @open="handleDlgOpen" @close="handleClose">
		<el-form :model="form" :rules="rules" ref="form" label-position="top" label-width="100px">
			<el-form-item required label="验证原密码：" prop="oldPw">
				<el-input v-model="form.oldPw" size="large" placeholder="请先验证原密码(6 到 12 位字符)" type="password" :maxlength="12" auto-complete="off" onfocus="this.type='password'"></el-input>
			</el-form-item>
			<el-form-item required label="设置新密码：" prop="newPw">
				<el-input v-model="form.newPw" size="large" placeholder="最小长度为6个字符" type="password" :maxlength="12" auto-complete="off"></el-input>
			</el-form-item>
			<el-form-item required label="确认新密码：" prop="confirmPw">
				<el-input v-model="form.confirmPw" size="large" placeholder="最小长度为6个字符" type="password" :maxlength="12" auto-complete="off" onfocus="this.type='password'"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" style="text-align:center;">
			<el-button type="large" class="btn-common btn-ok" @click="handleSubmit">确定</el-button>
		</div>
	</el-dialog>
</template>
<script>
export default {
  data() {
    //原密码
    var vOldPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请验证原密码!"));
      } else if (value.length > 12 || value.length < 6) {
        callback(new Error("密码长度应为 6 到 12 位字符!"));
      } else {
        callback();
      }
    };
    //新密码
    var vNewPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请设置新密码!"));
      } else if (value.length < 6 || value.length > 12) {
        callback(new Error("密码长度应为 6 到 12 位字符!"));
      } else {
        callback();
      }
    };
    //确认密码
    var vConfirmPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.form.newPw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      /** 密码修改对话框变量 */
      visible: false,
      form: {
        oldPw: "",
        newPw: "",
        confirmPw: ""
      },
      /** 验证规则 */
      rules: {
        oldPw: [{ validator: vOldPass, trigger: "blur" }],
        newPw: [{ validator: vNewPass, trigger: "blur" }],
        confirmPw: [{ validator: vConfirmPass, trigger: "blur" }]
      },
      dialogTop: "10px"
    };
  },
  methods: {
    /** 取消密码修改 */
    handleClose() {
      this.$refs["form"].resetFields();
    },
    /** 打开事件跳转弹出框垂直居中 */
    handleDlgOpen() {
      this.$nextTick(() => {
        let wHeight = document.body.clientHeight;
        let dHeight = utilsOper.getStyleValue(
          this.$el.querySelector(".el-dialog"),
          "height"
        );
        this.dialogTop = (wHeight - dHeight) / 2 + "px";
      });
    },
    /** 提交密码修改 */
    handleSubmit() {
      let that = this;
      let params = {
        userId: lscache.get("userId"),
        oldPwd: this.form.oldPw,
        newPwd: this.form.newPw
      };

      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$popup.showConfirm({
            message: "你确定要修改密码吗?",
            successFunc: () => {
              that.$ajax.ajaxHttp({
                type: "post",
                postType: "form",
                url: "/permission/user/changePwd",
                data: params,
                successFunc: data => {
                  if (data.code == 200) {
                    that.$popup.showSuccessNoti({
                      message: "密码修改成功！"
                    });
                  } else {
                    that.$popup.showErrorNoti({
                      message: "密码修改失败！"
                    });
                  }
                  that.visible = false;
                }
              });
            }
          });
        }
      });
    }
  }
};
</script>
