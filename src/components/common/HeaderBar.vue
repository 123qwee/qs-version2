<template>
  <div class="headerbar">
    <img class="headerbar-user-img" :src="imgUser">
    <span class="headerbar-user-name">欢迎您，{{userName}}</span>
    <el-popover popper-class="headerbar-popover" visible-arrow="false" placement="bottom" trigger="click" style="vertical-align:middle;">
      <span slot="reference">
        <img class="headerbar-action-img" :src="compImages.imgMore">
      </span>
      <ul class="header-uk-menu uk-nav uk-nav-dropdown">
        <li class="popover-submenu" @click="handleLogOut">
          <a>
            <i class="material-icons">power_settings_new</i>注销</a>
        </li>
        <li class="popover-submenu" @click="handleUpdatePw">
          <a>
            <i class="material-icons">settings_backup_restore</i>修改密码</a>
        </li>
      </ul>
    </el-popover>
    <!--<img class="headerbar-action-img" :src="compImages.imgSkin" title="换肤" @click="handleSkin" />-->
    <!-- <img class="headerbar-action-img" :src="compImages.imgFull" title="全屏" @click="handleScreen"> -->
    <vUpdatePw ref="vUpdatePw"></vUpdatePw>
  </div>
</template>

<script>
import vUpdatePw from '@/components/password/UpdatePw.vue';
export default {
  components: {
    vUpdatePw
  },
  data() {
    return {
      userName: '尊敬的用户',
      /** 组件绑定图片 */
      compImages: {
        imgMore: require('@/assets/images/header/icon_tc.png'),
        imgFull: require('@/assets/images/header/icon_fd.png'),
        imgSkin: require('@/assets/images/header/icon_pf.png')
      },
      isChange: false
    };
  },
  mounted: function() {
    // 设置登录用户名
    if (lscache.get('realname')) {
      this.userName = lscache.get('realname');
    }
  },
  computed: {
    imgUser() {
      return lscache.get('avatar')
        ? constants.SERVER_URL + lscache.get('avatar')
        : require('@/assets/images/avatar.png');
    }
  },
  methods: {
    // 注销用户
    handleLogOut() {
      let that = this;

      popupOper.showConfirm({
        message: '是否注销当前登录用户?',
        title: '用户注销',
        successFunc: () => {
          this.$ajax.ajaxHttp({
            type: 'get',
            url: '/buss/permission/logout',
            successFunc: data => {
              if (data.code == 200) {
                // 清空本地存储离线数据
                lscache.flush();
                /** 注销成功，返回登录界面 */
                that.$router.push('/Login');
              }
            }
          });
        }
      });
    },
    /** 修改密码 */
    handleUpdatePw() {
      this.$refs['vUpdatePw'].visible = true;
    },
    handleScreen: function() {
      if (this.isChange) {
        return;
      }

      this.isChange = true;
      this.$bus.$emit('triMenuShowChange', {});
    },
    /** 换肤 */
    handleSkin: function() {
      // $(".menu_caption").toggleClass('menu_caption_black');
    }
  }
};
</script>
<style>

</style>
