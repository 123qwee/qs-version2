<template>
  <div class="sidebar uk-flex uk-flex-item-none" :class="[isCollapse ? 'sidebar-collapse' : '']">
    <el-menu ref="menu" background-color="#324157" text-color="#fff" active-text-color="#ffd04b" :default-active="onRoutes" @select="handleSelect"
      :class="classObject" :collapse="isCollapse" @open="sidebarOpenCall" unique-opened router>
      <div class="sidemenu-top-title">
        <span class="sidemenu-top-text" v-if="!isCollapse">{{menuName}}</span>
        <span class="sidemenu-tools" :class="[isCollapse?'sidemenu-tools-right':'sidemenu-tools-left']">
          <img :src="shrinkImg" :title="toggleTitle" @click="handleSidemenuToggle">
        </span>
      </div>
      <template v-for="(menu, index) in menus">
        <el-menu-item :class="{ 'is-menu-active': menu.path === currentMenu }" :index="menu.path" v-if="!menu.children || menu.children.length==0"
          :key="index">
          <img class="sidemenu-icon" :src="menu.img">
          <span slot="title" class="sidemenu-title">{{ menu.name }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
  import menus from '@/assets/scripts/config/menu_config.js';
  import { mapMutations } from 'vuex';

  export default {
    data() {
      return {
        state: 'init',
        // 菜单栏是否收缩
        isCollapse: false,
        // 是否显示菜单栏头部
        isShowTopTitle: true,
        // 后台服务获取当前用户权限
        permissions: [],
        // 当前用户菜单
        menus: [],
        // 默认菜单
        defaultMenus: _.cloneDeep(menus),
        // 当前系统登录用户编号
        userId: '',
        menuIndex: 0,
        menuName: '导航菜单',
        currentMenu: '',
        /** 判断是否默认加载第一个菜单，手动单击一级菜单时执行 */
        isTriggerMenu: false,
        /** 收缩按钮图标 */
        shrinkImg: require('@/assets/images/sidebar/shrink.png'),
        spreadImg: require('@/assets/images/sidebar/spread.png'),
      };
    },
    computed: {
      onRoutes() {
        return this.$route.path.replace('/', '');
      },
      isLeaf(menu) {
        return menu.children && menu.children.length > 0;
      },
      classObject() {
        return {
          'sidebar-menu': !this.isCollapse
        };
      },
      toggleTitle() {
        return this.isShowTopTitle ? '菜单收缩' : '菜单展开';
      }
    },
    created() {
      let that = this;
      if (lscache.get("permissions")) {
        this.calMenus(0);
      };
      /** 一级菜单改变，触发左侧菜单树变化 */
      this.$bus.$on('triMenuChange', function (index, isTriggerMenu) {
        that.calMenus(index);
        that.menuIndex = index;
      });
    },
    mounted() {
      let that = this;

      // 根据屏幕分辨率设置菜单收缩
      this.isCollapse = document.body.scrollWidth >= 1600 ? false : true;
    },
    methods: {
      ...mapMutations('systemInfo', [
        'systemSidberWidth',
        'sidebarOpenCall'
      ]),
      getIndex(index) {
        return index + '';
      },
      handleSelect(value) {
        let that = this;
        this.currentMenu = value;

        if (value.indexOf('EpiFormTmpl') >= 0) {
          let id = value.split('=')[1];
          this.$bus.$emit('triEpiFormUpdate', id);
        }
      },
      // 菜单收缩与展开切换
      handleSidemenuToggle() {
        let that = this;
        if (!this.isCollapse) {
          this.isShowTopTitle = false;
          this.$nextTick(() => {
            this.isCollapse = !this.isCollapse;
            this.systemSidberWidth('64');
            this.sidebarOpenCall();
          });
        } else {
          this.isCollapse = !this.isCollapse;
          this.$nextTick(() => {
            this.isShowTopTitle = true;
            this.systemSidberWidth('240');
          });
        }
      },
      // 计算当前页面菜单
      calMenus(index) {
        let pmsOne = lscache.get('pmsOne');
        let pmsTwo = lscache.get('pmsTwo');

        let oneMenu = [];
        _.map(this.defaultMenus, def => {
          _.map(pmsOne, one => {
            if (one.name == def.name) {
              oneMenu.push(def);
            }
          });
        });

        oneMenu = oneMenu[index];
        // let oneMenu = this.defaultMenus[index];
        this.menuName = oneMenu.name;
        this.menus = _.filter(oneMenu.children, item => {
          if (_.find(pmsTwo, ['perValue', item.path])) {
            return true;
          }
        });
      },
    },
    watch: {
      menus(nValue, oValue) {
        // 系统初始化时，默认加载第一个菜单或其子菜单
        if (nValue && nValue.length > 0) {
          if (!nValue[0].children && nValue[0].path) {
            if (
              _.indexOf(_.map(nValue, 'path'), this.$route.path.substring(1)) >= 0
            ) {
              this.currentMenu = this.$route.path.substring(1);
            } else if (oValue.length == 0) {
              this.$router.push('/' + nValue[0].path);
            }
          }
        }
      },
      menuIndex(nValue, oValue) {
        if (
          _.indexOf(_.map(this.menus, 'path'), this.$route.path.substring(1)) < 0
        ) {
          this.currentMenu = this.menus[0].path;
          this.$router.push('/' + this.menus[0].path);
        }
      }
    }
  };
</script>

<style>
  @import url('../../assets/styles/sidebar.css');
  .sidebar .el-menu {
    border: none;
  }
</style>