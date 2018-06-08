<template>
  <div class="header">
    <div class="header-content">
      <nav class="header-top">
        <div class="header-title">{{systemName}}</div>
        <div class="header-toolbar">
          <vHeaderBar ref="headerBar"></vHeaderBar>
        </div>
      </nav>
      <el-collapse-transition>
        <nav class="header-menu uk-navbar">
          <div class="header-logo">
            <a href="javascript:void(0);">
              <!-- <img :src="compImages.imgLogo"> -->
              <img class="logo-title" :src="compImages.imgTitle" v-show="showLogoTitle">
            </a>
          </div>
          <vHeaderMenu></vHeaderMenu>
          <!-- <vHeaderWeather></vHeaderWeather> -->
        </nav>
      </el-collapse-transition>
    </div>
  </div>
</template>

<script>
  import vHeaderBar from './HeaderBar.vue';
  import vHeaderMenu from './HeaderMenu.vue';

  export default {
    components: {
      vHeaderBar,
      vHeaderMenu
    },
    data() {
      return {
        /** 组件绑定图片 */
        compImages: {
          imgLogo: require('@/assets/images/header/logo.png'),
          imgTitle: require('@/assets/images/header/logo_title.png')
        },
        /** 是否显示标题Logo */
        showLogoTitle: true
      };
    },
    computed: {
      systemName() {
        return constants.SYSTEM_NAME;
      }
    },
    mounted() {
    },
    methods: {
    }
  };
</script>

<style>
  @import url('../../assets/styles/header.css');
</style>